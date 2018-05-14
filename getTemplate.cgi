#!/usr/local/bin/python

# Program: getTemplate.cgi
# Purpose: Propagates global template files; is the web-based access point for
#   template retrieval.  Also serves as the translation layer for the raw
#   '.shell' template files by converting both config parameters and any
#   '.element' files in the /template/elements/ directory
#
# For the requested template, insert page elements as requested (in the shell) 
# and translate any config param names in the shells with their respective 
# values in the config object

import sys
import os

if "LIB_PY_MISC" not in os.environ:
   sys.path.insert (0, '/usr/local/mgi/live/lib/python/')
else:
   sys.path.insert (0, os.environ["LIB_PY_MISC"])

import Configuration
config = Configuration.get_Configuration ("webshare.config")

commonConfig = Configuration.get_Configuration (config['COMMON_CONFIG'])

config.merge(commonConfig)

# Attempt to import the module that will ask Python to ignore any
# deprecation errors.  If it fails, ignore it and go forward.
try:
        import ignoreDeprecation
except:
        pass

import CGI
import string
import regex
import db

class getTemplateCGI (CGI.CGI):

  # CLASS VARIABLES
  pageElements = {} # holds element file -> file content mapping
  re_parm = regex.compile ('\${\([^}]+.element\)}') # to find 'foo.element'
  

  def resolve (self,
    file,         # string; parameter name
    steps = 10  # integer; maximum recursive levels allowed
    ):
    # Purpose: return the value of the element file named 'file',
    #       with any embedded parameter references ( ${PARM} )
    #       having been resolved if we can do it in under the
    #       given number of 'steps'
    # Returns: string
    # Assumes: nothing
    # Effects: nothing
    # Throws: raises a KeyError if 'file' is not one of the
    #       parameter names.  raises 'error' if 'steps' reaches
    #       zero.
    # Notes: Mainly, we use 'steps' to prevent an infinite loop if
    #       we have two parameters that reference each other, like
    #               A       "My ${B} value"
    #               B       "My ${A} value"
    #       or one references itself like
    #               A       "My ${A} value"

    if steps == 0:
            raise error, 'Could not resolve parameter.'
    s = getTemplateCGI.pageElements[file]
    while getTemplateCGI.re_parm.search (s) != -1:
            start, stop = getTemplateCGI.re_parm.regs[0]
            parm = getTemplateCGI.re_parm.group(1)
            s = s[:start] + self.resolve(parm, steps-1) + s[stop:]
    return s

  def getDbDate (self):
    # Purpose: return value of latest db update
    # Returns: string
    # Assumes: nothing
    # Effects: nothing
    # Throws: db module may throw DB exceptions
    # pull the MGI:ID and geneSymbol from the database

    db.useOneConnection(1)
    db.set_sqlUser(config["DB_USER"])
    db.set_sqlPassword(config["DB_PASSWORD"])
    db.set_sqlServer(config["DB_SERVER"])
    db.set_sqlDatabase(config["DB_DATABASE_FE"])
    dateSql = """
        SELECT value
        FROM database_info
        WHERE name = 'built from mgd database date'
    """

    #  Excecute queries
    results = db.sql(dateSql, 'auto')
    db.useOneConnection(0)
    dbDateInfo = results[0]['value']
    yyyy = dbDateInfo[0:4]
    mm = dbDateInfo[5:7]
    dd = dbDateInfo[8:10]

    return mm + '/' + dd + '/' + yyyy


  def main (self):

    requestedTemplate = ''
    templateShell = ''
    shellContents = ''
 
    # gather form parameters
    self.parms = self.get_parms()
    
    # gather date of most recent DB load
    config['dbDate'] = self.getDbDate()

    # get the requested template parameter
    if self.parms.has_key('template'):
        requestedTemplate = self.parms['template']
        templateFile = config["INSTALL_PATH"] + "template/" + requestedTemplate + ".shell"

    # if the file exists, read it in
    if os.path.exists(templateFile):
        fileObject = open(templateFile, mode='r')
        for line in fileObject:
            shellContents = shellContents + line
        fileObject.close()

    #read in the possible page elements into a class var dictionary
    elementDirListing = os.listdir(config["INSTALL_PATH"] + "template/elements/")
    for element in elementDirListing:
        if element[-8:] == ".element":
            fileContent = ''
            file = open(config["INSTALL_PATH"] + "template/elements/" + element, mode='r')
            for line in file:
                fileContent = fileContent + line
            file.close()
            getTemplateCGI.pageElements[element] = fileContent

    #for each page element, update the shell files
    for file in getTemplateCGI.pageElements.keys():
        searchKey    = "${" + file + "}"
        replaceValue = self.resolve(file)
        shellContents = shellContents.replace(searchKey, replaceValue)

    #for each config parameter, update the shell files
    for key in config.keys():
        searchKey    = "${" + key + "}"
        replaceValue = config[key]
        shellContents = shellContents.replace(searchKey, replaceValue)

    #return translated string representation of file
    
    print shellContents



if __name__ == '__main__':
        myCgi = getTemplateCGI()
	myCgi.go()

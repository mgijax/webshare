#!/usr/local/bin/python

# Program: getTemplateHead.cgi
# Purpose: propagate global template file

import sys
if '/usr/local/mgi/lib/python/' not in sys.path:
        sys.path.insert (0, '/usr/local/mgi/lib/python/')

# Attempt to import the module that will ask Python to ignore any
# deprecation errors.  If it fails, ignore it and go forward.
try:
        import ignoreDeprecation
except:
        pass

import Configuration

# configuration file for this product
config = Configuration.get_Configuration ("webshare.config")

import CGI
import string

class getTemplateHeadCGI (CGI.CGI):

    def main (self):

        #open the file, pulling in the contents
        fileName = config["INSTALL_PATH"] + "template/templateBodyStart.raw"
        fileObject = open(fileName, mode='r')
        contents = ""
        for line in fileObject:
                contents = contents + line
        fileObject.close()

        #for each config parameter, update the raw files
        for key in config.keys():
            
            searchKey    = "${" + key + "}"
            replaceValue = config[key]
            contents = contents.replace(searchKey, replaceValue)


        #return translated string representation of file
        print contents

if __name__ == '__main__':
        myCgi = getTemplateHeadCGI()
	myCgi.go()

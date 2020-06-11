#!./python

# Program: components.cgi
# Purpose: to provide the mappings from names and aliases to their
#       corresponding web components.
# Usage:  This script accepts two parameters...
#               'format' : 'tag' (default), 'url', or 'rcd'
#               'name'   : optional name/alias for a shared web compoment
#       If neither parameter is specified, you will get all the mappings from
#       names/aliases to HTML tags.  Each line has a name/alias, a carat (^),
#       and then the tag.

# add the path to the standard MGI python libraries

import sys
import os

if "LIB_PY_MISC" not in os.environ:
   sys.path.insert (0, '/usr/local/mgi/live/lib/python/')
else:
   sys.path.insert (0, os.environ["LIB_PY_MISC"])

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
import webshare

###-------------------------------###
###--- public global variables ---###
###-------------------------------###

# standard exception raised in this CGI script
error = 'ComponentsCGI.error'

# possible values passed along when 'error' is raised...

UNKNOWN_FORMAT = "Unknown value for the 'format' paramter.  " + \
                "Must be 'rcd', 'url', or 'tag'."
UNKNOWN_NAME = "Unknown value for the 'name' parameter." 
CONFIG_ERROR = "Error in configuration file: %s"

###-----------------------###
###--- private classes ---###
###-----------------------###

class ComponentsCGI (CGI.CGI):
        # IS: this CGI script, charged with returning mappings from a web
        #       components name/alias to its tag, URL, or RcdFile entry.
        # HAS: a set of parameters from the user, and a set of shared
        #       web components
        # DOES: see IS

        def main (self):
                # Purpose: contains the main logic for this CGI script
                # Returns: nothing
                # Assumes: nothing
                # Effects: writes to stdout when giving results
                # Throws: 'error' if problems crop up.

                # get input parameters

                parms = self.get_parms()

                name = None                     # default is to do all
                if 'name' in parms:
                        name = parms['name']

                format = 'tag'                  # default returns HTML tags
                if 'format' in parms:
                        format = parms['format'].lower()

                # check validity of format parameters

                if format not in [ 'rcd', 'url', 'tag' ]:
                        raise error(UNKNOWN_FORMAT)

                # get the data from the rcd file

                rcdfile_path = config['RCDFILE_PATH']
                components = webshare.SharedComponents (rcdfile_path)

                # if user is requesting data for a single shared component...

                if name:
                        # retrieve the data for the individual component
                        # requested, if possible

                        component = components.get(name)
                        if not component:
                                raise error(UNKNOWN_NAME)

                        # if requesting an HTML tag...
                        if format == 'tag':
                                print(component.getHtmlTag())

                        # if requesting just the URL to the component
                        elif format == 'url':
                                print(component.getUrl())

                        # if requesting full Rcd of info for this component
                        else:   # format == 'rcd'
                                print(component.getRcd())
                        return

                # otherwise, user is requesting data for all components...

                # list of output lines
                lines = []

                # if user is requesting lines with 'name <HTML tag>' for each
                if format == 'tag':
                        namesAliases = components.getNames() + \
                                components.getAliases()
                        for name in namesAliases:
                                lines.append ('%s^%s' % (name,
                                        components.get(name).getHtmlTag() ) )

                # if user is requesting lines with 'name URL' in each
                elif format == 'url':
                        for name in components.getNames() + \
                            components.getAliases():
                                lines.append ('%s^%s' % (name,
                                        components.get(name).getUrl() ) )

                # if user is requesting the contents of the full Rcd file
                else:   # format == 'rcd'
                        lines.append (components.getRcdFile())

                print('\n'.join(lines))

                return

###--------------------###
###--- Main Program ---###
###--------------------###

if __name__ == '__main__':
        myCgi = ComponentsCGI()
        myCgi.go()

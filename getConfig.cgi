#!/usr/local/bin/python

# Program: getConfig.cgi
# Purpose: propagate global config file contents

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

class getConfigCGI (CGI.CGI):

	def main (self):
                f = open(config["GLOBAL_CONFIG"],mode='r')
                for line in f:
                        print line.strip()
                f.close()

if __name__ == '__main__':
	myCgi = getConfigCGI()
	myCgi.go()

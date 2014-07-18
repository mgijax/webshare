#!/usr/local/bin/python

# Program: getConfig.cgi
# Purpose: propagate global config file contents

import sys

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

globalConfig = Configuration.get_Configuration (config['GLOBAL_CONFIG'])
commonConfig = Configuration.get_Configuration (config['COMMON_CONFIG'])

import CGI
import string

class getConfigCGI (CGI.CGI):

	def main (self):
	
		print '###################################################################################'
		print '# This is a machine generated config file, do not make changes here.'
		print '# Instead make them in either GlobalConfig or CommonConfig in your local webshare. '
		print '###################################################################################'
		
		globalConfig.merge(commonConfig)

		for key in globalConfig.keys():
			print key + '	' + globalConfig[key]
		
if __name__ == '__main__':
	myCgi = getConfigCGI()
	myCgi.go()

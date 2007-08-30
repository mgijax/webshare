#!/usr/local/bin/python

import sys
if '/usr/local/mgi/lib/python/' not in sys.path:
	sys.path.insert (0, '/usr/local/mgi/lib/python/')

import CGI
import string

class getConfigCGI (CGI.CGI):

	def main (self):
		f = open("./config/GlobalConfig",mode='r')
		for line in f:
			print line.strip()
		f.close()

if __name__ == '__main__':
	myCgi = getConfigCGI()
	myCgi.go()

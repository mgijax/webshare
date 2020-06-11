#!./python

# Name: fetch_pixels.cgi
# Purpose: is a read-only replacement for pixeldb's fetch_pixels.cgi script,
#       removing the database dependency (Sybase) that exists within pixeldb
# Assumptions:
#       1. a PixelDB data directory is available at the location specified by
#               PIXELDB_PATH in webshare.config
#       

import sys
import os
import cgi

if "LIB_PY_MISC" not in os.environ:
   sys.path.insert (0, '/usr/local/mgi/live/lib/python/')
else:
   sys.path.insert (0, os.environ["LIB_PY_MISC"])

try:
        import ignoreDeprecation
except:
        pass

import Configuration

###-----------------------###
###--- special function---###
###-----------------------###

def bailout (msg):
        # bail out of this script, write a message to Apache's error log, and
        # send the error message to the user

        sys.stderr.write ('webshare/fetch_pixels.cgi error: %s\n' % msg)

        print('Content-type:text/html')
        print()
        print('''<HTML><HEAD><TITLE>MGI Error</TITLE></HEAD>
                <BODY>%s</BODY></HTML>''' % msg)
        sys.exit(-1)

###---------------###
###--- globals ---###
###---------------###

# configuration object for webshare
config = Configuration.get_Configuration ('webshare.config')
if 'PIXELDB_PATH' not in config:
        bailout ('PIXELDB_PATH is not specified')

# path to the pixeldb image files
pixeldb_path = config['PIXELDB_PATH']
if not os.path.isdir(pixeldb_path):
        bailout ('PIXELDB_PATH (%s) is not a directory' % pixeldb_path)

# size of blocks to write out (8k is historical from pixeldb product)
blockSize = 8192

###-----------------###
###--- functions ---###
###-----------------###

def getID():
        # return the input ID passed from the URL

        form = cgi.FieldStorage()
        if 'id' not in form:
                bailout ("Did not pass value for 'id'\n")
        return form['id'].value

def getFilePath(pixID):
        # return the full path to the image file for the given 'pixID'
        # Notes: guarantees that the file exists

        path = os.path.join (pixeldb_path, '%s.jpg' % pixID)
        if not os.path.exists(path):
                bailout ('No image file for ID %s' % pixID)
        return path

def sendImage(pixPath):
        # get the image at the given path and send it to stdout
        # Returns: number of bytes written

        try:
                fp = open(pixPath, 'rb')
        except IOError:
                bailout ('Cannot read image file for ID %s' % pixID)

        print('Content-type:image/jpeg')
        print()

        length = 0
        buf = fp.read(blockSize)
        bufLen = len(buf)

        while bufLen > 0:
                length = length + bufLen
                sys.stdout.write(buf)
                buf = fp.read(blockSize)
                bufLen = len(buf)
        fp.close()

        return length

def main():
        # main logic of script...  get ID, find path, copy bytes to stdout

        pixID = getID()
        pixPath = getFilePath(pixID)
        bytesWritten = sendImage(pixPath)
        return

###--------------------###
###--- main program ---###
###--------------------###

if __name__ == '__main__':
        main()

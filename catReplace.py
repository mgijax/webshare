#!/usr/local/bin/python

import sys
import os

if '/usr/local/mgi/live/lib/python/' not in sys.path:
        sys.path.insert (0, '/usr/local/mgi/live/lib/python/')

import Configuration
config = Configuration.get_Configuration ("webshare.config")

config.merge(Configuration.get_Configuration (config['GLOBAL_CONFIG']))

config.merge(Configuration.get_Configuration (config['COMMON_CONFIG']))

shellContents = ''

for arg in sys.argv[1:]:
    # if the file exists, read it in
    if os.path.exists(arg):
        fileObject = open(arg, mode='r')
        for line in fileObject:
            shellContents = shellContents + line
        fileObject.close()

    #for each config parameter, update the shell files
    for key in config.keys():
        searchKey    = "${" + key + "}"
        replaceValue = config[key]
        shellContents = shellContents.replace(searchKey, replaceValue)


#return translated string representation of file    
print shellContents

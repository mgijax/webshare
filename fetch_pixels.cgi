#!/usr/bin/bash

#
# Name: fetch_pixels.cgi
# Purpose: fetches a pixeldb jpg file for display
#
# lives in: webshare
# used by:  prism, pwi, fewi
#       

echo "Content-type:image/jpeg"
echo
PIXID="${QUERY_STRING:3}"
PIXPATH="/data/pixeldb/${PIXID}.jpg"
cat ${PIXPATH}


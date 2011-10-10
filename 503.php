<?php
header('HTTP/1.1 503 Service Temporarily Unavailable',true,503);
header('Status: 503 Service Temporarily Unavailable');
header('Retry-After: 600');
print "This page is temporarily unavailable";
?>

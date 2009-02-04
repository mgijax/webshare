// mgi.js
//

function openNewWindow(url)
{
    window.open(url,'new','width=1000,height=600,resizable=yes,scrollbars=yes,menubar=yes,toolbar=yes,alwaysRaised=yes');
};

function verifySearchToolParms() {
  var blankRE=/^\s*$/;
  var searchToolTextArea = document.getElementById("searchToolTextArea");

  if (searchToolTextArea.value == " Keywords, Symbols, or IDs" || blankRE.test(searchToolTextArea.value)) {
    alert("Please enter an ID or symbol or name into the text box.");
    return false;
  }

  return true
}

/* requests the page at the given 'url' from the server, passes along the
 * given arguments as 'args', and ignores the response
 */
function hitUrl (url, args) {
  try {
    var myRequest = new ajaxObject (url);
    myRequest.update (args);
  } catch (err) {
    // ignore errors, as this is not mission-critical code
  }
  return;
}

/*--------------------------------------------------------------------------*/

/* function ajaxObject() for asynchronous loading of URLs taken from:
 *	http://www.hunlock.com/blogs/The_Ultimate_Ajax_Object
 * callbackFunction is optional;  returns a javascript object
 */
function ajaxObject(url, callbackFunction) {
  var that=this;      
  this.updating = false;
  this.abort = function() {
    if (that.updating) {
      that.updating=false;
      that.AJAX.abort();
      that.AJAX=null;
    }
  }
  this.update = function(passData,postMethod) { 
    if (that.updating) { return false; }
    that.AJAX = null;                          
    if (window.XMLHttpRequest) {              
      that.AJAX=new XMLHttpRequest();              
    } else {                                  
      that.AJAX=new ActiveXObject("Microsoft.XMLHTTP");
    }                                             
    if (that.AJAX==null) {                             
      return false;                               
    } else {
      that.AJAX.onreadystatechange = function() {  
        if (that.AJAX.readyState==4) {             
          that.updating=false;                
          that.callback(that.AJAX.responseText,that.AJAX.status,that.AJAX.responseXML);        
          that.AJAX=null;                                         
        }                                                      
      }                                                        
      that.updating = new Date();                              
      if (/post/i.test(postMethod)) {
        var uri=urlCall+'?'+that.updating.getTime();
        that.AJAX.open("POST", uri, true);
        that.AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        that.AJAX.setRequestHeader("Content-Length", passData.length);
        that.AJAX.send(passData);
      } else {
        var uri=urlCall+'?'+passData+'&timestamp='+(that.updating.getTime()); 
        that.AJAX.open("GET", uri, true);                             
        that.AJAX.send(null);                                         
      }              
      return true;                                             
    }                                                                           
  }
  var urlCall = url;        
  this.callback = callbackFunction || function () { };
}

/*--------------------------------------------------------------------------*/


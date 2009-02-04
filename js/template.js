// template.js
//
// this file contains javascript code previously contained in the template files.
// note: this file cannot be used as is on any page as it contains config variables.
// these variables must have their values inserted before use.  this occurs as part 
// of the concatenation and minification of the js files.  

<!-- function kicks off on page load -->
function loadPage()
{
  //prep local values
  winLoc = new String(window.location);
  winLocArray = winLoc.split("/");

  // if we have a title bar, add help-linked logo if requested
  var titleBarWrapper = document.getElementById("titleBarWrapper");
  if (titleBarWrapper != null) {
      var currentHTML = titleBarWrapper.innerHTML;
      var helpIcon = '<img class="titleBarHelpIcon" src="${WEBSHARE_URL}images/help_large_transp.gif">';
      var userdoc = titleBarWrapper.getAttribute("userdoc");
      if (userdoc != null) {

        var helpLink = '';

        userdocArray = userdoc.split("/");
        if (userdocArray[0] == 'http:') { //passed a full URL
          helpLink = "<a href='" + userdoc + "'>" + helpIcon + "</a>";
        }
        else {
          helpLink = "<a href='${USERDOCS_URL}" + userdoc + "'>" + helpIcon + "</a>";
        }

        titleBarWrapper.innerHTML = helpLink + currentHTML;
      }


  }

  //shade tabs when we're on a mini homepage
  winLocArrayRev = winLocArray.reverse();
  switch (winLocArrayRev[0])
  {
         case "genes.shtml" :
            document.getElementById("minitab_Genes").style.backgroundColor="#002255";
            document.getElementById("minitab_Genes").style.fontWeight="bold";
            break;
         case "phenotypes.shtml" :
            document.getElementById("minitab_PAD").style.backgroundColor="#002255";
            document.getElementById("minitab_PAD").style.fontWeight="bold";
            break;
         case "expression.shtml" :
            document.getElementById("minitab_GXD").style.backgroundColor="#002255";
            document.getElementById("minitab_GXD").style.fontWeight="bold";
            break;
         case "function.shtml" :
            document.getElementById("minitab_GO").style.backgroundColor="#002255";
            document.getElementById("minitab_GO").style.fontWeight="bold";
            break;
         case "strains_SNPs.shtml" :
            document.getElementById("minitab_Strain").style.backgroundColor="#002255";
            document.getElementById("minitab_Strain").style.fontWeight="bold";
            break;
         case "orthology.shtml" :
            document.getElementById("minitab_Ortho").style.backgroundColor="#002255";
            document.getElementById("minitab_Ortho").style.fontWeight="bold";
            break;
         case "pathways.shtml" :
            document.getElementById("minitab_BioPath").style.backgroundColor="#002255";
            document.getElementById("minitab_BioPath").style.fontWeight="bold";
            break;
  }
};

<!-- faq window to assist user; callable from anywhere using the templates -->
function openFaqWindow(faqFile)
{
    faqUrl = "${FAQ_URL}" + faqFile;
    window.open(faqUrl,'faqWindow','width=1000,height=600,resizable=yes,scrollbars=yes,alwaysRaised=yes');
};

// menu object
var listMenu = new FSMenu('listMenu', true, 'display', 'block', 'none');

listMenu.showDelay = 100;
listMenu.switchDelay = 0;
listMenu.hideDelay = 100;
listMenu.animInSpeed = 1;
listMenu.animOutSpeed = 1;

FSMenu.prototype.ieSelBoxFixShow = function(mN) { with (this)
{
 var m = menus[mN];
 if (!isIE || !window.createPopup) return;
 if (navigator.userAgent.match(/MSIE ([\d\.]+)/) && parseFloat(RegExp.$1) > 6.5)
  return;
 // Create a new transparent IFRAME if needed, and insert under the menu.
 if (!m.ifr)
 {
  m.ifr = document.createElement('iframe');
  m.ifr.src = 'about:blank';
  with (m.ifr.style)
  {
   position = 'absolute';
   border = 'none';
   padding = '300px';
   filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
  }
  m.lyr.ref.parentNode.insertBefore(m.ifr, m.lyr.ref);
 }
 // Position and show it on each call.
 with (m.ifr.style)
 {
  left = m.lyr.ref.offsetLeft + 'px';
  top = m.lyr.ref.offsetTop + 'px';
  width = '200px';
  height = '400px';
  visibility = 'visible';
 }
}};
FSMenu.prototype.ieSelBoxFixHide = function(mN) { with (this)
{
 if (!isIE || !window.createPopup) return;
 var m = menus[mN];
 if (m.ifr) m.ifr.style.visibility = 'hidden';
}};
addEvent(listMenu, 'show', function(mN) { this.ieSelBoxFixShow(mN) }, 1);
addEvent(listMenu, 'hide', function(mN) { this.ieSelBoxFixHide(mN) }, 1);

// I'm applying two at once to listMenu. Delete this to disable!
listMenu.animations[listMenu.animations.length] = FSMenu.animFade;
listMenu.animations[listMenu.animations.length] = FSMenu.animSwipeDown;
//listMenu.animations[listMenu.animations.length] = FSMenu.animClipDown;

var arrow = null;
if (document.createElement && document.documentElement)
{
 arrow = document.createElement('img');
 arrow.src = '${WEBSHARE_URL}images/arrow_right.gif';
 arrow.style.borderWidth = '0';
 arrow.className = 'subind';
}
addEvent(window, 'load', new Function('listMenu.activateMenu("listMenuRoot", arrow)'));



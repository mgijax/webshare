// mgi.js
//

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

function openNewWindow(url)
{
    window.open(url,'new','width=1000,height=600,resizable=yes,scrollbars=yes,menubar=yes,toolbar=yes,alwaysRaised=yes');
};


function verifySearchToolParms() {

  var searchToolTextArea = document.getElementById("searchToolTextArea");
  if (searchToolTextArea.value == " ID or symbol or name") {
    alert("Please enter an ID or symbol or name into the text box.");
    return false;
  }

  return true
}

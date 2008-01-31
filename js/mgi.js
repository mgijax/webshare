// mgi.js
//

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

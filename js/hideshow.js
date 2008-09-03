/* File: hideshow.js
 * Purpose: To provide Javascript functions for manipulating MGI HTML pages
 *	dynamically.  This will initially be used for the allele detail page
 *	for the phenoview release, and will hide/show table rows as well as
 *	swapping images and such.
 */

var mgihomeUrl = null;

function setMgihomeUrl (url)
{
    mgihomeUrl = url;
    return;
}

// toggle the visibility of an individual element identified by ID 'i'
function toggle (i)
{
    var elem = document.getElementById(i);
    if (elem == null) { return false; }

    var status = (elem.style.display == '');

    if (status) { elem.style.display = 'none'; }
    else { elem.style.display = ''; }

    return true;
}

// force the individual element identified by ID 'i' to be hidden
function hide (i)
{
    var elem = document.getElementById(i);
    if (elem == null) { return false; }

    elem.style.display = 'none';
    return true;
}

// force the individual element identified by ID 'i' to be displayed
function show (i)
{
    var elem = document.getElementById(i);
    if (elem == null) { return false; }

    elem.style.display = '';
    return true;
}

// for all nodes which have IDs beginning with 'prefix', followed by ascending
// numbers starting at 1, toggle their display (shown and hidden)
function toggleAll (prefix)
{
    var i = 0;
    var changed = true;
    var anyChanged = false;
    var id;

    while (changed)
    {
	i = i + 1;
	id = prefix + i;
	if (toggle(id) == true) { anyChanged = true; }
	else { changed = false; }
    }

    return anyChanged;
}

// for all nodes which have IDs beginning with 'prefix', followed by ascending
// numbers starting at 1, make them visible
function showAll (prefix)
{
    var i = 0;
    var changed = true;
    var anyChanged = false;
    var id;

    while (changed)
    {
	i = i + 1;
	id = prefix + i;
	if (show(id)) { anyChanged = true; }
	else { changed = false; }
    }

    return anyChanged;
}

// for all nodes which have IDs beginning with 'prefix', followed by ascending
// numbers starting at 1, hide them
function hideAll (prefix)
{
    var i = 0;
    var changed = true;
    var anyChanged = false;
    var id;

    while (changed)
    {
	i = i + 1;
	id = prefix + i;
	if (hide(id)) { anyChanged = true; }
	else { changed = false; }
    }

    return anyChanged;
}

// for nodes which have IDs beginning with 'prefix', followed by ascending
// numbers from 'm' to 'n', toggle their display (shown and hidden)
function toggleMulti (prefix, m, n)
{
    var i;
    var anyChanged = false;
    var id;

    for (i = m; i <= n; i++)
    {
	id = prefix + i;
	if (toggle(id) == true) { anyChanged = true; }
    }

    return anyChanged;
}

// for nodes which have IDs beginning with 'prefix', followed by ascending
// numbers from 'm' to 'n', show them
function showMulti (prefix, m, n)
{
    var i;
    var anyChanged = false;
    var id;

    for (i = m; i <= n; i++)
    {
	id = prefix + i;
	if (show(id) == true) { anyChanged = true; }
    }

    return anyChanged;
}

// for nodes which have IDs beginning with 'prefix', followed by ascending
// numbers from 'm' to 'n', hide them
function hideMulti (prefix, m, n)
{
    var i;
    var anyChanged = false;
    var id;

    for (i = m; i <= n; i++)
    {
	id = prefix + i;
	if (hide(id) == true) { anyChanged = true; }
    }

    return anyChanged;
}

// for the image identified by ID 'i', swap its visible image to whichever is
// not shown of 'image1' or 'image2'
function swapImage (i, image1, image2)
{
    var elem = document.getElementById(i);
    if (elem == null) { return false; }

    var temp;
    if (image1.indexOf("..") == 0) { temp = image1.slice (2, image1.length); }
    else { temp = image1; }
    var image1shown = (elem.src.indexOf (temp) >= 0);
    if (image1shown) { elem.src = image2; }
    else { elem.src = image1; }

    return true;
}

// for the image identified by ID 'i', force its visible image to be 'image'
function setImage (i, image)
{
    var elem = document.getElementById(i);
    if (elem == null) { return false; }

    elem.src = image;
    return true;
}

// toggles a phenotype header row open/closed, including showing or hiding the
// child rows and changing the button image
function togglePhenoRow (parentRow, startChildRow, endChildRow)
{
    hide ("subhead" + parentRow);
    toggle ("bandaid" + parentRow);
    toggleMulti ("childRow", startChildRow, endChildRow);
    toggle ("rightArrow" + parentRow);
    toggle ("downArrow" + parentRow);
    if (mgihomeUrl != null) {
        hitUrl (mgihomeUrl + "other/monitor.html", "togglePhenoRow=1");
    }
    return;
}

// show all child rows in the phenotype table, and set the icons on all
// parent rows
function showPheno()
{
    var i;
    showAll ("childRow");
    for (i = 1; i < 1000; i++)		// assume < 1000 parent rows
    {
	show ("bandaid" + i);
	show ("downArrow" + i);
	if (!hide ("rightArrow" + i))
	{
	    break;			// exit when past last parent row
	}
    }
    if (mgihomeUrl != null) {
        hitUrl (mgihomeUrl + "other/monitor.html", "showAllPheno=1");
    }
    return;
}

// hide all child rows in the phenotype table, and set the icons on all
// parent rows
function hidePheno()
{
    var i;
    hideAll ("childRow");
    for (i = 1; i < 1000; i++)		// assume < 1000 parent rows
    {
	hide ("subhead" + i);
	hide ("bandaid" + i);
	show ("rightArrow" + i);
	if (!hide ("downArrow" + i))
	{
	    break;			// exit when beyond max parent row
	}
    }
    if (mgihomeUrl != null) {
        hitUrl (mgihomeUrl + "other/monitor.html", "hideAllPheno=1");
    }
    return;
}

// toggle an individual genotype section open/closed
function toggleGeno (i)
{
    toggle ("geno" + i + "-1");
    toggle ("geno" + i + "-3");
    toggle ("genoRightArrow" + i);
    toggle ("genoDownArrow" + i);
    if (mgihomeUrl != null) { 
        hitUrl (mgihomeUrl + "other/monitor.html", "toggleGenoRow=1");
    }
    return;
}

// show an individual genotype section
function showGeno (i)
{
    show ("geno" + i + "-1");
    show ("geno" + i + "-3");
    hide ("genoRightArrow" + i);
    show ("genoDownArrow" + i);
    return;
}

// hide an individual genotype section
function hideGeno (i)
{
    hide ("geno" + i + "-1");
    hide ("geno" + i + "-3");
    hide ("genoDownArrow" + i);
    show ("genoRightArrow" + i);
    return;
}

// hide all child rows in the genotype table, and set the icons on all
// parent rows
function hideAllGeno()
{
    var i;
    for (i = 1; i < 1000; i++)		// assume < 1000 parent rows
    {
	// "-1" row is header which exists only for rows 2..
	// "-3" row always exists, so if it doesn't can exit loop

	hide ("geno" + i + "-1");
	if (!hide ("geno" + i + "-3"))
	{
	    break;
	}
	hide ("genoDownArrow" + i);
	show ("genoRightArrow" + i);
    }
    if (mgihomeUrl != null) {
        hitUrl (mgihomeUrl + "other/monitor.html", "hideAllGeno=1");
    }
    return;
}

// show all child rows in the genotype table, and set the icons on all
// parent rows
function showAllGeno()
{
    var i;
    for (i = 1; i < 1000; i++)		// assume < 1000 parent rows
    {
	// "-1" row is header which exists only for rows 2..
	// "-3" row always exists, so if it doesn't can exit loop

	show ("geno" + i + "-1");
	if (!show ("geno" + i + "-3"))
	{
	    break;
	}
	hide ("genoRightArrow" + i);
	show ("genoDownArrow" + i);
    }
    if (mgihomeUrl != null) {
        hitUrl (mgihomeUrl + "other/monitor.html", "showAllGeno=1");
    }
    return;
}

var popupNextX = 0;
var popupNextY = 0;

function popupGenotype (url, genoKey)
{
    var windowName;
    windowName = "genoPopup" + genoKey;
    var child = window.open (url, windowName,
	'width=500,height=300,resizable=yes,scrollbars=yes,alwaysRaised=yes');

    child.moveTo (popupNextX, popupNextY);
    child.focus();

    if (popupNextX >= 400) {
	popupNextX = 0;
	popupNextY = 0;
    }
    else {
	popupNextX = popupNextX + 20;
	popupNextY = popupNextY + 20;
    }
    return;
}

var windowCounter = 0;		// counter of sub-windows of current window
var windowPrefix = "";		// prefix for sub-windows of current window

function setWindowPrefix()
{
    // array of characters we will use to compose our window prefix code
    chars = Array(26);
    chars[0] = 'a';  chars[1] = 'b';  chars[2] = 'c'; chars[3] = 'd';
    chars[4] = 'e';  chars[5] = 'f';  chars[6] = 'g'; chars[7] = 'h';
    chars[8] = 'i';  chars[9] = 'j';  chars[10] = 'k'; chars[11] = 'l';
    chars[12] = 'm';  chars[13] = 'n';  chars[14] = 'o'; chars[15] = 'p';
    chars[16] = 'q';  chars[17] = 'r';  chars[18] = 's'; chars[19] = 't';
    chars[20] = 'u';  chars[21] = 'v';  chars[22] = 'w'; chars[23] = 'x';
    chars[24] = 'y';  chars[25] = 'z';

    // compose the six-character window prefix for this window.  (Six
    // should be enough, since the odds of generating two identical ones are
    // less than 1 in 308,000,000.  All we need is to not have two the same
    // for whatever windows (which use this javascript module) the user has
    // opened since restarting his browser.  Otherwise, they start
    // over-writing any existing child windows from the window with the
    // matching prefix (via calls to newWindow()).  (not fatal, just annoying)

    windowPrefix = "";
    for (i = 0; i < 6; i++) {
	index = Math.round(Math.random() * 26);		// random int 0..25
	windowPrefix = windowPrefix + chars[index]
    }
    return;
}

function newWindow (url)
{
    if (windowPrefix == "") { setWindowPrefix(); }

    var windowName = windowPrefix + windowCounter;
    windowCounter = windowCounter + 1;
    var child = window.open (url, windowName, 'width=800,height=600,status=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,scrollbars=yes,directories=yes');
    child.focus();
    return;
}

function toggleColumnLabels (rowLabel)
{
    toggle (rowLabel);
    if (mgihomeUrl != null) {
        hitUrl (mgihomeUrl + "other/monitor.html", "showPhenoLabels=1");
    }
    return;
}

/* code for highlighting rows and columns */

var columnHighlight = null;
var rowOrigColor = null;
var rowHighlight = null;
var highlightHeight = null;
var colOrigColors = null;

function unhighlight ()
{
    if (highlightHeight == null) { setHighlightHeight(); }

    unhighlightRow (rowHighlight);
    unhighlightColumn (columnHighlight);
}

function highlight (row, col)
{
    if ((row == rowHighlight) && (col == columnHighlight))
    {
        unhighlight();
    }
    else
    {
        unhighlight();
	captureOriginalColors (row, col);
	highlightColumn (col);
	highlightRow (row);
    }
    return;
}

function getColor (elementName)
{
    var elem = document.getElementById(elementName);
    if (elem == null) { return null; }

    var s = elem.style.background;
    var parenPos = s.search ("\\)");
    if (parenPos > 0)
    {
        s = s.substr(0, parenPos + 1);
    }
    return s;
}

function applyColor (elementName, colorCode)
{
    var elem = document.getElementById(elementName);
    if (elem == null) { return false; }

    elem.style.background = colorCode;
    return true;
}

function unhighlightRow (row)
{
    if (rowOrigColor != null)
    {
        for (i = 1; i < 1000; i++)
	{
	    if (applyColor ("child-" + row + "-" + i, rowOrigColor) == false)
	    { break; }
	}
	rowOrigColor = null;
    }
    rowHighlight = null;
    return;
}

function captureOriginalColors (row, col)
{
    if (highlightHeight == null) { setHighlightHeight(); }

    if (rowHighlight != row)
    {
        rowOrigColor = getColor ("child-" + row + "-1");
    }
    if (columnHighlight != col)
    {
        colOrigColors = Array(highlightHeight);
        for (i = 1; i <= highlightHeight; i++)
        {
            colOrigColors[i-1] = getColor ("child-" + i + "-" + col);
        }
    }
    return;
}

function highlightRow (row)
{
    if (rowHighlight != row)
    {
	rowHighlight = row;

	for (i = 1; i < 1000; i++)
	{
	    if (applyColor ("child-" + row + "-" + i, "#ffff00") == false)
	    { break; }
	}
    }
    else { rowHighlight = null; }

    return;
}

function setHighlightHeight ()
{
    var i;
    var elem;

    for (i = 1; i < 1000; i++)
    {
        elem = document.getElementById("child-" + i + "-1");
        if (elem == null) { break; }
    }
    highlightHeight = i - 1;
    return;
}

function unhighlightColumn (col)
{
    if (highlightHeight == null) { setHighlightHeight(); }

    if (colOrigColors != null)
    {
        for (i = 1; i <= highlightHeight; i++)
	{
	    applyColor ("child-" + i + "-" + col, colOrigColors[i-1]);
	}
        colOrigColors = null;
    }
    columnHighlight = null;
    return;
}

function highlightColumn (col)
{
    if (highlightHeight == null) { setHighlightHeight(); }

    if (columnHighlight != col)
    {
        for (i = 1; i <= highlightHeight; i++)
        {
	    applyColor ("child-" + i + "-" + col, "#ffff00");
        }
        columnHighlight = col;
    }
    else
    {
        columnHighlight = null;
    }
    return;
}

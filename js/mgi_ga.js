/* Name: mgi_ga.js
 *
 * UPDATE: MGI is no longer using UA, and has ported to GA4.  The functionality of the functions 
 * below have been commented out, incase we want to reimplement in GA4.
 *
 *
 * Purpose: This library is the gateway for interacting with Google Analytics (GA) from MGI pages.
 *		Bringing this library into an HTML page will automatically register a page view for that
 *		page.  Functions are provided for logging page events to GA.
 * Notes: This library automatically logs:
 * 			1. a pageview with GA for any page that loads it in,
 * 			2. the user's browser dimensions as a GA event, and
 * 			3. any external links clicked by the user as GA events.
 * 		For programmatic logging of other data, there are currently three functions you can use (see
 * 		details of each in the code below):
 * 			1. ga_logEvent(category, action, label, value)
 * 			2. ga_logPagination(pageName, tabName, startIndex)
 * 			3. ga_logPageview(path)
 * 		You can also add attributes to HTML tags to define the event and have it automatically picked
 * 		up from the HTML and sent to GA.  For details of this, see the comments above the call to:
 * 			ga('require', 'eventTracker')
 */

// provide a function so we can easily log events within our Javascript code -- 
// log a given event to Google Analytics
function ga_logEvent(
	category,	// required string; names the object that was interacted with
	action,		// required string; what type of interaction?
	label,		// optional string; subcategory or other label for the event
	value		// optional integer; numeric value associated with the event
	) {
	
//	ga('send', 'event', category, action, label, value);

}

// convenience wrapper function over ga_logEvent() for logging pagination events.  If startIndex > 1,
// then we log a pagination event.  (If it's 0-1, then this is for the first page of a result set, so
// it's already counted as a pageview.  Only log secondary page requests.)  Note that we log the event
// with an action of 'Pagination' and automatically append ' Tab' to the tabName (if tabName is not null).
function ga_logPagination(
	pageName,	// required string; name of the page where pagination occurred
	tabName,	// optional string; name of the particular tab on the page where it occurred (if multi-tab page)
	startIndex	// integer; index of first record requested
	) {
//	if (startIndex > 1) {
//		if ((tabName != undefined) && (tabName != null) && !tabName.endsWith('Tab')) {
//			tabName = tabName + ' Tab';
//		}
//		ga_logEvent(pageName, 'Pagination', tabName);
//	}
}

// provide a function so we can easily log pageviews within our Javascript code -- 
// log a hit to a given URL fragment to Google Analytics
function ga_logPageview(
	path		// path of the pageview to log (start with the slash after the server name)
	) {
	
//	if (path != null) {
//		if (!path.startsWith('/')) {
//			// We weren't given just a path, so use the browser's URL parsing functionality
//			// to just pull off the path and use that.
//			var a = document.createElement('a');
//			a.href = path;
//			if ((a.search != null) && (a.search != '')) {
//				// If we have a parameter string, include that, too.
//				path = a.pathname + a.search;;
//			} else {
//				path = a.pathname;
//			}
//		}
//		ga('send', 'pageview', path);
//	}
}

/*** end helper functions ***/

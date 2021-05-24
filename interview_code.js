/**
 * jQuery and underscore are already included for you if you want to use them for the project.
 * 
 * Also included are three JSON files that define three constants: routes, stops, and routeStops.
 * Those consts have all the data you'll need for this project. You can find the source files in the data directory.
 */

$(function(){
	/**
	 * If you haven't used jQuery before, the code in here runs when the page first loads.
	 *
	 * As a test, let's add some HTML to the document. We'll make a simple dropdown list.
	 * Just call the `InsertText` function with the id of the element you want to insert HTML inside of and the content to add.
	 */
	InsertText("mainContent", "<select><option>Option A</option><option>Option B</option>");

	/**
	 * Also, as a test, let's take a look at some of the data from the JSON files. This will log it to your browser's
	 * Javascript console. You can see the output by opening up the dev tools in your browser.
	 */
	console.log({ routes });
});

//This is a helper function we're giving you to insert any HTML you want inside an element with the specified id
function InsertText(Id, Text){
	var Element = document.getElementById(Id);
	Element.innerHTML = Text;
};
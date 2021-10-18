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

	var option = document.createElement("option");
	option.text = "";
	document.getElementById("dropdown").add(option);
	
	//need to load the routes as options
	Object.entries(routes).forEach(element => {
		var newOption = document.createElement("option");
		newOption.text = element[1].shortName + " - " + element[1].longName;
		document.getElementById("dropdown").add(newOption);
	});

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

//helper function similar to Insert, but concatenates text with a newline character
function concatText(Id, Text){
	var Element = document.getElementById(Id);
	Element.innerHTML += (Text)+"<br>";
}

//function to print out the stops based on the selected route, called by eventlistener
function printStops(){

	//console.log("printStops called,", document.getElementById("dropdown").value, "is selected");
	InsertText("mainContent","");

	let currentDropdownValue = document.getElementById("dropdown").value;
	if (currentDropdownValue !== ""){ //check that a not blank value is selected (otherwise leave blank)

		//first, need the stop id
		let routeNum = 0;
		Object.entries(routes).forEach(element => {
			if (element[1].shortName === currentDropdownValue.split(" ")[0]){
				routeNum = element[1].routeId;
			}
		});
		console.log("routeNum",routeNum);
		
		//then, need to get a list of the stops for that route
		//because it's small, pushing values onto the array isn't bad complexity (array doubling)
		//because the dataset is complete and stops are listed in order (at least by my spot-checking), we will
		//assume the first array spot is the first stop, the second is the second, and so on.
		let stopIdsOnRoute = [];
		Object.entries(routeStops).forEach(element => {
			if (element[1].routeId === routeNum){
				stopIdsOnRoute.push(element[1].stopId);
			}
		});
		console.log("stopIdsOnRoute",stopIdsOnRoute);


		//finally need to get the full name for each of those to print them
		//go over each of the stopIdsOnRoute and search stops.json for it, though worst case they're all at the end
		stopIdsOnRoute.forEach((stopElem,index) => {

			//let stop = stopsArray.find(element => { parseInt(element[0]) === stopElem} );
			let stop;
			Object.entries(stops).forEach(element => {
				if (parseInt(element[0]) === stopElem){
					stop = element;
				}
			});

			let stopName = (stop[1].name);
			concatText("mainContent","Stop "+(index+1)+": "+stopName);
		});

	}
}

//set up event listener to update when new route is selected
window.onload=function(){
	document.getElementById("dropdown").addEventListener("change",printStops);
}

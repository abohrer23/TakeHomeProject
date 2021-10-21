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
	//blank option as the default
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

//helper function similar to Insert, but concatenates text (with a newline)
function concatText(Id, Text){
	var Element = document.getElementById(Id);
	Element.innerHTML += (Text)+"<br>";
}

//sort array with helper: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function compareOrder(a,b){
	if (a.order < b.order){
		return -1;
	}
	if (a.order > b.order){
		return 1;
	}
	return 0;
}

//function to print out the stops based on the selected route, called by eventlistener
function printStops(){

	InsertText("mainContent","");

	let currentDropdownValue = document.getElementById("dropdown").value;
	if (currentDropdownValue !== ""){ //check that a not default value is selected (otherwise leave blank)

		//first, need the route id
		let routeNum = 0;
		Object.entries(routes).forEach(element => {
			if (element[1].shortName === currentDropdownValue.split(" ")[0]){
				routeNum = element[1].routeId;
			}
		});
		console.log("routeNum",routeNum);
		

		//then, need to get a list of the stops for that route
		//updated to be flexible to out of order stops
		let stopsOnRoute = [];

		Object.entries(routeStops).forEach(routeStop => {

			//found a stop on the route
			if (routeStop[1].routeId === routeNum){

				//find stop name and create stop to add to array
				Object.entries(stops).forEach(stop => {
				
					//found stop obj that matches id
					if (parseInt(stop[0]) === routeStop[1].stopId){
					
						//create stop object with id, name, and order # to add to array
						stopsOnRoute.push({
							id: routeStop[1].stopId,
							name: stop[1].name,
							order: routeStop[1].stopOrder
						});
					
					}
				});

			}
		});

		//sort by order and print
		stopsOnRoute.sort(compareOrder);
		stopsOnRoute.forEach(stop => {
			concatText("mainContent", "Stop " + (stop.order) + ": " + stop.name);
		});

	}
}

//set up event listener to update when new route is selected
window.onload=function(){
	document.getElementById("dropdown").addEventListener("change",printStops);
}

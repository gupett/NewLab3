"use strict";

// Will hold the size entered by the user
var size = 0;

var p1Ships = new Array();

var p2Ships = new Array();

var maxNrShips = 3;

var p1 = true;

// For game statistics
var p1Shots = 0;
var p2Shots = 0;
var p1Hits = 0;
var p2Hits = 0;

// Function to initialize the playing field
function gridSize(){
	// Gets the size the user would like the grid to be at
	size = Number(prompt("Enter the size of the battle field"));
	
	var id = 0;

	// Create a playing field of buttons for each player
	var field1 = document.getElementById("field1");
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++){
			var button = document.createElement("BUTTON");
			// Give all the buttons the same class property
			button.setAttribute("class", "playButton");
			// Give each button an unique id
			button.setAttribute("id", id);
			id++;

			field1.appendChild(button);
		}
		var br = document.createElement("BR");
		field1.appendChild(br);
	}


	var field2 = document.getElementById("field2");
	for (var i = 0; i < size; i++){
		for (var j = 0; j < size; j++){
			var button = document.createElement("BUTTON");
			// Give all the buttons the same class property
			button.setAttribute("class", "playButton");
			// Give each button an unique id
			button.setAttribute("id", id);
			id++;

			field2.appendChild(button);
		}
		var br = document.createElement("BR");
		field2.appendChild(br);
	}

	// Add the button for starting to place the ships
	var gameBtnDiv = document.getElementById("gameButtons");
	var btn = document.createElement("BUTTON");
	btn.setAttribute("id", "shipPlaceButton");
	btn.addEventListener("click", prepareForShips);
	btn.innerHTML = "Place ships";
	gameBtnDiv.appendChild(btn);

	// Add button for starting to play
	var playBtn = document.createElement("BUTTON");
	playBtn.setAttribute("id", "startPlayButton");
	playBtn.addEventListener("click", startPlaying);
	playBtn.innerHTML = "Start game";
	gameBtnDiv.appendChild(playBtn);

}

function prepareForShips(){
	// Setting everything to zero
	p1Ships = new Array();
	p2Ships = new Array();
	p1 = true;

	var buttons = document.getElementsByClassName("playButton");
	for (var i = 0; i < buttons.length; i++){
		buttons[i].addEventListener("click", placeShip);
	}

	this.innerHTML = "Start over";
}

// Function to place the ships
function placeShip(){

	var shipId = Number(this.id);

	if(idForP1(shipId)){ // P1 playcing a ship

		// Check if p1 tries to remove a ship
		if(contains(1, shipId)){
			removeShip(1, id);
		}else{ // Check if p1 can place more ships
			if(maxNrShips > p1Ships.length){
				p1Ships.push(shipId);
			}else{
				alert("P1 you have placed all your ships!");
			}
		}

	}else{ // P2 playcing a ship
		// Check if p1 tries to remove a ship
		if(contains(2, shipId)){
			removeShip(2, id);
		}else{ // Check if p1 can place more ships
			if(maxNrShips > p2Ships.length){
				p2Ships.push(shipId);
			}else{
				alert("P2 you have placed all your ships!");
			}
		}
	}
	setInitialStatistics();
}

// Function to remove all click event listeners and replace 
// with new assosiated to actually playing the game
function startPlaying(){
	

	if (p1Ships.length == maxNrShips && p2Ships.length == maxNrShips){
		alert("event should be removed");
		var buttons = document.getElementsByClassName("playButton");

		for (var i = 0; i < buttons.length; i++){
			// Remove the old eventlistener for placing out ships
			buttons[i].removeEventListener("click", placeShip);
			// Add a new event listener for shooting at ships
			buttons[i].addEventListener("click", attack);
		}
	}else{
		alert("Not all ships has been placed yet")
	}

	
}

// Function to act during the actual playing of the game
function attack(){

	// First check so it is the correct player 
	if (p1){
		if (Number(this.id) > (size*size)-1){
			alert("Not your turn!!!")
			return;
		}
		// Hit
		if(contains(1,Number(this.id))){
			this.style.background = "green";
			p1Hits ++;
		}else{ // Miss
			this.style.background = "red";
		}
		p1Shots ++;
		p1 = false;
	}else{
		if (Number(this.id) < (size*size)){
			alert("Not your turn!!!");
			return;
		}
		// Hit
		if(contains(2,Number(this.id))){
			this.style.background = "green";
			p2Hits ++;
		}else{ //Miss
			this.style.background = "red";
		}
		p2Shots ++;
		p1 = true;
	}

	uppdateStatistics();

	alert("Shot at: " + this.id);


}

function setInitialStatistics(){
	document.getElementById("p1Nr").innerHTML = p1Ships.length + " of " + maxNrShips;
	document.getElementById("p2Nr").innerHTML = p2Ships.length + " of " + maxNrShips;
}

function uppdateStatistics(){
	document.getElementById("p1Shots").innerHTML = p1Shots;
	document.getElementById("p2Shots").innerHTML = p2Shots;
	document.getElementById("p1Hits").innerHTML = p1Hits;
	document.getElementById("p2Hits").innerHTML = p2Hits;

	if (p1Hits == maxNrShips){
		alert("P1 wins!!!");
	}

	if (p2Hits == maxNrShips){
		alert("P2 wins!!!");
	}
}

function contains(p, id){
	if (p == 1){
		for (var i = 0; i < p1Ships.length; i++){
			if (p1Ships[i] == id){
				return true;
			}
		}
	}else{
		for (var i = 0; i < p2Ships.length; i++){
			if (p2Ships[i] == id){
				return true;
			}
		}
	}
	return false;
}

function idForP1(id){
	if (id < (size*size)){
		return true;
	}else{
		return false;
	}
}

function removeShip(p, id){
	if (p == 1){
		var index = p1Ships.indexOf(id);
		p1Ships.splice(index, 1);
	}else{
		var index = p2Ships.indexOf(id);
		p2Ships.splice(index, 1);
	}
}



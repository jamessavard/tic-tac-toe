// JavaScript for Tic-Tac-Toe
// March 4, 2016 by James Savard

// set needed variables
var selected;
var winningCombinations;
var counter = 0;
var squaresFilled = 0;
var gameOver = false;
var content;

// on load, set up the arrays
window.onload = function() {
	"use strict";
	selected = [];
	content = [];
	document.getElementById("textMessage").innerHTML = "";	
	
	// set the winning combinations array
	winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	
	// deselect all squares
	for(var l = 0; l <= 8; l++) {
		selected[l] = false;
		content[l] = '';
	}
};

// game functions
function squareClicked(squareNumber) {
	"use strict";
	var verbosePositions = [['Top Left'],['Top Centre'],['Top Right'],['Middle Left'],['Middle Centre'],['Middle Right'],['Bottom Left'],['Bottom Middle'],['Bottom Right']];
	var theSquare = "square" + squareNumber;
	var currentSquare;
	var entry;
	var entryText;
	var c = document.getElementById(theSquare);
	var xlist = document.getElementById('xlist');
	var olist = document.getElementById('olist');
	var cxt = c.getContext("2d");
	
	// if this square is not already selected and the game is not over, proceed
	if (((selected[squareNumber-1]) === false) && (gameOver === false)) {
		if (counter%2 === 0) {
			cxt.beginPath();
			cxt.moveTo(5,5);
			cxt.lineTo(35,35);
			cxt.moveTo(35,5);
			cxt.lineTo(5,35);
			cxt.stroke();
			cxt.closePath();
			content[squareNumber-1] = 'X';
		} else {
			cxt.beginPath();
			cxt.arc(20,20,15,0,Math.PI*2,true);
			cxt.stroke();
			cxt.closePath();
			content[squareNumber-1] = 'O';
		}
		counter++;
		document.getElementById("textMessage").innerHTML = "";
		selected[squareNumber-1] = true;
		
		// add moves to the log
		if (content[squareNumber-1] === 'X') {
			currentSquare = squareNumber-1;
			entryText = 'X takes square ' + verbosePositions[currentSquare];
			entry = document.createElement('li');
			entry.appendChild(document.createTextNode(entryText));
			xlist.appendChild(entry);
		} else {
			currentSquare = squareNumber-1;
			entryText = 'O takes square ' + verbosePositions[currentSquare];
			entry = document.createElement('li');
			entry.appendChild(document.createTextNode(entryText));
			olist.appendChild(entry);
		}
		squaresFilled++;
		
		// check for a winner
		checkForAWinner(content[squareNumber-1]);
		if (squaresFilled === 9) {
			document.getElementById("textMessage").innerHTML = "This game is a draw.<br/>Click <a href='tic-tac-toe.html'>here</a> to play again!";
			gameOver = true;
		}
	} else {
		// only other possibility is if the space is already taken, so display message
		if (gameOver === false) {
			document.getElementById("textMessage").innerHTML = "Oops - space is already taken!";
		}
	}
}

function checkForAWinner(symbol) {
	"use strict";
	var a;
	for(a = 0; a < winningCombinations.length; a++) {
		if (content[winningCombinations[a][0]] === symbol && content[winningCombinations[a][1]] === symbol && content[winningCombinations[a][2]] === symbol) {
			document.getElementById("textMessage").innerHTML= symbol + " is the winner!<br/>Click <a href='tic-tac-toe.html'>here</a> to play again!";
			gameOver = true;
		}
	}
}
// Tic-Tac-Toe with Log
// March 6, 2016 by James Savard

// set needed variables
var selected;
var winningCombinations;
var counter = 0;
var squaresFilled = 0;
var gameOver = false;
var content = [];
var player = "X"; // initial player is always X
var otherplayer = "O"; // initial other player is O (for blocking purposes initially)
var isGameOver = false;
var chosenSquare = false;

// on load, set up the arrays
window.onload = function() {
	selected = [];
	document.getElementById("textMessage").innerHTML = "";	
	
	// set the winning combinations array
	winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	
	// deselect all squares
	for(var l = 0; l <= 8; l++) {
		selected[l] = false;
		content[l] = '';
	}
	
	// choose a move for the current player
	var i = 0;
	do {
		chooseMove(player);
		i++;
	}
	while (i < 9 && gameOver === false);
	
};

// choose a move to make
function chooseMove(player) {
	"use strict";
	if (isGameOver === false) {
		if (chosenSquare === false) {
			chosenSquare = winCheck(player);
		}
		if (chosenSquare === false) {			
			chosenSquare = blockCheck(player,otherplayer);
		} 
		if (chosenSquare === false) {		
			chosenSquare = otherCheck();
		}			
		isGameOver = squareClicked(chosenSquare);
		chosenSquare = false;
	}
}

function wait(msecs)
{
var start = new Date().getTime();
var cur = start
while(cur - start < msecs)
{
cur = new Date().getTime();
}	
} 

// game functions
function squareClicked(squareNumber) {
	"use strict";
	var verbosePositions = [['Top Left'],['Top Centre'],['Top Right'],['Middle Left'],['Middle Centre'],['Middle Right'],['Bottom Left'],['Bottom Middle'],['Bottom Right']];
	var theSquare = "square" + (squareNumber+1); // + 1 because the HTML board is 1-9 instead of 0-8
	var currentSquare;
	var entry;
	var entryText;
	var c = document.getElementById(theSquare);
	var xlist = document.getElementById('xlist');
	var olist = document.getElementById('olist');
	var cxt = c.getContext("2d");
	
	// if this square is not already selected and the game is not over, proceed
	if (((selected[squareNumber]) === false) && (gameOver === false)) {
		if (counter%2 === 0) {
			cxt.beginPath();
			cxt.moveTo(5,5);
			cxt.lineTo(35,35);
			cxt.moveTo(35,5);
			cxt.lineTo(5,35);
			cxt.stroke();
			cxt.closePath();
			content[squareNumber] = 'X';
		} else {
			cxt.beginPath();
			cxt.arc(20,20,15,0,Math.PI*2,true);
			cxt.stroke();
			cxt.closePath();
			content[squareNumber] = 'O';
		}
		counter++;
		
		document.getElementById("textMessage").innerHTML = "";
		selected[squareNumber] = true;
		
		// add moves to the log
		if (content[squareNumber] === 'X') {
			currentSquare = squareNumber;
			entryText = 'X takes square ' + verbosePositions[currentSquare];
			entry = document.createElement('li');
			entry.appendChild(document.createTextNode(entryText));
			xlist.appendChild(entry);
		} else {
			currentSquare = squareNumber;
			entryText = 'O takes square ' + verbosePositions[currentSquare];
			entry = document.createElement('li');
			entry.appendChild(document.createTextNode(entryText));
			olist.appendChild(entry);
		}
		squaresFilled++;
		alert(entryText + ' - click for Next Move');
		// switch to the other player
		if (player === "X") {
			player = "O";
			otherplayer = "X";
		} else {
			player = "X";
			otherplayer = "O";
		}
		
		// check for a winner
		checkForAWinner(content[squareNumber]);
		if (squaresFilled === 9) {
			document.getElementById("textMessage").innerHTML = "This game is a draw.<br/>Click <a href='tic-tac-toe.html'>here</a> to play again!";
			gameOver = true;
			return true;
		}
		return false;
		
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

// check for a win opportunity
function winCheck(player) {
	"use strict";
    if(content[0] === player && content[1] === player && content[2] === "") {
        return 2;
    }
    else if(content[1] === player && content[2] === player && content[0] === "") {
        return 0;
    }
    else if(content[3] === player && content[4] === player && content[5] === "") {
        return 5;
    }
    else if(content[4] === player && content[5] === player && content[3] === "") {
        return 3;
    }
    else if(content[6] === player && content[7] === player && content[8] === "") {
        return 8;
    }
    else if(content[7] === player && content[8] === player && content[6] === "") {
        return 6;
    }
    else if(content[0] === player && content[4] === player && content[8] === "") {
        return 8;
    }
    else if(content[4] === player && content[8] === player && content[0] === "") {
        return 0;
    }
    else if(content[2] === player && content[4] === player && content[6] === "") {
        return 6;
    }
    else if(content[6] === player && content[4] === player && content[2] === "") {
        return 2;
    }
    else if(content[0] === player && content[2] === player && content[1] === "") {
        return 1;
    }
    else if(content[3] === player && content[5] === player && content[4] === "") {
        return 4;
    }
    else if(content[6] === player && content[8] === player && content[7] === "") {
        return 7;
    }
    else if(content[0] === player && content[6] === player && content[3] === "") {
        return 3;
    }
    else if(content[1] === player && content[7] === player && content[4] === "") {
        return 4;
    }
    else if(content[2] === player && content[8] === player && content[5] === "") {
        return 5;
    }
    else if(content[0] === player && content[4] === player && content[8] === "") {
        return 8;
    }
    else if(content[3] === player && content[6] === player && content[0] === "") {
        return 0;
    }
    else if(content[4] === player && content[7] === player && content[1] === "") {
        return 1;
    }
    else if(content[5] === player && content[8] === player && content[2] === "") {
        return 2;
    }
    else if(content[0] === player && content[3] === player && content[6] === "") {
        return 6;
    }
    else if(content[1] === player && content[4] === player && content[7] === "") {
        return 7;
    }
    else if(content[2] === player && content[5] === player && content[8] === "") {
        return 8;
    }
    else if(content[0] === player && content[8] === player && content[4] === "") {
        return 4;
    }
    else if(content[2] === player && content[6] === player && content[4] === "") {
        return 4;
    } else {
		return false;
	}
}

// check for a block opportunity
function blockCheck(player,otherplayer) {
	"use strict";
    if(content[0] === otherplayer && content[1] === otherplayer && content[2] === "") {
        return 2;
    }
    else if(content[1] === otherplayer && content[2] === otherplayer && content[0] === "") {
        return 0;
    }
    else if(content[3] === otherplayer && content[4] === otherplayer && content[5] === "") {
        return 5;
    }
    else if(content[4] === otherplayer && content[5] === otherplayer && content[3] === "") {
        return 3;
    }
    else if(content[6] === otherplayer && content[7] === otherplayer && content[8] === "") {
        return 8;
    }
    else if(content[7] === otherplayer && content[8] === otherplayer && content[6] === "") {
        return 6;
    }
    else if(content[0] === otherplayer && content[4] === otherplayer && content[8] === "") {
        return 8;
    }
    else if(content[4] === otherplayer && content[8] === otherplayer && content[0] === "") {
        return 0;
    }
    else if(content[2] === otherplayer && content[4] === otherplayer && content[6] === "") {
        return 6;
    }
    else if(content[6] === otherplayer && content[4] === otherplayer && content[2] === "") {
        return 2;
    }
    else if(content[0] === otherplayer && content[2] === otherplayer && content[1] === "") {
        return 1;
    }
    else if(content[3] === otherplayer && content[5] === otherplayer && content[4] === "") {
        return 4;
    }
    else if(content[6] === otherplayer && content[8] === otherplayer && content[7] === "") {
        return 7;
    }
    else if(content[0] === otherplayer && content[6] === otherplayer && content[3] === "") {
        return 3;
    }
    else if(content[1] === otherplayer && content[7] === otherplayer && content[4] === "") {
        return 4;
    }
    else if(content[2] === otherplayer && content[8] === otherplayer && content[5] === "") {
        return 5;
    }
    else if(content[0] === otherplayer && content[4] === otherplayer && content[8] === "") {
        return 8;
    }
    else if(content[3] === otherplayer && content[6] === otherplayer && content[0] === "") {
        return 0;
    }
    else if(content[4] === otherplayer && content[7] === otherplayer && content[1] === "") {
        return 1;
    }
    else if(content[5] === otherplayer && content[8] === otherplayer && content[2] === "") {
        return 2;
    }
    else if(content[0] === otherplayer && content[3] === otherplayer && content[6] === "") {
        return 6;
    }
    else if(content[1] === otherplayer && content[4] === otherplayer && content[7] === "") {
        return 7;
    }
    else if(content[2] === otherplayer && content[5] === otherplayer && content[8] === "") {
        return 8;
    }
    else if(content[0] === otherplayer && content[8] === otherplayer && content[4] === "") {
        return 4;
    }
    else if(content[2] === otherplayer && content[6] === otherplayer && content[4] === "") {
        return 4;
    } else {
		return false;	
	}
}
	
// check next best opportunity other than winning or blocking
function otherCheck() {
	"use strict";
	if(content[4] === "") {
		return 4;
	}
	else if(content[0] === "") {
		return 0;
	}
	else if(content[8] === "") {
		return 8;
	}
	else if(content[5] === "") {
		return 5;
	}
	else if(content[1] === "") {
		return 1;
	}
	else if(content[7] === "") {
		return 7;
	}
	else if(content[2] === "") {
		return 2;
	}
	else if(content[6] === "") {
		return 6;
	}
	else if(content[3] === "") {
		return 3;
	} else {
		return false;
	}
}
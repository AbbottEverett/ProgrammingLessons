 // index.js

function Tile (id, domElement) {
	var tile = this;
	
	// Set up Public Members
	tile.init = function() {
		iconUpdate();
		domElement.onclick = function(){
			if(tile.state == TileState.clear) {
				tile.changeState(TileState.x);
				game.checkWin();
				game.comp.play();
				game.checkWin();
			}
			
		};
	};
	tile.state = TileState.clear;
	tile.id = id;
	tile.changeState = function(newState) {
		tile.state = newState;
		iconUpdate();
	};
	
	// Set up Private Members
	var icon = domElement.getElementsByTagName("i")[0];
	var iconUpdate = function() {
		switch(tile.state) {
		case TileState.clear:
			icon.className = "fa";
			$(domElement).removeClass('x-color');
			$(domElement).removeClass('o-color');
			break;
		case TileState.x:
			icon.className = "fa fa-times";
			$(domElement).addClass('x-color');
			break;
		case TileState.o:
			icon.className = "fa fa-circle-o";
			$(domElement).addClass('o-color');
			break;
		}
	};
	
}

var TileState = {
	clear: 0,
	x: 1,
	o: 2
};

function GameBoard () {
	
	var gameBoard = this;
	
	gameBoard.init = function() {
		var tileSet = document.getElementsByClassName("tile");
		var i;
		for (i = 0; i < tileSet.length; i++) {
			var t = new Tile(i, tileSet[i]);
			gameBoard.allTiles.push(t);
			t.init();
		}
		gameBoard.reset();
	};
	
	// public reset gameBoard method to a cleared out state
	gameBoard.reset = function() {
		var i;
		for (i = 0; i < gameBoard.allTiles.length; i++) {
			gameBoard.allTiles[i].changeState(TileState.clear);
		}
	};
	
	// method that can check if all 3 tiles x or o returns boolean. - private
	var compareTiles = function(tile1, tile2, tile3) {
		
		if(gameBoard.allTiles[tile1].state == TileState.x) {
			if(gameBoard.allTiles[tile2].state == TileState.x) {
				if(gameBoard.allTiles[tile3].state == TileState.x) {
					return {
						match: true,
						tileState: "x"
					};
				} else {
					return {
						match: false,
						tileState: "x"
					};
				}
			} else {
				return {
					match: false,
					tileState: "x"
				};
			}
		} else if(gameBoard.allTiles[tile1].state == TileState.o) {
			if(gameBoard.allTiles[tile2].state == TileState.o) {
				if(gameBoard.allTiles[tile3].state == TileState.o) {
					return {
						match: true,
						tileState: "o"
					};
				} else {
					return {
						match: false,
						tileState: "o"
					};
				}
			} else {
				return {
					match: false,
					tileState: "o"
				};
			}
		} else {
			return {
				match: false,
				tileState: "clear"
			};
		}
	};
	
	gameBoard.checkWinner = function() {
		var winConditions = [];
		winConditions.push(compareTiles(0,1,2));
		winConditions.push(compareTiles(0,3,6));
		winConditions.push(compareTiles(0,4,8));
		winConditions.push(compareTiles(1,4,7));
		winConditions.push(compareTiles(2,5,8));
		winConditions.push(compareTiles(2,4,6));
		winConditions.push(compareTiles(3,4,5));
		winConditions.push(compareTiles(6,7,8));
		// 8 push
		
		// checks object in array 
		// sees if match is true, and returns that object
		var i;
		for (i = 0; i < winConditions.length; i++) {
			var match = winConditions[i].match;
			if(match) {
				return winConditions[i];
			}
		}
		
		return {
			match: false,
			tileState: "clear"
		};
	};
	
	gameBoard.isPlayable = function(){
		var t;
		for (t in gameBoard.allTiles) {
			if (gameBoard.allTiles[t].state === TileState.clear) {
				return true;
			}
		}
		return false;
	};
	
	gameBoard.allTiles = [];
	
}

function ScoreBoard() {
	
	var scoreBoard = this;
	
	// properties private - humanScore, compScore, 
	var humanScore = 0;
	var compScore = 0;
	
	var updateScoreboard = function(){
		$('#pScoreBox h4 span').text(humanScore);
		$('#cScoreBox h4 span').text(compScore);
	};
	
	
	// resets the scoreboard all back to zero.
	scoreBoard.resetBoard = function() {
		humanScore = 0;
		compScore = 0;
		updateScoreboard();
	};
	
	scoreBoard.incrementHuman = function() {
		humanScore += 1;
		updateScoreboard();
	};
		
	scoreBoard.incrementComp = function() {
		compScore += 1;
		updateScoreboard();
	};
	
	
	
}

function ResetButton(scoreBoard, gameBoard) {
	// methods - init, 
	// takes in a scoreBoard object and gameBoard object
}

function Game() {
	var game = this;
	
	// set public members
	game.gB = new GameBoard;
	game.sB = new ScoreBoard;
	game.rB = new ResetButton;
	game.comp = new Computer;
	game.box = new DialogBox;
	
	game.init = function() {
		game.gB.init();
	};

	// checkWin method - checks if human or comp player won, reset board and update score	
	game.checkWin = function() {
		
		var winner = game.gB.checkWinner();
		debugger;
		
		if (winner.tileState == "x") {
			game.box.showHumanWinner();
			game.sB.incrementHuman();
			game.gB.reset();
			
		} else if (winner.tileState == "o") {
			game.box.showComputerWinner();
			game.sB.incrementComp();
			game.gB.reset();
		} else if (winner.tileState == "clear" && !game.gB.isPlayable()) {
			// game is tied if there is no winner, and the gameboard is not playable
			game.box.showTie();
			game.gB.reset();
		}
		
	};
	
}

function Computer() {
	
	var comp = this;
	
	// method that returns a round number between 0 & 8
	var tileSelect = function() {
		var selectTileIndex = function() {
			var indexNum = Math.floor((Math.random()* 10));
			return indexNum;
		};
		
		var index = selectTileIndex();
		
		while (index > 8) {
			index = selectTileIndex();
		}
		
		return index;
	};
	
	// method play that updates a tile with an o and checks win 
	comp.play = function() {
		var tiles = game.gB.allTiles;
		var indexChoice = tileSelect();
		var computerChoice = tiles[indexChoice];
		
		while(computerChoice.state != TileState.clear) {
			indexChoice = tileSelect();
			computerChoice = tiles[indexChoice];
		}
		computerChoice.changeState(TileState.o);
		
		
	};
	
}

function DialogBox() {
	var box = this;
	var domElement = $('#modalContainer .modal');
	var modalTitle = domElement.find('h4.modal-title');
	var bodyText = domElement.find('.modal-body p');
		
	var show = function() {
		domElement.modal('show');
		
	};
		
	box.showHumanWinner = function() {
		modalTitle.text('You win!');
		show();
	};
	
	box.showComputerWinner = function(){
		modalTitle.text('Computer player wins!');
		show();
	};
	
	box.showTie = function() {
		modalTitle.text('No one wins!');
		show();
	};
	
	box.close = function(){
		domElement.modal('hide');
	};
	
}

var game = new Game();

$(document).ready(function(){
	game.init();	
});


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
			break;
		case TileState.x:
			icon.className = "fa fa-times";
			break;
		case TileState.o:
			icon.className = "fa fa-circle-o";
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
	
	gameBoard.allTiles = [];
	
}

function ScoreBoard() {
	
	var scoreBoard = this;
	
	// properties private - humanScore, compScore, 
	var humanScore = 0;
	var compScore = 0;
	
	
	scoreBoard.resetBoard = function() {
		// click button, sets scores back to zero
	};
	
	scoreBoard.incrementHuman = function() {
		humanScore += 1;
	};
	
	scoreBoard.incrementComp = function() {
		compScore += 1;
	};
}

function ResetButton(scoreBoard, gameBoard) {
	// methods - init, 
	// takes in a scoreBoard object and gameBoard object
}

function Game() {
	var game = this;
	
	game.init = function() {
		game.gB.init();
	};
	
	game.gB = new GameBoard;
	
	game.sB = new ScoreBoard;
	
	game.rB = new ResetButton;
	
	
	game.comp = new Computer;
	
	// checkWin method - checks if human or comp player won, reset board and update score
	
	game.checkWin = function() {
		var winner = game.gB.checkWinner();
		if (winner.tileState == "x") {
			game.sB.incrementHuman();
			game.gB.reset();
		} else if (winner.tileState == "o") {
			game.sB.incrementComp();
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

var game = new Game();

game.init();



// -----------------------------------------------------
// tick-tack-toe
// -----------------------------------------------------
var game = function(player, computer, board){
	var reset = function(){};
	var checkWinner = function(){};
};

var player = function(board){
	var setTile = function(tile){
	};
};

var computer = function(board){
	var setTile = function(tile){
	};
};

var board = {
	tiles: [],
};

var tile = function(id){
	var _id = id;
	var _domElement = document.gelementBy....(id);
	var _state = "";
	
	var _changeState: function(state){
		_state = state;
		domElement.className = "fa-times";
	};
	
	return {
		id: _id,
		state: _state,
		changeState: _changeState
	};
};





// -----------------------------------------------------
// more object fun!
// -----------------------------------------------------

// These two are equivalent
function tile(isTaken){
	this.isTaken = isTaken;
};
var t = new tile(false);



function tile(isTaken){
	var isTaken = isTaken;
	
	return {
		isTaken: isTaken
	};
};

var t = tile(isTaken);






// -----------------------------------------------------
// Object Access
// -----------------------------------------------------
var car = {
	make: "Subaru",
	model: "WRX"
};

// "Subaru"
console.log(car.make);

// "Subaru"
console.log(car["make"]);


// "make"
// "model"
var propName;
for(propName in car) {
	console.log(propName);
}

// "Subaru"
// "WRX"
var propName;
for(propName in car) {
	console.log(car[propName]);
}

// -----------------------------------------------------
// For Loop Examples
// -----------------------------------------------------
var i;
for (i = 0; i < cars.length; i++) {
	var car = cars[i];
	console.log(car.model);
}

var car;
for (car in cars) {
	console.log(car.model);
}



var i;
for (i = 0; i < numbers.length; i++) {
	var num = numbers[i];
	console.log(num);
}

var num;
for (num in numbers) {
	console.log(num);
}

//-----------------------------------------------------
// Switch Case Examples
// -----------------------------------------------------
if (type == "fire" || type == "fire-flying") {
	fireAttack();
} else if (type == "water") {
	waterAttack();
}


switch(type) {
	
	case "fire-flying":
	case "fire":
		fireAttack();
		break;
		
	case "water":
		waterAttack();
		break;
		
	default:
		console.log("unknown type encountered! type: " + type);
		
}


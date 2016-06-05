/*********************************
		Index.js
*********************************/


// I never learned this formula in math, so this only reads up to 120.
/*
function isPrimeNumber(num) {
	if ((num % 2 == 0) && (num != 2)) {
		return false;
	} else if ((num % 3 == 0) && (num != 3)) {
		return false;
	} else if ((num % 5 == 0) && (num != 5)) {
		return false;
	} else if ((num % 7 == 0) && (num != 7)) {
		return false;
	} else if ((num % 9 == 0) && (num != 9)) {
		return false;
	} else {
		return true;
	}
}
*/

// assume numbers are 1 or bigger!
function isPrimeNumber(num) {
	
	if (num == 1 || num == 2 || num == 3) {
		return true;
	} else {
		var i;
		for (i = 2; i < num; i++) {
			
			if (num % i == 0) {
				return false;
			}
		}
		
		return true;
	}
}


// This one was pretty easy
function max(number1, number2) {
	if (number1 > number2) {
		return number1;
	} else {
		return number2;
	}
}

// Works!

function swapValuesInArray(inputArray, arrayIndexA, arrayIndexB) {
	var placeHolder = inputArray[arrayIndexB];
	inputArray[arrayIndexB] = inputArray[arrayIndexA];
	inputArray[arrayIndexA] = placeHolder;
	return inputArray;
}

y = [17, 19, 3, 5, 10];


// Loops only once :(
/*
function sortArray(inputArray) {
	
	for (i = 0; i < inputArray.length; i++) {
		
		for (j = i; j < inputArray.length; j++) {
			
			if (inputArray[j] > inputArray[j+1]) {
				swapValuesInArray(inputArray, j+1, j);
			} 
			
		}
	}
}
*/

function sortArray(inputArray) {
	
	// 1. loop through the array
	var i;
	for (i = 0; i < inputArray.length; i++) {
		
		// 2. get the item at position i
		var itemI = inputArray[i];
		
		// 3. loop through the array again, starting at i + 1
		var j;
		for (j = i+1; j < inputArray.length; j++) {
			
			// 4. get the item at position j
			var itemJ = inputArray[j];
			
			// 5. if itemI is bigger than itemJ, swap them!
			if (itemI > itemJ) {
				swapValuesInArray(inputArray, j, i);
			}
			
		}
		
	}
	
	return inputArray;
	
}

var num = 100;
var person = { name: "hello" };



sortArray(y);
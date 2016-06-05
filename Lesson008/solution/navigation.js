/* navigation.js */

var navigation = {
	
	init: function() { 
		console.log('init'); 
		var x = document.getElementsByTagName("li");
		var i;
		
		// References the navigation object such that 
		// selectItem is properly accessable.
		var nav = this;
		
		// Loops through all list items (<li> tags)
		for (i = 0; i < x.length; i++) {
			var listItem = x[i];
			
			// when a <li> tag is clicked, print to the console.log
			listItem.onclick = function() {
				nav.selectItem(this);
			};
		}
		
	},
	
	selectItem: function(l) { 
		console.log('selectItem'); 
		console.log(l);
		var nav = this;
		nav.deselectItem();
		l.className = "active";
	},
	
	deselectItem: function() { 
		console.log('deselectItem'); 
		var nav = this;
		var activeLi = nav.getSelectedItem();
		activeLi.className = "";
		console.log(activeLi.className);
		
	},
	
	getSelectedItem: function() { 
		console.log('getSelectedItem'); 
		var x = document.getElementsByClassName("active");
		console.log(x[0]);
		return x[0];
	}
};


navigation.init();
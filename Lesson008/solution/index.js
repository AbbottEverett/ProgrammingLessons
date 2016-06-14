/**** index.js ***/

var pokemonCards = {
	getAllPokemonCards: function() {
		return document.getElementsByClassName("pokeCard");
	},
	
	// Takes Parameter of a div with class pokeCard
	getCardTitle: function(pokeCard) {
		
		// Pulls the first h2 from that div
		var h2 = pokeCard.getElementsByTagName("h2")[0];
		
		return h2.innerHTML;
	},
	
	
	getCardType: function(pokeCard) {
		
		// Pulls the first pokeTitle from card
		var pokeTitle = pokeCard.getElementsByClassName("pokeTitle")[0];
		var pokeClass = pokeTitle.className.replace("pokeTitle ", "");
		console.log(pokeClass);
		return pokeClass;
	},
	
	// Checks to see if searchText exists within titleText
	compareStrings: function(titleText, searchText) {
		
		var titleUpper = titleText.toUpperCase();
		var searchUpper = searchText.toUpperCase();
		var searchPosition = titleUpper.search(searchUpper)
		
		// if the searchText is within titleText or blank, return true;
		if ((searchUpper === "") || (searchPosition >= 0)) {
			return true;
		} else {
			return false;
		}
	},
	
	// Filter the Pokemon Cards based on search string!
	search: function(searchText) {
		var allCards = this.getAllPokemonCards();
		
		var i;
		for(i = 0; i < allCards.length; i++) {
			
			//Compare the Title Text
			var pokeCardCurrent = allCards[i];
			var titleTextCurrent = this.getCardTitle(pokeCardCurrent);
			var searchTextMatchesTitle = this.compareStrings(titleTextCurrent, searchText);
			
			//Compare the Type Text
			var typeTextCurrent = this.getCardType(pokeCardCurrent);
			var searchTextMatchesType = this.compareStrings(typeTextCurrent, searchText);
			
			if (searchTextMatchesTitle || searchTextMatchesType) {
				this.showPokemonCard(pokeCardCurrent);
			} else {
				this.hidePokemonCard(pokeCardCurrent);
			}
		}
	},
	
	// Takes Parameter of a div with class pokeCard
	hidePokemonCard: function(pokeCard) {
		
		pokeCard.style.display = "none";
	},
	
	// Takes Parameter of a div with class pokeCard
	showPokemonCard: function(pokeCard) {
		
		pokeCard.style.display = "inline-block";
	}
};

var searchTool = {
	getSearchText: function() {
		return document.getElementById("searchBox").value;
	},
	
	search: function() {
		var searchInput = this.getSearchText();
		pokemonCards.search(searchInput);
	},
	
	init: function() {
		var searchTool = this;
		document.getElementById("searchBox").onkeyup = function(){
			searchTool.search();
		};
	}
};
debugger;
searchTool.init();


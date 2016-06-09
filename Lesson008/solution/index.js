/**** index.js ***/


var pokemonCards = {
	getAllPokemonCards: function() {
		return document.getElementsByClassName("pokeCard");
	},
	
	// Takes Parameter of a div with class pokeCard
	getCardTitle: function(pokeCard) {
		
		// Pulls the first h2 from that div
		var h2 = pokeCard.getElementsByTagName("h2")[0];
		console.log(h2.innerHTML);
		
		// returns that h2's innerHtml
		return h2.innerHTML;
	},
	
	// Checks titleText & searchText
	compareStrings: function(titleText, searchText) {
		
		var z = titleText.search(searchText)
		
		// if the searchText is within titleText, return true;
		if ((z >= 0) && (searchText != "")) {
			console.log("this works!");
			return true;
		} else if (searchText === "") {
			console.log("empty search!");
			return true;
			
		// otherwise, return false;
		} else {
			console.log("you goofed!");
			return false;
		}
	},
	
	search: function(searchText) {
		var allCards = this.getAllPokemonCards();
		
		var i;
		for(i = 0; i < allCards.length; i++) {
			var pokeCardCurrent = allCards[i];
			var titleTextCurrent = this.getCardTitle(pokeCardCurrent);
			var compareTest = this.compareStrings(titleTextCurrent, searchText);
			
			if(compareTest) {
				this.showPokemonCard(pokeCardCurrent);
			} else {
				this.hidePokemonCard(pokeCardCurrent);
			}
		}
	},
	
	// Takes Parameter of a div with class pokeCard
	hidePokemonCard: function(pokeCard) {
		
		// Hides Cards
		pokeCard.style.display = "none";
	},
	
	// Takes Parameter of a div with class pokeCard
	showPokemonCard: function(pokeCard) {
		
		// Shows Cards
		pokeCard.style.display = "inline-block";
	}
};

pokemonCards.search("Snor");


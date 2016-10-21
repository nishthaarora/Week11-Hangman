exports.Word = function() {

	this.isWordCorrect = function(word, userGuess, letterFound) {
		if (word.indexOf(userGuess.input) !== -1) {
			return letterFound = true;
		} else {
			return letterFound;
		}

	}

}
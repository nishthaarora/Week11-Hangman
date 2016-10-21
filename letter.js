exports.Letter = function() {

	this.checkLetter = function(word, userGuess, displayWord) {

		var wordHolder = displayWord.split('');

		for (var i = 0; i < word.length; i++) {
			if (word.charAt(i) === userGuess.input) {
				wordHolder[i] = userGuess.input;
			}
		}
		displayWord = wordHolder.join('').trim();
		return displayWord;
	}

}
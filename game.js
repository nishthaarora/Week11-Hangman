exports.Game = function() {

	this.getRandomWord = function(options) {
		var randomWord = options[Math.floor(options.length * Math.random())];
		return randomWord;
	}
}
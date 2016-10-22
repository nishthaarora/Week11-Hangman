var letter = require('./letter')
var word = require('./word');
var game = require('./game');
var inquirer = require('inquirer');

var options = ['good morning', 'lord of the rings', 'rst'];

var newGame = new game.Game();
var newWord = new word.Word();
var newLetter = new letter.Letter();

var randomWordSelected;
var letters;
var currentWord = "";
var win = 0;
var lose = 0;
var chances = 10;
var wrongGuess = [];



function toInitialise() {
	chances = 10;
	wrongGuess = [];
	CurrentrandomWord();
	toDisplayDashOrLetter(randomWordSelected);
	userGuess();

}

function CurrentrandomWord() {
	randomWordSelected = newGame.getRandomWord(options);
	console.log('current random word ', randomWordSelected);
	var randIndex = options.indexOf(randomWordSelected);
	var removeChosenWord = options.splice(randIndex, 1);
	return;
}

function toDisplayDashOrLetter(randomCurrentWord) {
	currentWord = "";
	for (var i = 0; i < randomCurrentWord.length; i++) {
		if (randomCurrentWord[i] === " ") {
			currentWord = currentWord + " ";
		} else {
			currentWord = currentWord + "_";
		}

	}
	console.log('current word: ' + currentWord);
}

function userGuess() {
	if (chances > 0) {
		inquirer.prompt([{
			name: 'input',
			message: 'type an alphabet',
			validate: function(value) {
				if (/[a-zA-Z]/.test(value)) {
					return true;
				}
				return "please try again";
			}
		}]).then(function(answer) {
			letters = answer;
			var letterFound = false;
			letterFound = newWord.isWordCorrect(randomWordSelected, letters, letterFound);

			if (letterFound === true) {
				currentWord = newLetter.checkLetter(randomWordSelected, letters, currentWord);
				console.log('current word: ' + currentWord);
				if (currentWord === randomWordSelected) {
					win++
					console.log('|---------------------------------------------------|');
					console.log('|you won this one                                   |');
					console.log('|The Answer Was: ' + randomWordSelected + '|');
					console.log('|' + 'number of games won: ' + win + '|');
					console.log('|' + 'number of games lost: ' + lose + '|');
					console.log('|___________________________________________________|');

					console.log('\n***************    Next Game    *********************');
					toInitialise();
					return;
				}

			} else {
				if (wrongGuess.length === 0) {
					wrongGuess.push(letters.input);
				}
				if (wrongGuess.indexOf(letters.input) === -1) {
					chances--;
					wrongGuess.push(letters.input);
					console.log('Guesses remaining: ' + chances);
				} else {
					console.log('you already guessed that!');
				}
			}
			userGuess();
		})

	} else {
		lose++;
		console.log('|----------------------------------------------------|');
		console.log('|you lost this one                                   |');
		console.log('|The Answer Was: ' + randomWordSelected + '|');
		console.log('|' + 'number of games won: ' + win + '|');
		console.log('|' + 'number of games lost: ' + lose + '|');
		console.log('|___________________________________________________ |');
		toInitialise();
	}

}


CurrentrandomWord();
// toInitialise();
toDisplayDashOrLetter(randomWordSelected);
userGuess();
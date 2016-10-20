var letter = require('./letter')
var word = require('./word');
var game = require('./game');
var inquirer = require('inquirer');

var options = ['good morning', 'good night'];

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
var gameOver = false;


function toInitialise() {

	CurrentrandomWord();
	toDisplayDashOrLetter(randomWordSelected);

	var chances = 10;
	var gameOver = false;
}

function CurrentrandomWord() {
	randomWordSelected = newGame.getRandomWord(options);
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
					console.log('you won this one');
					console.log('number of games won: ' + win);
					console.log('\n************* Next Game ************');
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

				} else {
					// console.log('wrong guesses:' +  '[' + wrongGuess + ',' + ']');
					console.log('you already guessed that!');
				}
			}
			console.log('Guesses remaining: ' + chances);
			userGuess();
		})

	} else {
		console.log('you lost this game');
		lose++;
		console.log('number of games lost:' + lose);
		toInitialise();
	}

}



toInitialise();

userGuess();
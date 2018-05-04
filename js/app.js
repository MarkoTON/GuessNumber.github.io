/*
Game Function:
- Plater must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

///////////////////////////////////////////////////////
//// Game values
let min = 1,
		max = 10,
		winningNum = getRandomNum(min, max),
		guessesLeft = 3;

/////////////////////////////////////////////////////////
//// UI Elements
const game = document.querySelector('#game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.querySelector('#guess-btn'),
			guessInput = document.querySelector('#guess-input'),
			message = document.querySelector('.message'),
			title = document.querySelector('.title'),
			messageID = document.querySelector('#messageID');

//////////////////////////////////////////////////////////
//// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

/////////////////////////////////////////////////////////
//// Play Again event listener
game.addEventListener('mousedown', function  (e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

//////////////////////////////////////////////////////////
//// Listen for guess
guessBtn.addEventListener('click', function () {
	let guess = parseInt(guessInput.value);
	console.log(guess);
	// Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if won
	if (guess === winningNum) {
		// Game over - won
		// //Disable input
		// guessInput.disabled = true;
		// // Change border color
		// guessInput.style.borderColor = 'green';
		// // Set message
		// setMessage(`${winningNum} is correct, YOU WIN!`, 'green');

		gameOver(true, `${winningNum} is correct, YOU WIN!`);

	} else {
		// Wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			//Game over - lost
			// //Disable input
			// guessInput.disabled = true;
			// // Change border color
			// guessInput.style.borderColor = 'red';
			// // Set message
			// setMessage(`Game over, YOU LOST!. The correct number was ${winningNum}`, 'red');

			gameOver(false, `Game over, YOU LOST! The correct number was ${winningNum}`);

		} else {
			// Game continues - answer wrong
			// Change border color
			guessInput.style.borderColor = 'red';
			// message.style.background = 'rgba(0,0,0,0.3)';
			// message.style.display = 'inline-block';
			// Clear Input
			guessInput.values = '';
			// Set message (Tell user its the wrong number)
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
		}
	}
});

///////////////////////////////////////////////////////////
//// Game over
function gameOver (won, msg) {

		let color;
		won === true ? color = 'green' : color = 'red';
		won === true ? background = 'rgba(50,205,50,.25)' : background = 'rgba(255, 0, 0,.25)';

		//Disable input
		guessInput.disabled = true;
		// Change border color
		guessInput.style.borderColor = color;
		// Set text color
		message.style.color = color;
		message.style.display = 'inline-block';
		message.style.padding  = '10px';
		message.style.fontSize = '20px';
		message.style.background = background;
		messageID.style.border = `2px solid ${color}`;
		messageID.style.boxShadow = `5px 5px 0px ${color}`;
		title.style.color = color;
		title.style.padding  = '10px';
		title.style.display = 'inline-block';
		// Set message
		setMessage(msg);


		/// Play Again?
		guessBtn.value = 'Play Again';
		guessBtn.className += 'play-again';// append
}

/////////////////////////////////////////////////////////////
//// Get winning number
function getRandomNum(min , max){
	return Math.floor(Math.random()*(max-min+1)+min);
}


///////////////////////////////////////////////////////////
//// Set message
function setMessage (msg , color, background) {
	message.style.color  = color;
	message.textContent = msg;
}



/*
Game Function
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of correct answer if player loses.
- Let player choose to play again
*/

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3,
  error = '#ff7979',
  success = '#6ab04c',
  msg = '';

// UI Elements
const uiGame = document.querySelector('#game'),
  uiMinNum = document.querySelector('.min-num'),
  uiMaxNum = document.querySelector('.max-num'),
  uiGuessBtn = document.querySelector('#guess-btn'),
  uiGuessInput = document.querySelector('#guess-input'),
  uiMessage = document.querySelector('.message');

// Assing UI Min and Max Numbers
uiMinNum.textContent = min;
uiMaxNum.textContent = max;

// Play Again Event Listener
uiGame.addEventListener('mousedown', function(event) {
  if (event.target.className === 'button-primary play-again') {
    window.location.reload();
  }
});

// Create Guess Event Listener
uiGuessBtn.addEventListener('click', function(event) {
  event.preventDefault();
  let guess = parseInt(uiGuessInput.value);

  // Validate Guess
  if (isNaN(guess) || guess < min || guess > max) {
    msg = `Please enter a number between ${min} and ${max}.`;
    setMessage(msg, error);
  } else {
    // Check if Won
    if (guess === winningNum) {
      // Game Over - Player wins
      msg = `${winningNum} is correct, you win!`;
      gameOver(true, msg);
    } else if (uiGuessInput.value === '') {
      msg = 'You must enter a number in order to play.';
      setMessage(msg, error);
    } else {
      // Player guessed incorrectly
      guessesLeft -= 1;
      if (guessesLeft <= 0) {
        // Game Over - Player Lost
        msg = `Game Over! The correct number was ${winningNum}.`;
        gameOver(false, msg);
      } else {
        // Game continues
        msg = `${guess} is incorrect, ${guessesLeft} guesses left.`;
        setMessage(msg, error);
        uiGuessInput.value = '';
      }
    }
  }
});

// Set Message
function setMessage(msg, color) {
  uiMessage.style.color = color;
  uiMessage.textContent = msg;
}

// Get Winning Num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = success) : (color = error);
  uiGuessInput.disabled = true;
  uiGuessInput.style.borderColor = color;
  setMessage(msg, color);

  // Play Again
  uiGuessBtn.value = 'Play Again';
  uiGuessBtn.classList.add('play-again');
}

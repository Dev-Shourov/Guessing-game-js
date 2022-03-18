/*
GAME FUNCTIONALITY:
- A random number will generate each time for a player to guess
- Player must guess a number between min & max number
- Player gets a certain amount of guesses
- Notify the player if the guess is correct
- Let player know how many guesses are left
- Stop taking input after taking a certain amount of guesses are left
- Let player play again
*/

// vers
let minNum      = 1,
    maxNum      = 10,
    guessNum    = getRandNum(minNum, maxNum),
    totalGuess  = 3;

// UI elements
const UIgame        = document.getElementById('game'),
      UIgameForm    = document.getElementById('game-form'),
      UIminNum      = document.getElementById('min-num'),
      UImaxNum      = document.getElementById('max-num'),
      UIguessInput  = document.getElementById('num-guess'),
      UIguessBtn    = document.getElementById('btn-guess'),
      UImessage     = document.querySelector('.message');

// assign min and max number
UIminNum.textContent = minNum;
UImaxNum.textContent = maxNum;

// play again
    UIgame.addEventListener('click', function(thisEvent){
        if (thisEvent.target.classList.contains('play-again')) {
            window.location.reload();
        }
    });

// get number form UI
UIgameForm.addEventListener('submit', function(thisEvent){
    let getNum = parseInt(UIguessInput.value);
    // check the guess
    if (isNaN(getNum) || getNum<minNum || getNum>maxNum) {
        Notification(`please input a number between ${minNum} to ${maxNum}`, 'red');
    } else if (getNum == guessNum) {
        gameOver(true, `You win. ${getNum} is the correct number`);
    } else {
        totalGuess -= 1;
        if (totalGuess == 0) {
            gameOver(false, `You lose. Correct guess was ${guessNum}`);    
        } else if(totalGuess == 1) {
            Notification(`Opps! wrong answer. You have only ${totalGuess} guess left`, 'red');
            UIguessInput.value = '';
        } else {
            Notification(`Wrong guess. You have ${totalGuess} guesses left`, 'red');
            UIguessInput.value = '';
        }
    }
    thisEvent.preventDefault();
});

// get a random guess
function getRandNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// game Overs
function gameOver(win, msg){
    let color;
    win == true ? color = 'green' : color = 'red';
    UIguessInput.style.borderColor = color;
    UIguessInput.disabled = true;
    Notification(msg, color);
    UIguessBtn.value = 'play again';
    UIguessBtn.className += ' play-again';
}

// notification
function Notification(msg, color){
    UImessage.style.color = color;
    UImessage.textContent = msg;
}

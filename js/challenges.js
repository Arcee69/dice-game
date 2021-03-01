let scores, roundScore, activePlayer, gamePlaying, lastDice, input;

init();

document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying) {
    
        //1. Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = `img/dice-${dice1}.png`;
        document.getElementById('dice-1').src = `img/dice-${dice2}.png`;

        if (dice1 !== 1 && dice2 !== 1) {
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector(`#current--${activePlayer}`).textContent = roundScore;
        } else {
            //Next Player
            nextPlayer();        
        }

        //3. Update the round score If the rolled number was NOT a 1
        /*
            if(dice === 6 && lastDice === 6) {
                //Player looses score
                scores[activePlayer] = 0;
                document.querySelector(`#score--${activePlayer}`).innerText = '0';
                nextPlayer();
            } else if (dice !== 1) {
                //Add Score
                roundScore += dice;
                document.querySelector(`#current--${activePlayer}`).textContent = roundScore;
            } else {
                //Next Player
                nextPlayer();        
            }
            lastDice = dice;
        */
    }     
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if (gamePlaying) {

    // Add current score to the global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector(`#score--${activePlayer}`).innerText = scores[activePlayer];
    
    input = document.querySelector('.final-score').value;
    let winningScore;

    // Undefined, 0, null or "" are coerced to false or falsy value
    // Anything else is coerced to true

    if(input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }
    
    //Check if Player won the game
   if (scores[activePlayer] >= winningScore) {
        document.querySelector(`#name--${activePlayer}`).innerText = 'Winner!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        gamePlaying = false;

    } else {
      //Next Player
      nextPlayer();
        }  
    }  
}); 

function nextPlayer() {
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').innerText = '0';
    document.getElementById('current--1').innerText = '0';

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

                     // For Reference Purpose
    //  document.querySelector('.player--0').classList.remove('player--active');
    //  document.querySelector('.player--1').classList.add('player--active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

// let x = document.querySelector(`#score--0`).textContent;
// console.log(x);

document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';

document.getElementById('score--0').innerText ='0';
document.getElementById('score--1').innerText ='0';
document.getElementById('current--0').innerText ='0';
document.getElementById('current--1').innerText ='0';
document.getElementById(`name--0`).innerText = 'Player 1';
document.getElementById(`name--1`).innerText = 'Player 2';
document.querySelector(`.player--0`).classList.remove('player--winner');
document.querySelector(`.player--1`).classList.remove('player--winner');
document.querySelector(`.player--0`).classList.remove('player--active');
document.querySelector(`.player--1`).classList.remove('player--active');
document.querySelector(`.player--0`).classList.add('player--active');
};
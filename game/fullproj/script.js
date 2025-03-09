(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const p1Score = document.querySelector('#p1score');
    const p2Score = document.querySelector('#p2score');
    const actionArea = document.querySelector('#actions');
    const instructions = document.querySelector('#instructions');

    const gameData = {
        dice:['1die.png', '2die.png', '3die.png', '4die.png', '5die.png', '6die.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29,

        resetPoint:0
    };

    startGame.addEventListener('click', function(){
        gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        setUpTurn();
    });

    function setUpTurn(){
        instructions.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

        //change here
        gameData.resetPoint = gameData.score[gameData.index];

        document.querySelector('#roll').addEventListener('click', function(){
            throwDice();
        })
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        instructions.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        game.innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}"> <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        

        if(gameData.rollSum===2){
            instructions.innerHTML += '<p>oh snap! snake eyes!</p>';
            gameData.score[gameData.index]=0;
            gameData.index ? (gameData.index=0) : (gameData.index =1);
            
            //show current score
            console.log(`p1: ${gameData.score[0]} p2: ${gameData.score[1]}`);
            showCurrentScore();
            setTimeout(setUpTurn,2000);
        }else if(gameData.roll1===1 || gameData.roll2===1){
            //change here
            gameData.score[gameData.index] = gameData.resetPoint;

            gameData.index ? (gameData.index=0) : (gameData.index =1);
            instructions.innerHTML += `<p>sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`

            console.log(`p1: ${gameData.score[0]} p2: ${gameData.score[1]}`);
            showCurrentScore();
            setTimeout(setUpTurn,2000);
        }else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            console.log(`p1: ${gameData.score[0]} p2: ${gameData.score[1]}`);

            instructions.innerHTML += `Your pig moved ${gameData.rollSum}m forward.`
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.querySelector('#rollagain').addEventListener('click', function(){
                //setUpTurn();
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                gameData.index ? (gameData.index=0) : (gameData.index =1);
                setUpTurn();
            })
            //set winning condition
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            scores.innerHTML = `<h2>${gameData.players[gameData.index]} wins!`;
    
            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a New Game?';
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        p1Score.innerHTML = `<p><strong>${gameData.players[0]}: ${gameData.score[0]}m</strong></p>`
        p2Score.innerHTML = `<p><strong>${gameData.players[1]}: ${gameData.score[1]}m</strong><p>`
    }


})();
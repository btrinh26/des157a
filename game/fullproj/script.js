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
    let trackLength = document.querySelector("#characters").offsetWidth - 120;
    const p1Pig = document.querySelector("#p1character");
    const p2Pig = document.querySelector("#p2character");
    let p1Position;
    let p2Position; 
    const diceSound = new Audio('sounds/dice.mp3');
    const winSound = new Audio('sounds/win.mp3');
    const hurtSound = new Audio('sounds/hurt.mp3');
    const swishSound = new Audio('sounds/swish.mp3');

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
        instructions.innerHTML = `<p><b>${gameData.players[gameData.index]}'s</b> Turn`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

        gameData.resetPoint = gameData.score[gameData.index];

        document.querySelector('#roll').addEventListener('click', function(){
            throwDice();
        })
    }

    function throwDice(){
        diceSound.play();
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        instructions.innerHTML = `<p><b>${gameData.players[gameData.index]}'s</b> turn</p>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        game.innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}"> <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        

        if(gameData.rollSum===2){
            hurtSound.play();
            if (gameData.index == 0){
                setTimeout(function(){
                    p1Pig.className = 'spin2';
                }, 2);
                p1Pig.className = '';
            } else if (gameData.index == 1){
                setTimeout(function(){
                    p2Pig.className = 'spin2';
                }, 2);
                p2Pig.className = '';
            }

            instructions.innerHTML += '<p>oh snap! <b>snake eyes</b>!</p>';
            gameData.score[gameData.index]=0;
            gameData.index ? (gameData.index=0) : (gameData.index =1);
            
            //show current score
            console.log(`p1: ${gameData.score[0]} p2: ${gameData.score[1]}`);
            showCurrentScore();
            setTimeout(setUpTurn,1000);
        }else if(gameData.roll1===1 || gameData.roll2===1){
            //change here
            gameData.score[gameData.index] = gameData.resetPoint;
            hurtSound.play();

            if (gameData.index == 0){
                setTimeout(function(){
                    p1Pig.className = 'spin1';
                }, 2);
                p1Pig.className = '';
            } else if (gameData.index == 1){
                setTimeout(function(){
                    p2Pig.className = 'spin1';
                }, 2);
                p2Pig.className = '';
            }

            gameData.index ? (gameData.index=0) : (gameData.index =1);
            instructions.innerHTML += `<p>One of your rolls was a <b>one</b>, switching to ${gameData.players[gameData.index]}</p>`

            console.log(`p1: ${gameData.score[0]} p2: ${gameData.score[1]}`);
            showCurrentScore();
            setTimeout(setUpTurn,1000);
        }else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            console.log(`p1: ${gameData.score[0]} p2: ${gameData.score[1]}`);

            instructions.innerHTML += `Your pig moved <b>${gameData.rollSum}m</b> forward.`
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            if (gameData.roll1 == gameData.roll2){
                instructions.innerHTML += ` And you rolled a <b>double</b>. You sent the other pig <b>${gameData.roll1}m</b> back.`
                hurtSound.play();
                if (gameData.index == 0){
                    if (gameData.score[1] <= gameData.roll1){
                        gameData.score[1] = 0;
                    } else{
                        gameData.score[1] = gameData.score[1] - gameData.roll1;
                    }
                    setTimeout(function(){
                        p2Pig.className = 'spin1';
                    }, 2);
                    p2Pig.className = '';
                } else if (gameData.index == 1){
                    if (gameData.score[0] <= gameData.roll1){
                        gameData.score[0] = 0;
                    } else{
                        gameData.score[0] = gameData.score[0] - gameData.roll1;
                    }
                    setTimeout(function(){
                        p1Pig.className = 'spin1';
                    }, 2);
                    p1Pig.className = '';
                }
            }

            document.querySelector('#rollagain').addEventListener('click', function(){
                //setUpTurn();
                throwDice();
            });

            document.querySelector('#pass').addEventListener('click', function(){
                swishSound.play();
                gameData.index ? (gameData.index=0) : (gameData.index =1);
                setUpTurn();
            })
            //set winning condition
            checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            winSound.play();
            scores.innerHTML = `<h2>${gameData.players[gameData.index]} wins!`;
            scores.className = 'scorefinal';
    
            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a New Game?';

            if (gameData.index == 0){
                p1Pig.style.left = `${trackLength}px`;
            } else if (gameData.index == 1){
                p2Pig.style.left = `${trackLength}px`;
            }
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        p1Score.innerHTML = `<p><strong>${gameData.players[0]}: ${gameData.score[0]}m</strong></p>`
        p2Score.innerHTML = `<p><strong>${gameData.players[1]}: ${gameData.score[1]}m</strong><p>`
    
        movePigs(); 
    }
    
    function movePigs(){
        trackLength = document.querySelector("#characters").offsetWidth - 120;
        p1Position = (gameData.score[0]/gameData.gameEnd) * trackLength;
        p2Position = (gameData.score[1]/gameData.gameEnd) * trackLength;
        
        // console.log(trackLength);
        // console.log(p1Position);
        // console.log(p2Position);
    
        p1Pig.style.left = `${p1Position}px`;
        p2Pig.style.left = `${p2Position}px`;
    }
})();
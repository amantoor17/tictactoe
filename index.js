const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//THIS FUNCTION INITIALIZE THE GAME 
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //TO EMPTY THE BOXES ON USER INTERFACE
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //INITIALIZE BOXES WITH DEAFULT CSS PROPERTIES
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //ALL 3 BOXES SHOULD BE NON-EMPTY AND EXACTLY SAME IN VALUE 
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //TO CHECK WHO IS THE WINNER X OR O 
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //TO DISABLE POINTER EVENTS 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //THIS TELLS WHO IS THE WINNER ON UI
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //THIS TELLS WE HAVE A WINNER
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //NO WINNER FOUND, TO CHECK IF GAME IS A TIE 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //BOARD IS FILLED, GAME IS TIE 
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //TO SWAP THE PLAYER TURN
        swapTurn();
        //TO CHECK THE STATUS OF THE GAME 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
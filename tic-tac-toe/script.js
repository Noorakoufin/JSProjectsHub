let boxes = document.querySelectorAll('.boxes');
let reset = document.querySelector('#reset');
let result = document.querySelector('#result');
let newGame = document.querySelector('#newgame');
let overlay = document.querySelector('.overlay');
let wrapper = document.querySelector(".wrapper");
let clickAudio = new Audio("click.wav");
let resetAudio = new Audio("reset.wav");
let winAudio = new Audio("win.wav");
let drawAudio = new Audio("draw.wav");
let currentPlayer = 'o';
let gameOver = false;
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//we are able to use forEach on a nodelist directly .
//(without converting it into an array)because it supports foreach(not a direct array method)
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        clickAudio.play();
        if (gameOver) return;
        currentPlayer = currentPlayer === 'o' ? 'x' : 'o';
        box.style.textShadow = currentPlayer === 'x' ? '#e71919 0 0 12px' : 'rgb(50 94 203) 0px 0px 12px'
        box.textContent = currentPlayer;
        box.disabled = true;
        checkWinner();
    })
})

//function  to check for winner
const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1val = boxes[pattern[0]].textContent;
        let pos2val = boxes[pattern[1]].textContent;
        let pos3val = boxes[pattern[2]].textContent;
        if (pos1val === '' || pos2val === '' || pos3val === '') continue;
        if (pos1val === pos2val && pos2val === pos3val) {
            gameOver = true;
            showWinner(pos1val);
            return;
        }
    }
    checkDraw();
}
//function to show winner 
function showWinner(winner) {
    winAudio.play();
    wrapper.style.backgroundColor = "rgb(83 86 83 / 90%)";
    overlay.style.display = "flex";
    result.innerHTML = `player '${winner.toUpperCase()}' wins!! `
    disableButton();
}
//function to disable all the buttons
function disableButton() {
    for (let box of boxes) {
        box.disabled = true;
    }
}
//function to check for a draw
function checkDraw() {
    let notEmpty = Array.from(boxes).every((box) => box.textContent != "")
    if (notEmpty && !gameOver) {
        gameOver = true;
        drawAudio.play();
        wrapper.style.backgroundColor = "rgb(83 86 83 / 90%)";
        overlay.style.display = "flex";
        result.innerHTML = "It's a draw!!"
    }
}
//function to reset the game
function resetGame() {
    resetAudio.play();
    boxes.forEach((box) => {
        box.textContent = '';
        box.disabled = false;
        box.style.textShadow = "";
        currentPlayer = 'o';
        gameOver = false;
        wrapper.style.backgroundColor = "#000000";
        overlay.style.display = "none";
        result.innerHTML = "";
    })
}
reset.addEventListener('click', resetGame);
newGame.addEventListener('click', resetGame)
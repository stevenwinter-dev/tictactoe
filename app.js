//Grab important elements
    //Grid, Cells, winning text container

const gameBoard = document.querySelector('#game-board')
const cells = document.querySelectorAll('#cell')
const winText = document.querySelector('#win-statement')
const playerNum = document.querySelector('#player-num')
const player = document.querySelector('#player')
const reset = document.querySelector('#reset')

//Current player
//Players array with name, x or o, and score
const players = [{
    player: '1',
    character: 'X',
    score: [0]
}, {
    player: '2',
    character: 'O',
    score: [0]
}]

let currentPlayer = players[0]

// player switch
function currentPlayerSwitcher() {
    if(currentPlayer.character === 'X') {
        playerNum.innerHTML = players[1].character
        return currentPlayer = players[1]
    } else {
        playerNum.innerHTML = players[0].character
        return currentPlayer = players[0]
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', selectCell)
})
//Click event listener for each square
    //if already clicked, no longer clickable
    //check win condition
function selectCell(e) {
    const selectedCell = e.target
    selectedCell.innerHTML = `${currentPlayer.character}`
    selectedCell.classList.add(`selected${currentPlayer.character}`)
    playerScore(e.target.dataset.value)
    currentPlayerSwitcher()
}

//Adding square to player score array
function playerScore(newPoints) {
    currentPlayer.score.push(parseInt(newPoints))
    youWin()
}

// const winningScores = [1,2,3]
const winningScores = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

//Check for win
function youWin() {
    winningScores.forEach(winCondition => {
        if(currentPlayer.score.sort().join().includes(winCondition)) {
            winText.innerHTML=`${currentPlayer.character} wins!`
            reset.remove()
            player.innerHTML = `
            <button id='play-again' class='reset'>Play Again!</button>
            `
            const playAgain = document.querySelector('#play-again')
            playAgain.addEventListener('click', resetGame)
        } 
    })
    draw()
} 
//Draw function. If players scores equal total number of points without a winner
function draw() {
    if(players[0].score.reduce((a,b) => a + b) + players[1].score.reduce((a,b) => a + b) === 45) {
        winText.innerHTML = 'Draw'
}}


//Reset button
reset.addEventListener('click', resetGame) 

function resetGame() {
    cells.forEach(cell => cell.innerHTML = '')
    players.forEach(player => player.score = [0])
    winText.innerHTML = ''
    currentPlayer = players[0]
    playerNum.innerText = players[0].character
    cells.forEach(cell => {
        cell.classList.remove('selectedX')
        cell.classList.remove('selectedO')
    })
}
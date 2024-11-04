const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]


function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')

        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        // square.classList.add('beige')
        const row = Math.floor(i / width)
        if(row % 2 === 0 ) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
            
        } else {
            
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
        }
        if (i <= 15) {
            square.firstChild.firstChild.classList.add("black")
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add("white")
        }
        gameBoard.append(square)
    })

}

createBoard()


const allSquares = document.querySelectorAll('#gameboard .square')

// console.log(all)

allSquares.forEach((square)=> {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId;
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
    // console.log(e.target)
}
function dragDrop(e) {
    // e.preventDefault()
    e.stopPropagation()
    console.log(e.target)
    const taken = e.target.classList.contains('piece')

    // console.log(e.target.parentNode.append(draggedElement))
    // e.target.parentNode.append(draggedElement)
    // e.target.remove()
    // e.target.append(draggedElement)
    changePlayer()
}

function changePlayer() {
    if (playerGo === 'black') {
        reverseId()
        playerGo = 'white'
        playerDisplay.textContent = 'white'
    } else {
        revertId()
        playerGo = 'black'
        
        playerDisplay.textContent = 'black'
        
    }
}


function reverseId () {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i)=> {
            square.setAttribute('square-id', (width * width - 1) - i)
            
        })
}
function revertId () {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i)=> {
            square.setAttribute('square-id', i)

        })
}
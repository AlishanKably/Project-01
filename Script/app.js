

// 01 - Create grid
const grid = document.querySelector('.grid')
const cells = []
const width = 20
const cellCount = width * width
let goingRight = true
let direction = 1
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const div = document.createElement('div')
    div.textContent = i
    cells.push(div)
    grid.appendChild(div)
  }
}
createGrid()

// 02 - Create player

let playerPosition = 390

function addPlayer() {
  cells[playerPosition].classList.add('player')
}
function removePlayer() {
  cells[playerPosition].classList.remove('player')
}
addPlayer()

function movePlayer(event) {
  const x = playerPosition % width
  removePlayer()
  if (event.key === 'd' && x < width - 1) {
    playerPosition++
  } else if (event.key === 'a' && x > 0) {
    playerPosition--
  }
  addPlayer()
}
document.addEventListener('keydown', movePlayer)

// 03 - Create Invaders

let invadersPosition = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 31, 32, 40, 41, 42, 43, 44, 45, 46,
  47, 48, 49, 50, 51, 52, 60, 61, 62, 63, 64, 65,
  66, 67, 68, 69, 70, 71, 72
]

function addInvaders() {
  for (let i = 0; i < invadersPosition.length; i++)
    cells[invadersPosition[i]].classList.add('invaders')
}
function removeInvaders() {
  for (let i = 0; i < invadersPosition.length; i++)
    cells[invadersPosition[i]].classList.remove('invaders')
}
addInvaders()

//  04 - Move invaders

function moveInvadersRight() {

  invadersPosition.forEach((invader, i) => {
    invadersPosition[i] += 1
  })
}
function moveInvadersLeft() {
  invadersPosition.forEach((invader, i) => {
    invadersPosition[i] -= 1
  })
}

function moveInvaders() {
  const leftEdge = invadersPosition[0] % width === 0
  const rightEdge = invadersPosition[invadersPosition.length - 1] % width === width - 1
  removeInvaders()
  if (rightEdge && goingRight) {
    for (let i = 0; i < invadersPosition.length; i++) {
      invadersPosition[i] += width
      goingRight = false
    }
  }
  else if (leftEdge && !goingRight) {
    for (let i = 0; i < invadersPosition.length; i++) {
      invadersPosition[i] += width
      goingRight = true
    }
  }
  else if (goingRight) {
    moveInvadersRight()
  }
  else if (!goingRight) {
    moveInvadersLeft()
  }
  addInvaders()
}
// setInterval(moveInvaders, 300)



//  05 - Shoot lasers

function attack(event) {
  let laserCurrentPosition = playerPosition
  function moveLaser() {
    if (event.key === 'h') {
      cells[laserCurrentPosition].classList.remove("lasers")
      laserCurrentPosition -= width
      cells[laserCurrentPosition].classList.add("lasers")
    }
    if (cells[laserCurrentPosition].classList.contains("invaders")) {
      cells[laserCurrentPosition].classList.remove("invaders")
      cells[laserCurrentPosition].classList.remove("lasers")
      clearTimeout(laserBeam)
    }
    const laserBeam = setTimeout(moveLaser, 100)
  }
  moveLaser()
}
document.addEventListener('keydown', attack)

// 06 - Remove Invaders

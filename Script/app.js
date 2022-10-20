// 01 - Create grid
const grid = document.querySelector('.grid')
const textDisplay = document.querySelector('.text')
const score = document.querySelector('.score')
const restart = document.querySelector('.restart')
const cells = []
const width = 20
const cellCount = width * width
let goingRight = true
let direction = 1
let scoreboard = 0
let isPlayerHit = false

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const div = document.createElement('div')
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
  if (event.key === 'd' && (x < width - 1) && !isPlayerHit) {
    playerPosition++
  } else if (event.key === 'a' && (x > 0) && !isPlayerHit) {
    playerPosition--
  }
  addPlayer()
}
document.addEventListener('keydown', movePlayer)

// 03 - Create Invaders

let invadersPosition = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 40, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 50, 51, 52, 60, 61, 62, 63, 64, 65,
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
  function checkLeftEdge() {
    return invadersPosition.some((invader) => {
      return invader % width === 0
    })
  }
  const leftEdge = checkLeftEdge()
  
  function checkRightEdge() {
    return invadersPosition.some((invader) => {
      return invader % width === width - 1
    })
  }
  
  const rightEdge = checkRightEdge()
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

  if (cells[playerPosition].classList.contains('invaders', 'player')) {
    textDisplay.textContent = 'GAME OVER'
    clearInterval(invadersInverval)
  }

  for (let i = 0; i < invadersPosition.length; i++) {
    if (invadersPosition[i] === (cells.length - width)) {
      textDisplay.textContent = 'GAME OVER'
      clearInterval(invadersInverval)
    }
  }
}
let invadersInverval = setInterval(moveInvaders, 300)

// Invaders attack

function invadersAttack(bombIndex) {
  let invaderBombIndex = bombIndex += width
  let invaderBomb = cells[invaderBombIndex]

  const bombInterval = setInterval(() => {
    if (invaderBomb) {
      invaderBomb.classList.remove('bomb')
    }
    if (invaderBombIndex >= cells.length) {
      clearInterval(bombInterval)
    }
    else if (invaderBomb) {
      invaderBombIndex += width
      invaderBomb = cells[invaderBombIndex]
      invaderBomb.classList.add('bomb')
    }
    if (invaderBomb.classList.contains('player')) {
      cells[invaderBombIndex].classList.remove('bomb', 'player')
      cells[invaderBombIndex].classList.add('contact')
      setTimeout(() => cells[invaderBombIndex].classList.remove('contact'), 500)
      textDisplay.textContent = 'GAME OVER'
      isPlayerHit = true
      clearInterval(invadersInverval)
      clearInterval(bombInterval)
      clearInterval(invaderLaserInterval)
    }
  }, 100)
}

function invaderLaser() {
  const bombIndex = invadersPosition[Math.floor(Math.random() * (invadersPosition.length - 1))]
  invadersAttack(bombIndex)
}
let invaderLaserInterval = setInterval(invaderLaser, 1000)


//  05 - Shoot lasers
function winner() {
  if (invadersPosition.length === 0) {
    textDisplay.textContent = 'YOU WIN'
  }
}

function attack(event) {
  let laserCurrentPosition = playerPosition

  if (event.key === "h" && !isPlayerHit) {
    const laserBeam = setInterval(() => {
      if (event.key === 'h') {
        cells[laserCurrentPosition].classList.remove("lasers")
        laserCurrentPosition -= width
        cells[laserCurrentPosition].classList.add("lasers")
      }

      if (cells[laserCurrentPosition].classList.contains('invaders')) {
        cells[laserCurrentPosition].classList.remove('lasers', 'invaders')
        cells[laserCurrentPosition].classList.add('contact')
        setTimeout(() => cells[laserCurrentPosition].classList.remove('contact'), 100)
        clearInterval(laserBeam)
        const newInvadersPosition = invadersPosition.indexOf(laserCurrentPosition)
        invadersPosition.splice(newInvadersPosition, 1)
        score.textContent = scoreboard++
        winner()
      }
    }, 100)
  }
}

document.addEventListener('keydown', attack)

// 06 - Restart game

function restartGame() {
  window.location.reload()
}
restart.addEventListener('click', restartGame)

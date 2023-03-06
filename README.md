# Project-01
## Space Invaders
### The Brief

For my first solo project, I decided to recreate the classic 80's arcade game, Space Invaders.

This project was carried out during week 06 of the course with the purpose of the project to demonstrate my understanding of the skills we have learnt up to this point over the course of 2 weeks.

### Technical Requirements

The goal of this project was to create an app that fulfilled the following criteria:

* Render a game in the browser
* Design logic for winning & visually display which player won
* Include sepearte HTML/CSS/JavaScript files
* Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
* Use JavaScript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)


### Overview

The main objective of this game is to control the player by moving left and right whilst shooting down the invaders as they navigate their way left, right and down each time they collide with the edge of the screen as a unit. In addition to this, the aliens must randomly drop bombs towards the player which must be dodged to avoid being destroyed.

### Deployment link

Click here to player the game : https://alishankably.github.io/Project-01/

### Technologies and methods

Technologies used to design this game included the following:

* HTML5
* CSS3
* JavaScript (ES6)
* Git and GitHub
* Google Fonts

## Planning

The first stage of this project was to plan which elements are required to reach a minimum viable product and decide on which methods would be used to achieve each of these elements. Furthermore, thought was required on how each of these elements were required to change on the screen. Excalidraw was used to sketch different ideas, pseudocode and organise thoughts.

## Methodology

### Step 01
The project utilised a grid based system, wrapped within a flex-box, by creating an array of cells with HTML divs being added through a 'for' loop with .push and .appendChild, and defining the cell count and width of grid as variables.

```
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const div = document.createElement('div')
    cells.push(div)
    grid.appendChild(div)
  }
}
createGrid()
```
### Step 02
The next step was to create a player that was able to move left and right and shoot, however limit the player to crossing boundaries. This was done through creating a class for the player and utilising this in multiple functions by adding and removing the class. Event listeners are used to link these functions to the keyboard.

```
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
```

### Step 03
Following this, the aliens were then created. Similar to the player, a class is created to define which cells contain the aliens which must be able to move in a particular pattern and randomly shoot back at the player. This is done with the use of the ```setInterval```. If the right-most alien in the array moves into the defined right wall, then the move variable for the alien will be re-assigned and will each move one space down and then continue to move left until the left-most alien encounters the defined left wall and the pattern continues until the lower-most alien hits the player on the bottom line where a Game Over sign pops up.

## Challenges

The first challenge encountered was moving the aliens in a certain pattern as a unit that each time they collide with an 'x' boundary, they are to move down a cell and then in the opposite 'x' direction. This was overcome by creating functions that checked if a cell containing the alien class was at the left or right edge followed by a series of "if" statements directing the aliens to the right path.

```
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
```

The second challenge was to make the aliens randomly drop bombs down the grid. This was done by using the ```setInterval()``` method and adding a ```setTimeout``` to specify the speed and to stop attacking once a collision of the bomb class and player class are on a common cell. This was randomly done by using the ```Math.random()``` method within the function for the length of cells containing the alien class.

```
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
```

The final consideration was how the collisions between the attacks and the player/aliens would behave. This would occur when two different classes would arrive at a common index.

Players laser collision with an invader
```
if (cells[laserCurrentPosition].classList.contains('invaders')) {
        cells[laserCurrentPosition].classList.remove('lasers', 'invaders')
        cells[laserCurrentPosition].classList.add('contact')
        setTimeout(() => cells[laserCurrentPosition].classList.remove('contact'), 100)
        clearInterval(laserBeam)
        const newInvadersPosition = invadersPosition.indexOf(laserCurrentPosition)
        invadersPosition.splice(newInvadersPosition, 1)
        score.textContent = scoreboard++
```

Invader bomb collision with the player
```
if (invaderBomb.classList.contains('player')) {
      cells[invaderBombIndex].classList.remove('bomb', 'player')
      cells[invaderBombIndex].classList.add('contact')
      setTimeout(() => cells[invaderBombIndex].classList.remove('contact'), 500)
      textDisplay.textContent = 'GAME OVER'
      isPlayerHit = true
      clearInterval(invadersInverval)
      clearInterval(bombInterval)
      clearInterval(invaderLaserInterval)
```
## Wins

Overall, I believe this project was a promising first step in my portfolio as it showcased my ability to use what I have learnt during my time in the course so far. I feel that the help of a solid Excalidraw plan allowed me to create a game that works well and looks professional.

## Future Features

* The addition of sounds to make the same feel more immersive.
* Create harder levels once each wave is complete by increasing invader speed and attack frequency.
* Experiment with canvas to create moving animations and backgrounds.

## Lessons Learnt
Understanding the logic of how JavaScript behaves and how elements react with eachother. In particular, this project allowed me to experiement working with state, functions and the DOM. Lastly, it allowed me to experiment with basic CSS to transform a page of simple looking blocks to a presentable game that can allow a user to be immersed.

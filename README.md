# Project-01
## Space Invaders
### The Brief

For my first solo project which utilised HTML, CSS, JavaScript and working with the DOM, I decided to re-create the classic 80's arcade game, Space Invaders.

This project was carried out during week 06 of the course with the purpose of the project to demonstrate my understanding of the skills we have learnt up to this point over the the course of a week.

### Overview

The main objective of this game is to control the player by moving left and right whilst shooting down the invaders as they navigate their way left, right and down each time they the edge of the screen as a unit. In addition to this, the aliens must randomly drop bombs towards the player which must be dodged to avoid being destroyed.

### Deployment link

Click here to player the game : https://alishankably.github.io/Project-01/

### Technologies used

The main methods used to form this game included the following:

* If statements
* 'for' loops
* setIntervals
* Functions
* Query selectors
* Event listeners
* Objects and Arrays

## Methodology

The first stage of this project was to plan which elements are required to reach a minimum viable product and decide on which methods would be used to achieve each of these elements. Furthermore, thought was required on how each of these elements were required to change on the screen. Excalidraw was used to sketch different ideas, pseudocode and organise thoughts.

The project utilised a grid based system, wrapped within a flex-box, by creating an array of cells with HTML divs being added through a 'for' loop with .push and .appendChild and defining the cell count and width of grid as variables.

The next step was to create a player that was able to move left and right and shoot, however limit the player to crossing boundaries. This was done through creating a class for the player and utilising this in multiple functions by adding and removing the class.

## insert code image

Event listeners are used to link these functions to the keyboard.

## insert code image

Following this, the aliens were then created. Similar to the player, a class is created to define which cells contain the aliens which must be abe to move and shoot back at the player.

The main challenges with achieving this were firstly, moving the aliens in a certain pattern and as a unit that each time they collide with an 'x' boundary, they are to move down a cell (## insert code) and then in the opposite 'x' direction. The second challenge was to make the aliens randomly drop bombs down the grid.

The first of these challenges were overcome by creating functions that checks if a cell containing the alien class as at the left or right edge followed by a series of "if" statements directing the aliens to the right path.

## Insert image

The second of these was done by using the setInterval() method and adding a setTimeout to specify the speed and to stop attacking once a collsion of the bomb class and player class are on a common cell. This was randomly done by using the Math.random() method within the function for the length of cells containing the alien class.

## insert image

The final consideration was the how the collisions between the attacks and the player/aliens would behave. This would occur when two different classes would arrive at a common index.

Players laser collision with an alien
## insert code image

Alien bomb collision with the player
## insert code image

Overall, I believe this project was a promising first step in my portfolio as it showcased my ability to use what I have learnt during my time in the course so far to create an app which can be interacted with. 

It allowed me to start understand the logic of how JavaScript behaves and how elements react with eachother. In particular, it allowed me to experiement working with state, functions and the DOM. Lastly, it allowed me to experiment with basic CSS to transform a page of simple looking blocks to a presentable game that can allow a user to get immersed.





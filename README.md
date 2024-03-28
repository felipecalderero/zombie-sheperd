## Zombie Shepherd

[Click here to see deployed game](https://felipecalderero.github.io/zombie-sheperd/)

## Description

Zombie Shepherd is an interactive web game where players guide a shepherd dog through a perilous landscape overrun with zombies. The goal is to avoid zombies, collect treats, and survive as long as possible. This project showcases the use of HTML, CSS, and JavaScript for game development, focusing on event handling, game physics, and responsive design for an engaging user experience.

## MVP (Minimum Viable Product)

- **Start/Restart Game Functionality:** Allow users to start a new game or restart it at any point.
- **Player Movement:** Players can move the shepherd using keyboard controls (arrows)
- **Zombie Spawning:** A zombie appear at random locations every time the dog eats a treat. The zombies are wadering around if the player (the dog) is not close. If the player is within a certain distance, they move towards the player.
- **Collectible Treats:** Random treats appear on the screen for the player to collect. There is always one and only one treat to collect.
- **Score Tracking:** Display the current score based on the number of zombies chasing you you have survived.
- **Life Count:** Players have a set number of lives (3) that decrease upon contact with zombies. The player image blinks for a few seconds when the player is bitten by a zombie. During the blinking time the player is inmune (no other zombies can bite him).
- **Sound** Sound functionality has been included. The player can enable and disable the sound at any time. Latest sound preferences are stored locally and, hence, are preserved. Besides, different sound effects (treats, dog getting bitten, game over with new record, game over without recor, zombies), the volume of the Zombies increases linearly with the number of zombies in the screen (the more zombies, the lower their noises).
- **Local Storage** Local storage functionalities have been added to remember the sound preferences of the user (on/off) and to record her best personal record, including the maximum number of zombies survived and the exact date and time when it was achieved. Local Storage may be cleaned at any time by pressing "Escape" key
- **Responsive Design** The Game has been designed to look good also on small screens. The visual elements are responsible and adapt to improve experience.
- **Surprise Feature** A surprise feature has been included. During the game, the user may play "Enter" to get a little suprise ;).

## Backlog

- **Power-Ups:** Introduce power-ups that grant temporary abilities or immunity.
- **Leaderboard:** Implement a global leaderboard to display high scores.
- **Mouse and touchscreen play mode** Introduce mouse clicks and finger touch as an alternative way to control the player (in addition to arrow keys) for users playing on mobile or directly with a mouse.

## Data structure

- **Game**

  Properties: `startScreen`, `gameContainer`, `gameScreen`, `gameEndScreen`, `player`, `zombies`, `treats`, `score`, `lives`, `gameIsOver`, `gameIntervalId`, `gameLoopFrecuency`, `zombieSound`, `gameOverSound`, `treatSound`, `playerBittenSound`, `taDaSound`

  Methods:`start()`, `gameLoop()`, `update()`, `endGame()`

- **Player**

  Properties: `directionX`, `directionY`, `speed`, `inmune`

  Methods: `move()`

- **Zombie**

  Properties: `direction`, `speed`, `changeDirection`, `biting`

  Methods: `move()`, `onScreen()`, `hasBitten(player)`, `distanceToPlayer(player)`

- **Treat**

  Properties: `none additional to those inherited from Component`

  Methods: `hasBeenEaten(player)`

- **Component**
  Properties: `gameScreen`, `left`, `top`, `width`, `height`, `element`

  Methods: `updatePosition()`

## States and State Transitions

- **Game Intro Screen**: The initial game screen where the player can start the game.
- **Game Screen**: The main game area where gameplay takes place.
- **Game Over Screen**: Screen displayed when the player runs out of lives, summarizing players performance and best personal record, and with options to restart.

## Task

- Setup project and file structure
- Implement game logic and main loop
- Create player movement and controls
- Design zombie behavior and spawning mechanism
- Implement treat collection and scoring
- Design game UI and screens (splash, game, game over)
- Testing and debugging
- Deployment

## Links

- [Trello Link](https://trello.com/b/GZ4doOIE/my-first-kanban-board)
- [Slides Link](https://docs.google.com/presentation/d/1JxP_8lWYuJaK_KpdvtxYDuK1iPcDlqOhePxD4smvFC8/edit?usp=sharing)
- [Github repository Link](https://github.com/felipecalderero/zombie-sheperd)
- [Deployment Link](https://felipecalderero.github.io/zombie-sheperd/)

class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/beagle.gif"
    );
    this.height = 600;
    this.width = 1000;
    this.zombies = [];
    this.treats = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrecuency = Math.round(1000 / 60); // 60fps
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";

    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);
  }

  gameLoop() {
    console.log("in the game loop");

    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();

    //this.checkCollision(this.zombies, 0);
    //this.checkCollision(this.zombies, 50);
    //this.checkCollision(this.treats, 50);

    // Check for collision and if an zombie is still on the screen
    for (let i = 0; i < this.zombies.length; i++) {
      const zombie = this.zombies[i];
      zombie.move();

      // If the player's car collides with an zombie
      if (this.player.didCollide(zombie)) {
        // Remove the zombie element from the DOM
        zombie.element.remove();
        // Remove zombie object from the array
        this.zombies.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        document.getElementById("lives").innerText = this.lives;
        // Update the counter variable to account for the removed zombie
        i--;
      } // If the zombie is off the screen (at the bottom)
      else if (zombie.top > this.height) {
        // Increase the score by 1
        this.score += 10;
        document.getElementById("score").innerText = this.score;
        // Remove the zombie from the DOM
        zombie.element.remove();
        // Remove zombie object from the array
        this.zombies.splice(i, 1);
        // Update the counter variable to account for the removed zombie
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new zombie based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0.98 && this.zombies.length < 5) {
      this.zombies.push(new Zombie(this.gameScreen));
    }

    // Create a new treat based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0.98 && this.treats.length < 2) {
      this.treats.push(new Treat(this.gameScreen));
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.zombies.forEach((zombie) => zombie.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
  v;
}

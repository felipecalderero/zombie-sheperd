class Game {
  // code to be added
  constructor() {
    // Access to DOM elements: Intro, Game and GameOver screens
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    // Initialize Game Screen
    this.height = 600;
    this.width = 1000;

    // Initialize a new player
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/beagle.gif"
    );

    // Initialize array of Zombies
    this.zombies = [];
    // Intialize array of Treats
    this.treats = [];
    // Initialize score
    this.score = 0;
    // Initialize lives
    this.lives = 3;
    // Game is not over
    this.gameIsOver = false;
    // Interval Loop ID and Frame Rate
    this.gameIntervalId;
    this.gameLoopFrecuency = Math.round(1000 / 60); // 60fps
  }

  start() {
    // Set height and width
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    // Set Intro Screen not visible and display Game Screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    // Launch Interval Loop for the Game
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);
  }

  // Callback function for the Interval Loop
  gameLoop() {
    console.log("in the game loop");

    // Function updating the Game
    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    // Update Player position if moving
    this.player.move();
    console.log("moving player");

    // Move Zombies
    const bittenDist = Math.round(
      Math.sqrt(this.player.height ** 2 + this.player.width ** 2)
    );
    console.log(bittenDist);
    const followDist = 400;
    if (this.zombies.length > 0) {
      for (let i = 0; i < this.zombies.length; i++) {
        let zombie = this.zombies[i];
        zombie.move();
        let distance = zombie.distanceToPlayer(this.player);
        console.log(
          this.player.top,
          this.player.height,
          this.player.width,
          this.player.left,
          distance,
          bittenDist
        );
        // Player got bitten!
        if (distance < bittenDist) {
          // Remove the zombie element from the DOM
          zombie.element.remove();
          // Remove zombie object from the array
          this.zombies.splice(i, 1);
          i--;
          // Reduce player's lives by 1
          this.lives--;
          document.getElementById("lives").innerText = this.lives;
          // Update the counter variable to account for the removed zombie
        } else if (distance < followDist) {
          // Player will be follow by Zombie!
        }
      }
    }

    // Remove Zombies that go out of the Screen
    this.zombies.forEach((zombie, index) => {
      if (!zombie.onScreen()) {
        // Remove the zombie from the DOM
        zombie.element.remove();
        // Remove zombie object from the array
        this.zombies.splice(index, 1);
        // Update the counter variable to account for the removed zombie
      }
    });

    // Have any of the Zombies bitten the Player?
    // That is, a Zombie has had a collision with the player

    // Create a new zombie based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0.5 && this.zombies.length < 550) {
      this.zombies.push(new Zombie(this.gameScreen, this.height, this.width));
      console.log("Adding a new Zombie");
    }

    // Check distance from the player to all the zombies.
    // If the distance from the player to a zombie is small than Zombie_Radius,
    // the zombie is attracted to the player and starts moving towards him indefinitively

    // Remove zombies that went out of the screen

    /*
    console.log(this.zombies);
    // Check for collision and if a zombie is still on the screen
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
      console.log("Run out of lives! Ending Game");
      //this.endGame();
    }

    // Create a new zombie based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0.5 && this.zombies.length < 150) {
      this.zombies.push(new Zombie(this.gameScreen, this.height, this.width));
      console.log("Adding a new Zombie");
    }

    // Create a new treat based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0.98 && this.treats.length < 2) {
      this.treats.push(new Treat(this.gameScreen));
      console.log("Adding a new Treat");
    }

    */
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

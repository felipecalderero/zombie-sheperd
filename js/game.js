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
      400,
      200,
      70,
      70,
      "./images/ojos-vueltos.png"
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

    // Define distance for a zombie to start following the player
    const followDist = 200;
    // Check if zombies have bitten or are following the player
    if (this.zombies.length > 0) {
      for (let i = 0; i < this.zombies.length; i++) {
        let zombie = this.zombies[i];
        zombie.move();

        // Compute distance form the zombie to the player
        let distance = zombie.distanceToPlayer(this.player);

        // Player got bitten?
        if (zombie.hasBitten(this.player)) {
          // Remove the zombie element from the DOM
          zombie.element.remove();
          // Remove zombie object from the array
          this.zombies.splice(i, 1);
          // Update the counter variable to account for the removed zombie
          i--;
          // Reduce player's lives by 1
          this.lives--;
          document.getElementById("lives").innerText = this.lives;
        } else if (distance < followDist) {
          // Player is close to the zombie and it starts following her
          // Update zombie direction to move towards player
          const directionTop = this.player.top - zombie.top;
          const directionLeft = this.player.left - zombie.left;
          const module = Math.sqrt(directionTop ** 2 + directionLeft ** 2);

          zombie.direction[0] = directionLeft / module;
          zombie.direction[1] = directionTop / module;
        }
      }
    }

    // There has always to be one treat on screen
    // Check if player has eaten the treat
    const numTreats = 1;

    if (this.treats.length > 0) {
      for (let i = 0; i < this.treats.length; i++) {
        let treat = this.treats[i];
        if (treat.hasBeenEaten(this.player)) {
          this.score += 1;
          // Remove the treat element from the DOM
          treat.element.remove();
          // Remove zombie object from the array
          this.treats.splice(i, 1);
          // Update the counter variable to account for the removed zombie
          i--;
          document.getElementById("score").innerText = this.score;
        }
      }
    }

    if (this.treats.length < numTreats) {
      this.treats.push(new Treat(this.gameScreen, this.height, this.width));
      console.log("Adding a new Treat");
    }

    // Create a new zombie based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0 && this.zombies.length < this.score + 1) {
      this.zombies.push(new Zombie(this.gameScreen, this.height, this.width));
      console.log("Adding a new Zombie");
    }

    //

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

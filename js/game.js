class Game {
  // code to be added
  constructor() {
    // Access to DOM elements: Intro, Game and GameOver screens
    this.startScreen = document.getElementById("game-intro");
    this.gameContainer = document.getElementById("game-container");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    // Initialize Game Screen
    //this.height = 600;
    //this.width = 1000;

    // Initialize a new player
    this.player = new Player(
      this.gameScreen,
      window.innerWidth / 2,
      window.innerHeight / 2,
      100,
      100,
      "./images/dog.png"
    );

    // Initialize array of Zombies
    this.zombies = [];
    // Intialize array of Treats
    this.treats = [];
    // Initialize score
    this.score = 1;
    document.getElementById("score").innerText = this.score;
    // Initialize lives
    this.lives = 2;
    // Game is not over
    this.gameIsOver = false;
    // Interval Loop ID and Frame Rate
    this.gameIntervalId;
    this.gameLoopFrecuency = Math.round(1000 / 60); // 60fps

    this.zombieSound = new Audio("./sounds/zombies.wav"); // buffers automatically when created
    this.zombieSound.playbackRate = 0.5;
    this.gameOverSound = new Audio("./sounds/fail-trombone-03.wav");
    this.treatSound = new Audio("./sounds/button-3.wav");
    this.playerBittenSound = new Audio(
      "./sounds/dog-crying-for-a-hugwav-14912.mp3"
    );
    this.taDaSound = new Audio("./sounds/ta-da_yrvBrlS.mp3");
  }

  start() {
    // Set height and width
    //this.gameScreen.style.height = `${this.height}px`;
    //this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `100vh`;
    this.gameScreen.style.width = `100vw`;
    // Set Intro Screen not visible and display Game Screen
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.gameScreen.style.display = "block";
    // Launch Interval Loop for the Game
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrecuency);
  }

  // Callback function for the Interval Loop
  gameLoop() {
    console.log("in the game loop");

    if (window.muteAll === false) {
      this.zombieSound.play();
    } else {
      this.zombieSound.pause();
    }

    // Function updating the Game
    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    //if (this.gameIsOver) {
    //  clearInterval(this.gameIntervalId);
    //}
  }

  update() {
    // Update Player position if moving
    this.player.move();
    //console.log("moving player");

    // Define distance for a zombie to start following the player
    const followDist = 400;
    // Check if zombies have bitten or are following the player
    if (this.zombies.length > 0) {
      for (let i = 0; i < this.zombies.length; i++) {
        let zombie = this.zombies[i];
        zombie.move();

        if (this.gameIsOver === false) {
          // Compute distance form the zombie to the player
          let distance = zombie.distanceToPlayer(this.player);

          // Player got bitten?
          if (this.player.inmune === false && zombie.hasBitten(this.player)) {
            console.log("Player has been bitten by zombie");
            if (window.muteAll === false) {
              this.playerBittenSound.play();
            }
            setTimeout(() => this.playerBittenSound.pause(), 1000);
            //Once bitten, protect the player for some time
            this.player.inmune = true;
            //this.player.element.src = "./images/beagle.gif";

            const blinkingInt = setInterval(() => {
              console.log("Blinking");
              if (this.player.element.style.display === "none") {
                this.player.element.style.display = "block";
              } else {
                this.player.element.style.display = "none";
              }
            }, 100);

            setTimeout(() => {
              clearInterval(blinkingInt);
              //this.player.element.src = "./images/dog.png";
              this.player.element.visibility = "visible";
              this.player.inmune = false;
            }, 2000);

            // Remove the zombie element from the DOM
            //zombie.element.remove();
            // Remove zombie object from the array
            //this.zombies.splice(i, 1);
            // Update the counter variable to account for the removed zombie
            //i--;
            // Reduce player's lives by 1
            if (this.lives > 0) {
              this.lives--;
            }
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
    }

    // There has always to be one treat on screen
    // Check if player has eaten the treat
    const numTreats = 1;

    if (this.treats.length > 0) {
      for (let i = 0; i < this.treats.length; i++) {
        let treat = this.treats[i];
        if (treat.hasBeenEaten(this.player)) {
          if (window.muteAll === false) {
            this.treatSound.play();
          }
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
      this.treats.push(new Treat(this.gameScreen));
      console.log("Adding a new Treat");
    }

    // Create a new zombie based on a random probability
    // when there is no other zombies on the screen
    if (Math.random() > 0 && this.zombies.length < this.score) {
      this.zombies.push(new Zombie(this.gameScreen));
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
*/

    // If the lives are 0, end the game
    if (this.lives <= 0 && !this.gameIsOver) {
      this.lives = 0;
      console.log("Run out of lives! Ending Game");
      this.endGame();
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    if (!this.gameIsOver) {
      setTimeout(() => {
        this.player.element.remove();
        this.player.inmune = true;

        this.gameIsOver = true;

        // Hide game screen
        //this.gameScreen.style.display = "none";
        this.gameScreen.style.zIndex = -1;
        // Show end game screen
        this.gameEndScreen.style.display = "block";
        const scoreArea = document.getElementById("your-score");
        if (this.score === 1) {
          scoreArea.innerText = `${this.score} zombie!`;
        } else {
          scoreArea.innerText = `${this.score} zombies!`;
        }

        // Storing your best game
        // localStorage.clear();
        let bestScore = localStorage.getItem("bestGameScore");
        console.log(bestScore);
        if (bestScore === null || bestScore < this.score) {
          if (window.muteAll === false) {
            this.taDaSound.play();
          }
          bestScore = this.score;
          const currentDate = new Date();
          localStorage.setItem("bestGameScore", this.score);
          localStorage.setItem("bestGameDate", currentDate);

          const newH3 = document.createElement("h3");
          newH3.innerText = `Congratulations!`;
          const newP = document.createElement("p");
          newP.innerText = `New personal record on 
          ${currentDate.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}, at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
          scoreArea.appendChild(newH3);
          scoreArea.appendChild(newP);
        } else {
          if (window.muteAll === false) {
            this.gameOverSound.play();
          }
          const bestGameDate = new Date(localStorage.getItem("bestGameDate"));
          console.log(bestGameDate);
          const newH3 = document.createElement("h3");
          newH3.innerText = `Your best score is ${bestScore} zombies!`;
          const newP = document.createElement("p");
          newP.innerText = `Achieved on 
          ${bestGameDate.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}, at ${bestGameDate.getHours()}:${bestGameDate.getMinutes()}`;
          scoreArea.appendChild(newH3);
          scoreArea.appendChild(newP);
        }
      }, 1000);
    }
    //clearInterval(this.gameIntervalId);
  }
}

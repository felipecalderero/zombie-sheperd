window.onload = function () {
  // Get buttons on DOM
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  const buttonSound = new Audio("./sounds/button-16.wav"); // buffers automatically when created
  const barkingSound = new Audio(
    "./sounds/ANMLDog_Barking dog 2 (ID 2954)_BSB.wav"
  ); // buffers automatically when created
  barkingSound.play();
  setTimeout(() => barkingSound.pause(), 1000);

  // Add listener to Start Button
  startButton.addEventListener("click", function () {
    buttonSound.play();
    startGame();
  });

  // Callback function after clicking the Start Button
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  // Callback function that handles key-down event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    // Check if the pressed key is in the possible Keystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

  // Callback function that handles key-up event
  function handleKeyup(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    // Check if the pressed key is in the possible Keystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
          game.player.directionY = 0;
          break;
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case "ArrowDown":
          game.player.directionY = 0;
          break;
      }
    }
  }

  // Add the handle Keydown & Keyup function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  // Add an event listener to the Restart Button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    buttonSound.play();
    location.reload();
  }
};

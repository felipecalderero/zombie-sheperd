// js/obstacle.js

class Zombie extends Component {
  constructor(gameScreen, screenHeight, screenWidth) {
    const height = 75;
    const width = 75;
    // Random posision of the screen at which the zombie is born
    const randomTop = Math.floor(Math.random() * screenHeight - height / 2);
    const randomLeft = Math.floor(Math.random() * screenWidth - width / 2);

    super(
      gameScreen,
      randomLeft,
      randomTop,
      height,
      width,
      "./images/zombi_hand.png"
    );

    // Zombie knows the size of the screen
    this.screenHeight = screenHeight;
    this.screenWidth = screenWidth;
    // Zombie direction of movement
    this.direction = [0, 0];
    this.speed = 2;
    // Rate of direction change of a zombie (ex. 4 -> 25% of times)
    this.changeDirection = 10;
    // Variable to know when the zombie is biting (dangerous) and when is not
    this.biting = false;

    // Zombies come up from the ground... they need some time to go up
    setTimeout(() => {
      this.element.src = "./images/zombi.png";
      this.element.style.width = `100px`;
      this.element.style.height = `150px`;
      this.biting = true;
    }, 2000);
  }

  // Updates zombie position, chaging its direction with a certain probability
  move() {
    // The zombie only moves after being born and ready to bite
    if (this.biting) {
      // Zombies randomly change direction every know and then
      if (Math.round(Math.random() * this.changeDirection) === 0) {
        // Change direction randomly
        this.direction = [
          0.8 * this.direction[0] + 0.2 * (Math.random() - 0.5) * 2,
          0.8 * this.direction[1] + 0.2 * (Math.random() - 0.5) * 2,
        ];
      }
      this.left += this.direction[0] * this.speed;
      this.top += this.direction[1] * this.speed;
    }

    // Update the obstacle's position on the screen
    this.updatePosition();
  }

  // Returns true if the Zombie is visible in the screen,
  // and false if it went out of the screen
  onScreen() {
    if (
      this.top < this.screenHeight + this.height / 2 &&
      this.top > 0 - this.height * 2 &&
      this.left > 0 - this.width &&
      this.left < this.screenWidth
    ) {
      return true;
    } else {
      return false;
    }
  }

  distanceToPlayer(player) {
    const zombieX = this.top + this.height / 2;
    const zombieY = this.left + this.width / 2;
    const playerX = player.top + player.height / 2;
    const playerY = player.left + player.width / 2;

    console.log(zombieX, zombieY, playerX, playerY);
    return Math.round(
      Math.sqrt((zombieX - playerX) ** 2 + (zombieY - playerY) ** 2)
    );
  }
}

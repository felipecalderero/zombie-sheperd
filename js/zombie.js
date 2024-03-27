// js/obstacle.js

class Zombie extends Component {
  constructor(gameScreen) {
    // Size in pixels of the zombie
    const height = 75;
    const width = 75;
    // Get current size of the window
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Random posision of the screen at which the zombie is born
    const offset = 100;
    const randomTop = Math.floor(
      Math.random() * (h - offset) + offset / 2 - height / 2
    );
    const randomLeft = Math.floor(
      Math.random() * (w - offset) + offset / 2 - width / 2
    );

    super(
      gameScreen,
      randomLeft,
      randomTop,
      height,
      width,
      "./images/zombi_hand.png"
    );

    // Zombie knows the size of the screen
    //this.screenHeight = window.innerWidth;
    //this.screenWidth = window.innerHeight;
    // Zombie direction of movement
    this.direction = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
    this.speed = 0.2;
    // Rate of direction change of a zombie (ex. 4 -> 25% of times)
    this.changeDirection = 10;
    // Variable to know when the zombie is biting (dangerous) and when is not
    this.biting = false;

    // Zombies come up from the ground... they need some time to go up
    setTimeout(() => {
      //const ini_width = this.width;
      const ini_height = this.height;
      this.width = 150;
      this.height = 150;
      // The bottom of the initial image and the adult zombie are at the same position
      this.top = this.top + ini_height - this.height;
      this.element.style.top = `${this.top}px`;
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.src = "./images/zombi.png";
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
          0.5 * this.direction[0] + 0.5 * (Math.random() - 0.5) * 3,
          0.5 * this.direction[1] + 0.5 * (Math.random() - 0.5) * 3,
        ];
        this.direction[0] =
          this.direction[0] /
          Math.sqrt(this.direction[0] ** 2 + this.direction[1] ** 2);
        this.direction[1] =
          this.direction[1] /
          Math.sqrt(this.direction[0] ** 2 + this.direction[1] ** 2);
      }
      this.left = this.left + this.direction[0] * this.speed;
      this.top = this.top + this.direction[1] * this.speed;
    }

    // Ensure the zombie stays within the game screen
    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > window.innerWidth - this.width - 10) {
      this.left = window.innerWidth - this.width - 10;
    }
    if (this.top > window.innerHeight - this.height - 10) {
      this.top = window.innerHeight - this.height - 10;
    }

    // Update the zombie's position on the screen
    this.updatePosition();
  }

  // Returns true if the Zombie is visible in the screen,
  // and false if it went out of the screen
  onScreen() {
    const w = window.innerWidth;
    const h = window.innerWidth;

    if (
      this.top < h + this.height / 2 &&
      this.top > 0 - this.height * 2 &&
      this.left > 0 - this.width &&
      this.left < w
    ) {
      return true;
    } else {
      return false;
    }
  }

  hasBitten(player) {
    // Zombie rectangle is intersecting with player rectange
    const verticalOffset = 30;
    const horizontalOffset = 60;

    if (
      this.biting &&
      this.top + this.height > player.top + verticalOffset &&
      this.top < player.top + player.height - verticalOffset &&
      this.left + this.width > player.left + horizontalOffset &&
      this.left < player.left + player.width - horizontalOffset
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

    return Math.round(
      Math.sqrt((zombieX - playerX) ** 2 + (zombieY - playerY) ** 2)
    );
  }
}

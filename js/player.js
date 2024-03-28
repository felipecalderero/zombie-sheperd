// js/player.js

class Player extends Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, left, top, width, height, imgSrc);

    this.directionX = 0;
    this.directionY = 0;
    this.speed = 5;

    //Once bitten, protect the player for some time
    this.inmune = true;
    setTimeout(() => (this.inmune = false), 1000);
  }

  move() {
    // Update player position based on directionX and directionY
    this.left += this.directionX * this.speed;
    this.top += this.directionY * this.speed;

    // Ensure the player's car stays within the game screen
    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    // Update the player's car position on the screen
    this.updatePosition();
  }
}

// js/obstacle.js

class Zombie extends Component {
  constructor(gameScreen) {
    const randomLeft = Math.floor(Math.random() * 500 + 70);
    const randomTop = Math.floor(Math.random() * 500 + 70);
    super(gameScreen, randomLeft, randomTop, 75, 75, "./images/zombi_hand.png");
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
}

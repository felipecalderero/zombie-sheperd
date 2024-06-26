class Treat extends Component {
  constructor(gameScreen) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Size in pixels of the zombie
    const height = 50;
    const width = 50;
    // Random posision of the screen at which the zombie is born
    const offset = 100;
    const randomTop = Math.floor(
      Math.random() * (h - offset) + offset / 2 - height / 2
    );
    const randomLeft = Math.floor(
      Math.random() * (w - offset) + offset / 2 - width / 2
    );

    const treatNum = 5;
    let treatName = "./images/treat";
    treatName = treatName + Math.floor(Math.random() * treatNum) + ".png";

    super(gameScreen, randomLeft, randomTop, width, height, treatName);
  }

  hasBeenEaten(player) {
    // Treat rectangle is intersecting with player rectange

    if (
      this.top + this.height > player.top &&
      this.top < player.top + player.height &&
      this.left + this.width > player.left &&
      this.left < player.left + player.width
    ) {
      return true;
    } else {
      return false;
    }
  }
}

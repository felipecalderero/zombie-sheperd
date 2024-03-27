class Treat extends Component {
  constructor(gameScreen) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const randomLeft = Math.floor(Math.random() * (w - 40) + 20);
    const randomTop = Math.floor(Math.random() * (h - 40) + 20);

    super(gameScreen, randomLeft, randomTop, 40, 40, "./images/hueso1.png");
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

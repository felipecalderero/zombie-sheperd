class Treat extends Component {
  constructor(gameScreen) {
    const randomLeft = Math.floor(Math.random() * 500 + 70);
    const randomTop = Math.floor(Math.random() * 500 + 70);

    super(gameScreen, randomLeft, randomTop, 40, 40, "./images/hueso1.png");
  }

  /*
  eaten() {
    // Zombies come up from the ground... they need some time to go up
    setTimeout(() => {
      this.element.src = "./images/hueso.gif";
      this.element.style.width = `100px`;
      this.element.style.height = `150px`;
    }, 2000);
  }
*/

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

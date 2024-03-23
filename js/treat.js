class Treat extends Component {
  constructor(gameScreen) {
    const randomLeft = Math.floor(Math.random() * 500 + 70);
    const randomTop = Math.floor(Math.random() * 500 + 70);
    super(gameScreen, randomLeft, randomTop, 75, 75, "./images/hueso.gif");
  }

  eaten() {
    // Zombies come up from the ground... they need some time to go up
    setTimeout(() => {
      this.element.src = "./images/hueso.gif";
      this.element.style.width = `100px`;
      this.element.style.height = `150px`;
    }, 2000);
  }
}

// js/component.js

class Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.element.style.zIndex = this.top - this.height;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${Math.round(this.left)}px`;
    this.element.style.top = `${Math.round(this.top)}px`;
    this.element.style.zIndex = Math.round(this.top + this.height);
  }
}

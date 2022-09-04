class Canvas {
  static readonly CANVAS_WIDTH = 1000;
  static readonly CANVAS_HEIGHT = 500;

  constructor() {
  }

  readonly canvasElement = document.createElement('canvas');

  makeCanvas() {
    this.canvasElement.width = Canvas.CANVAS_WIDTH;
    this.canvasElement.height = Canvas.CANVAS_HEIGHT;
    this.canvasElement.style.border = '1px solid black';

    return this.canvasElement;
  }

  provideContext() {
    return this.canvasElement.getContext("2d");
  }
}

export default Canvas;

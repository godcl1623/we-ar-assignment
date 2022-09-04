class Canvas {
  static readonly CANVAS_WIDTH = '1000px';
  static readonly CANVAS_HEIGHT = '500px';

  constructor() {
  }

  readonly canvasElement = document.createElement('canvas');

  makeCanvas() {
    this.canvasElement.style.width = Canvas.CANVAS_WIDTH;
    this.canvasElement.style.height = Canvas.CANVAS_HEIGHT;
    this.canvasElement.style.border = '1px solid black';

    return this.canvasElement;
  }

  provideContext() {
    return this.canvasElement.getContext("2d");
  }
}

export default Canvas;

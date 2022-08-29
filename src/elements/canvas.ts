class Canvas {
  static CANVAS_WIDTH = '1000px';
  static CANVAS_HEIGHT = '500px';

  constructor() {
  }

  canvasElement = document.createElement('canvas');

  makeCanvas = (): HTMLCanvasElement => {
    this.canvasElement.style.width = Canvas.CANVAS_WIDTH;
    this.canvasElement.style.height = Canvas.CANVAS_HEIGHT;

    return this.canvasElement;
  }
}

export default Canvas;

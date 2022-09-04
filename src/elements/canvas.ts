class Canvas {
  private static readonly CANVAS_WIDTH = 1000;
  private static readonly CANVAS_HEIGHT = 500;

  private canvasElement: HTMLCanvasElement;

  constructor() {
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.width = Canvas.CANVAS_WIDTH;
    this.canvasElement.height = Canvas.CANVAS_HEIGHT;
    this.canvasElement.style.border = '1px solid black';
  }

  makeCanvas() {
    return this.canvasElement;
  }

  provideContext() {
    return this.canvasElement.getContext('2d');
  }
}

export default Canvas;

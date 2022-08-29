import Canvas from './elements/canvas';

const main = document.querySelector('#root');
const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
main?.appendChild(canvas);

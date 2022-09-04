import Canvas from './elements/canvas';
import Ball from './elements/ball';
import './style/index.css';

const main = document.querySelector('#root');
const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
const canvasContext = canvas.getContext('2d');
const ball = new Ball({
  context: canvasContext,
  xCoordinates: 0,
  yCoordinates: 0,
  radius: 10,
  speed: 1,
});
const render = () => {
  main?.appendChild(canvas);
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  // requestAnimationFrame(render);
}

render();

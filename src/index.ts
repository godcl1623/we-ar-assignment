import Canvas from './elements/canvas';
import Ball from './elements/ball';
import Random from './logic/random';
import './style/index.css';

const main = document.querySelector('#root');
const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
const canvasContext = canvas.getContext('2d');
const random = new Random();
const numberOfBalls = random.getNumberBetween(10, 20);
const render = () => {
  main?.appendChild(canvas);
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numberOfBalls; i++) {
    const { radius, xCoordinates, yCoordinates, speed } = random.getBallData();
    const ball = new Ball({
      context: canvasContext,
      xCoordinates,
      yCoordinates,
      radius,
      speed,
    });
    ball.draw();
  }
  // requestAnimationFrame(render);
}

render();

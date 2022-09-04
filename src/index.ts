import Canvas from 'elements/canvas';
import Ball from 'elements/ball';
import Random from 'logic/random';
import { BallAttributes } from 'types/global';
import { generateBallData } from 'utils/functions';
import 'style/index.css';

const main = document.querySelector('#root');

const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
const canvasContext = canvasInstance.provideContext();
main?.appendChild(canvas);
const random = new Random();
const numberOfBalls = random.getNumberBetween(10, 20);
const ballsArray = generateBallData(canvasContext, random, numberOfBalls).map((ballData: BallAttributes) => {
  return new Ball(ballData);
});
let lastTime = performance.now();

const render = (timestamp = lastTime) => {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  ballsArray.forEach((ball: Ball, index: number, selfArray: Ball[]) => {
    ball.draw();
    ball.animate(selfArray, index, deltaTime / 1000);
  });
  // requestAnimationFrame(render);
};

render();

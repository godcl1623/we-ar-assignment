import Canvas from 'elements/canvas';
import Ball from 'elements/ball';
import Random from 'logic/random';
import { BallAttributes } from 'types/global';
import { generateBallData } from 'utils';
import 'style/index.css';

const main = document.querySelector('#root');
const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
const canvasContext = canvas.getContext('2d');
const random = new Random();
const numberOfBalls = random.getNumberBetween(10, 20);
const ballsArray = generateBallData(canvasContext, random, numberOfBalls).map((ballData: BallAttributes) => {
  return new Ball(ballData);
});

const animateFrame = (animateTarget: (() => void)) => {

}

const startAnimating = (animateTarget: (() => void), fps: number) => {
  const fpsInterval = 1000/fps;
  const startTime = window.performance.now();
}

const render = () => {
  main?.appendChild(canvas);
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  ballsArray.forEach((ball: Ball, index: number, selfArray: Ball[]) => {
    ball.draw();
    ball.animate(selfArray, index);
  });
  // requestAnimationFrame(render);
  // setTimeout(() => {
  //   requestAnimationFrame(render);
  // }, 1000 / 60);
};

render();

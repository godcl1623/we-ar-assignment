import Canvas from './elements/canvas';
import Ball from './elements/ball';
import Random from './logic/random';
import './style/index.css';

interface BallAttributes {
  context: CanvasRenderingContext2D | null;
  xCoordinates: number;
  yCoordinates: number;
  radius: number;
  speed: number;
}

const main = document.querySelector('#root');
const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
const canvasContext = canvas.getContext('2d');
const random = new Random();
const numberOfBalls = random.getNumberBetween(10, 20);
const ballsArray = Array.from({ length: numberOfBalls }, () => {
  const { radius, xCoordinates, yCoordinates, speed } = random.getBallData();
  const ball = new Ball({
    context: canvasContext,
    xCoordinates,
    yCoordinates,
    radius,
    speed,
  });
  return ball;
});
const getCentersDistance = (ballA: Ball, ballB: Ball) => {
  const { x: xCoordinatesA, y: yCoordinatesA } = ballA.getCoordinates();
  const { x: xCoordinatesB, y: yCoordinatesB } = ballB.getCoordinates();
  const distanceX = Math.pow(xCoordinatesA - xCoordinatesB, 2);
  const distanceY = Math.pow(yCoordinatesA - yCoordinatesB, 2);
  const centersDistance = Math.sqrt(distanceX + distanceY);
  return centersDistance;
};
const checkOverlaysExist = (arrayToCheck: Ball[], externalIndex: number, ball: Ball) => {
  const overlays: Ball[] = [];
  let result = false;
  arrayToCheck.forEach((otherBall: Ball, otherIndex: number) => {
    if (externalIndex !== otherIndex) {
      const centerDistance = getCentersDistance(ball, otherBall);
      const ballARadius = ball.getRadius();
      const ballBRadius = otherBall.getRadius();
      if (centerDistance < ballARadius + ballBRadius) {
        overlays.push(otherBall);
        otherBall.setColor('red');
      }
    }
  });
  if (overlays.length === 0) result = true;
  return { result, overlays };
};

const render = () => {
  main?.appendChild(canvas);
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  const overlayedBalls: Ball[] = [];
  ballsArray.forEach((ball: Ball, index: number, selfArray: Ball[]) => {
    // ball.draw();
    const { result, overlays } = checkOverlaysExist(selfArray, index, ball);
    overlayedBalls.concat(overlays);
    console.log(overlayedBalls);
    if (result) {
      ball.draw();
    } else {
      // while (overlayedBalls.length > 0) {
      //   
      // }
    }
  });
  // requestAnimationFrame(render);
};

render();

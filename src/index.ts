import Canvas from 'elements/canvas';
import Ball from 'elements/ball';
import Random from 'logic/random';
import { BallAttributes } from 'types/global';
import 'style/index.css';

const main = document.querySelector('#root');
const canvasInstance = new Canvas();
const canvas = canvasInstance.makeCanvas();
const canvasContext = canvas.getContext('2d');
const random = new Random();
const numberOfBalls = random.getNumberBetween(10, 20);
const getCentersDistance = (ballAData: BallAttributes, ballBData: BallAttributes) => {
  const { xCoordinates: xA, yCoordinates: yA } = ballAData;
  const { xCoordinates: xB, yCoordinates: yB } = ballBData;
  const distanceX = Math.pow(xA - xB, 2);
  const distanceY = Math.pow(yA - yB, 2);
  const centersDistance = Math.sqrt(distanceX + distanceY);
  return centersDistance;
};
const checkOverlaysExist = (arrayToCheck: BallAttributes[], newBallData: BallAttributes) => {
  const newBallRadius = newBallData.radius;
  return arrayToCheck.some((currentData: BallAttributes) => {
    const centerDistance = getCentersDistance(currentData, newBallData);
    const currentRadius = currentData.radius;
    return centerDistance < currentRadius + newBallRadius;
  });
};
const generateBallData = () => {
  const result: BallAttributes[] = [];
  const initialData = {
    context: canvasContext,
    ...random.getBallData(),
  };
  result.push(initialData);
  while (result.length < numberOfBalls) {
    const newData = {
      context: canvasContext,
      ...random.getBallData(),
    };
    if (!checkOverlaysExist(result, newData)) {
      result.push(newData);
    }
  }
  return result;
};
const ballsArray = generateBallData().map((ballData: BallAttributes) => {
  return new Ball(ballData);
});

const render = () => {
  main?.appendChild(canvas);
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  ballsArray.forEach((ball: Ball) => ball.draw());
  // requestAnimationFrame(render);
};

render();

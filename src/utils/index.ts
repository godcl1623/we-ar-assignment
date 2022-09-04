import Random from 'logic/random';
import { BallAttributes, CanvasContextType } from 'types/global';

export const getCentersDistance = (ballAData: BallAttributes, ballBData: BallAttributes) => {
  const { xCoordinates: xA, yCoordinates: yA } = ballAData;
  const { xCoordinates: xB, yCoordinates: yB } = ballBData;
  const distanceX = Math.pow(xA - xB, 2);
  const distanceY = Math.pow(yA - yB, 2);
  const centersDistance = Math.sqrt(distanceX + distanceY);
  return centersDistance;
};

export const checkOverlaysExist = (arrayToCheck: BallAttributes[], newBallData: BallAttributes) => {
  const newBallRadius = newBallData.radius;
  return arrayToCheck.some((currentData: BallAttributes) => {
    const centerDistance = getCentersDistance(currentData, newBallData);
    const currentRadius = currentData.radius;
    return centerDistance < currentRadius + newBallRadius;
  });
};

export const generateBallData = (canvasContext: CanvasContextType, random: Random, numberOfBalls: number) => {
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

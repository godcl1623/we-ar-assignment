import { BallAttributes, CanvasContextType } from 'types/global';
import { getCentersDistance } from 'utils/functions';
import {
  isFrontSmallerThanRear,
  isFrontBiggerThanRear,
  isFrontSimilarSmaller,
  isFrontSimilarBigger,
  isFrontOrRear,
  isNotExact,
} from 'utils/capsuledConditions';

interface CanvasBoundaries {
  minimumX: number;
  maximumX: number;
  minimumY: number;
  maximumY: number;
}

class Ball {
  private context: CanvasContextType;
  private xCoordinate: number;
  private yCoordinate: number;
  private radius: number;
  private xSpeed: number;
  private ySpeed: number;
  private movementAngle: number;
  private xMovementWithAngle: number;
  private yMovementWithAngle: number;
  private backgroundColor: string;

  getBallAttributes() {
    return {
      context: this.context,
      xCoordinate: this.xCoordinate,
      yCoordinate: this.yCoordinate,
      radius: this.radius,
      speed: this.xSpeed,
    };
  }

  constructor(ballAttributes: BallAttributes) {
    this.context = ballAttributes.context;
    this.radius = ballAttributes.radius;
    this.xCoordinate = this.correctXCoordinate(ballAttributes.xCoordinate);
    this.yCoordinate = this.correctYCoordinate(ballAttributes.yCoordinate);
    this.xSpeed = ballAttributes.speed;
    this.ySpeed = ballAttributes.speed;
    this.movementAngle = Math.random() * (Math.PI * 2);
    this.xMovementWithAngle = this.xSpeed * Math.cos(this.movementAngle);
    this.yMovementWithAngle = this.ySpeed * Math.sin(this.movementAngle);
    this.backgroundColor = 'black';
  }

  private correctXCoordinate(rawXCoordinates: number) {
    let result = rawXCoordinates;
    if (isFrontSmallerThanRear(rawXCoordinates, this.radius)) result = this.radius;
    else if (isFrontBiggerThanRear(rawXCoordinates + this.radius, 1000)) result = 1000 - this.radius;
    return result;
  }

  private correctYCoordinate(rawYCoordinates: number) {
    let result = rawYCoordinates;
    if (isFrontSmallerThanRear(rawYCoordinates, this.radius)) result = this.radius;
    else if (isFrontBiggerThanRear(rawYCoordinates + this.radius, 500)) result = 500 - this.radius;
    return result;
  }

  draw() {
    if (this.context != null) {
      this.context.beginPath();
      this.context.fillStyle = this.backgroundColor;
      this.context.arc(this.xCoordinate, this.yCoordinate, this.radius, 0, 2 * Math.PI, false);
      this.context.fill();
    } else {
      throw new Error('Canvas context is null');
    }
  }

  animate(ballList: Ball[], currentIndex: number, deltaTime: number) {
    this.moveBall(deltaTime);
    this.reflectOnWall(deltaTime);
    this.reflectOnOtherBalls(ballList, currentIndex, deltaTime);
  }

  private moveBall(deltaTime: number) {
    this.xCoordinate += this.xMovementWithAngle * deltaTime;
    this.yCoordinate += this.yMovementWithAngle * deltaTime;
  }

  private reflectOnWall(deltaTime: number) {
    const { minimumX, minimumY, maximumX, maximumY } = this.getCanvasBoundaries();
    if (
      isFrontOrRear(
        isFrontSimilarSmaller(this.xCoordinate, minimumX),
        isFrontSimilarBigger(this.xCoordinate, maximumX),
      )
    ) {
      if (isFrontSimilarSmaller(this.xCoordinate - this.xMovementWithAngle, minimumX)) this.xCoordinate = minimumX;
      else if (isFrontSimilarBigger(this.xCoordinate - this.xMovementWithAngle, maximumX)) this.xCoordinate = maximumX;
      this.xMovementWithAngle *= -1;
      this.xCoordinate += this.xMovementWithAngle * deltaTime;
    } else if (
      isFrontOrRear(
        isFrontSimilarSmaller(this.yCoordinate, minimumY),
        isFrontSimilarBigger(this.yCoordinate, maximumY),
      )
    ) {
      if (isFrontSimilarSmaller(this.yCoordinate - this.yMovementWithAngle, minimumY)) this.yCoordinate = minimumY;
      else if (isFrontSimilarBigger(this.yCoordinate - this.yMovementWithAngle, maximumY)) this.yCoordinate = maximumY;
      this.yMovementWithAngle *= -1;
      this.yCoordinate += this.yMovementWithAngle * deltaTime;
    }
  }

  private getCanvasBoundaries() {
    let result: CanvasBoundaries = {
      minimumX: 0,
      maximumX: 0,
      minimumY: 0,
      maximumY: 0,
    };
    if (this.context) {
      const canvasWidth = this.context.canvas.offsetWidth;
      const canvasHeight = this.context.canvas.offsetHeight;
      const minimumX = this.radius;
      const maximumX = canvasWidth - this.radius;
      const minimumY = this.radius;
      const maximumY = canvasHeight - this.radius;
      result = {
        minimumX,
        maximumX,
        minimumY,
        maximumY,
      };
    }
    return result;
  }

  private reflectOnOtherBalls(ballList: Ball[], currentIndex: number, deltaTime: number) {
    ballList.forEach((otherBall: Ball, index: number) => {
      if (isNotExact(index, currentIndex)) {
        const thisBallAttributes = this.getBallAttributes();
        const otherBallAttributes = otherBall.getBallAttributes();
        const centerDistance = getCentersDistance(thisBallAttributes, otherBallAttributes);
        const radiuses = thisBallAttributes.radius + otherBallAttributes.radius;
        if (isFrontSmallerThanRear(centerDistance, radiuses)) {
          this.xMovementWithAngle *= -1;
          this.xCoordinate += this.xMovementWithAngle * deltaTime;
          this.yMovementWithAngle *= -1;
          this.yCoordinate += this.yMovementWithAngle * deltaTime;
        }
      }
    });
  }
}

export default Ball;

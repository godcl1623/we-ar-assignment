import { BallAttributes, CanvasContextType } from 'types/global';
import { getCentersDistance } from 'utils';

class Ball {
  private context: CanvasContextType;
  private xCoordinates: number;
  private yCoordinates: number;
  private radius: number;
  private xSpeed: number;
  private ySpeed: number;
  private movementAngle: number;
  private movementAngleX: number;
  private movementAngleY: number;
  private backgroundColor: string;

  getAttributes(): BallAttributes {
    return {
      context: this.context,
      xCoordinates: this.xCoordinates,
      yCoordinates: this.yCoordinates,
      radius: this.radius,
      speed: this.xSpeed,
    };
  }

  setColor(newColor: string) {
    this.backgroundColor = newColor;
  }

  setNewCoordinates(newXCoordinate: number, newYCoordinate: number) {
    this.xCoordinates = newXCoordinate;
    this.yCoordinates = newYCoordinate;
  }

  constructor(ballAttributes: BallAttributes) {
    this.context = ballAttributes.context;
    this.radius = ballAttributes.radius;
    this.xCoordinates = this.correctXCoordinates(ballAttributes.xCoordinates);
    this.yCoordinates = this.correctYCoordinates(ballAttributes.yCoordinates);
    this.xSpeed = ballAttributes.speed;
    this.ySpeed = ballAttributes.speed;
    this.movementAngle = Math.random() * (Math.PI * 2);
    this.movementAngleX = this.xSpeed * Math.cos(this.movementAngle);
    this.movementAngleY = this.ySpeed * Math.sin(this.movementAngle);
    this.backgroundColor = 'black';
  }

  private correctXCoordinates(rawXCoordinates: number): number {
    let result = rawXCoordinates;
    if (rawXCoordinates < this.radius) result = this.radius;
    else if (rawXCoordinates + this.radius > 1000) result = 1000 - this.radius;
    return result;
  }

  private correctYCoordinates(rawYCoordinates: number): number {
    let result = rawYCoordinates;
    if (rawYCoordinates < this.radius) result = this.radius;
    else if (rawYCoordinates + this.radius > 500) result = 500 - this.radius;
    return result;
  }

  draw() {
    if (this.context != null) {
      this.context.beginPath();
      this.context.fillStyle = this.backgroundColor;
      this.context.arc(this.xCoordinates, this.yCoordinates, this.radius, 0, 2 * Math.PI, false);
      this.context.fill();
    } else {
      throw new Error('Canvas context is null');
    }
  }

  animate(ballList: Ball[], currentIndex: number) {
    this.move();
    this.reflectWall();
    this.reflectOtherBall(ballList, currentIndex);
  }

  private move() {
    this.xCoordinates += this.movementAngleX;
    this.yCoordinates += this.movementAngleY;
  }

  private reflectWall() {
    const { minimumX, minimumY, maximumX, maximumY } = this.getContextBoundaries();
    if (this.xCoordinates <= minimumX || this.xCoordinates >= maximumX) {
      if (this.xCoordinates - this.movementAngleX <= minimumX) this.xCoordinates = minimumX;
      else if (this.xCoordinates - this.movementAngleX >= maximumX) this.xCoordinates = maximumX;
      this.movementAngleX *= -1;
      this.xCoordinates += this.movementAngleX;
    } else if (this.yCoordinates <= minimumY || this.yCoordinates >= maximumY) {
      if (this.yCoordinates - this.movementAngleY <= minimumY) this.yCoordinates = minimumY;
      else if (this.yCoordinates - this.movementAngleY >= maximumY) this.yCoordinates = maximumY;
      this.movementAngleY *= -1;
      this.yCoordinates += this.movementAngleY;
    }
  }

  private getContextBoundaries() {
    const contextWidth = 1000;
    const contextHeight = 500;
    const minimumX = this.radius;
    const maximumX = contextWidth - this.radius;
    const minimumY = this.radius;
    const maximumY = contextHeight - this.radius;
    return {
      minimumX,
      maximumX,
      minimumY,
      maximumY,
    };
  }

  private reflectOtherBall(ballList: Ball[], currentIndex: number) {
    ballList.forEach((otherBall: Ball, index: number) => {
      if (index !== currentIndex) {
        const thisBallAttributes = this.getAttributes();
        const otherBallAttributes = otherBall.getAttributes();
        const centerDistance = getCentersDistance(thisBallAttributes, otherBallAttributes);
        const radiuses = thisBallAttributes.radius + otherBallAttributes.radius;
        if (centerDistance < radiuses) {
          this.movementAngleX *= -1;
          this.xCoordinates += this.movementAngleX;
          this.movementAngleY *= -1;
          this.yCoordinates += this.movementAngleY;
        }
      }
    });
  }
}

export default Ball;

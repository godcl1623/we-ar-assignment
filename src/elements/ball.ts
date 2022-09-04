interface BallAttributes {
  context: CanvasRenderingContext2D | null;
  xCoordinates: number;
  yCoordinates: number;
  radius: number;
  speed: number;
}

class Ball {
  private context: CanvasRenderingContext2D | null;
  private xCoordinates: number;
  private yCoordinates: number;
  private radius: number;
  private xSpeed: number;
  private ySpeed: number;

  constructor(ballAttributes: BallAttributes) {
    this.context = ballAttributes.context;
    this.radius = ballAttributes.radius;
    this.xCoordinates = this.correctXCoordinates(ballAttributes.xCoordinates);
    this.yCoordinates = this.correctYCoordinates(ballAttributes.yCoordinates);
    this.xSpeed = ballAttributes.speed;
    this.ySpeed = ballAttributes.speed;
  }

  draw() {
    if (this.context != null) {
      const { minimumX, minimumY, maximumX, maximumY } = this.getContextBoundaries();
      this.context.beginPath();
      this.context.fillStyle = 'black';
      this.context.arc(this.xCoordinates, this.yCoordinates, this.radius, 0, 2 * Math.PI, false);
      this.context.fill();

      if (this.xCoordinates <= minimumX || this.xCoordinates >= maximumX) {
        if (this.xCoordinates - this.xSpeed <= minimumX) this.xCoordinates = minimumX;
        else if (this.xCoordinates - this.xSpeed >= maximumX) this.xCoordinates = maximumX;
        this.xSpeed *= -1;
        this.xCoordinates += this.xSpeed;
      } else if (this.yCoordinates <= minimumY || this.yCoordinates >= maximumY) {
        if (this.yCoordinates - this.ySpeed <= minimumY) this.yCoordinates = minimumY;
        else if (this.yCoordinates - this.ySpeed >= maximumY) this.yCoordinates = maximumY;
        this.ySpeed *= -1;
        this.yCoordinates += this.ySpeed;
      } else {
        this.xCoordinates += this.xSpeed;
        this.yCoordinates += this.ySpeed;
      }
    } else {
      throw new Error('Canvas context is null');
    }
  }

  private correctXCoordinates(rawXCoordinates: number): number {
    let result = rawXCoordinates;
    if (rawXCoordinates < this.radius) result = this.radius;
    else if (rawXCoordinates + this.radius > 300) result = 300 - this.radius;
    return result;
  }

  private correctYCoordinates(rawYCoordinates: number): number {
    let result = rawYCoordinates;
    if (rawYCoordinates < this.radius) result = this.radius;
    else if (rawYCoordinates + this.radius > 150) result = 150 - this.radius;
    return result;
  }

  private getContextBoundaries() {
    const contextWidth = 300;
    const contextHeight = 150;
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
}

export default Ball;

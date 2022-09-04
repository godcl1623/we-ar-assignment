interface BallAttributes {
  context: CanvasRenderingContext2D | null;
  xCoordinates: number;
  yCoordinates: number;
  radius: number;
  speed: number;
}

class Ball {
  context: CanvasRenderingContext2D | null;
  xCoordinates: number;
  yCoordinates: number;
  radius: number;
  xSpeed: number;
  ySpeed: number;

  constructor(ballAttributes: BallAttributes) {
    this.context = ballAttributes.context;
    this.radius = ballAttributes.radius;
    this.xCoordinates = this.correctXCoordinates(ballAttributes.xCoordinates);
    this.yCoordinates = this.correctYCoordinates(ballAttributes.yCoordinates);
    this.xSpeed = ballAttributes.speed;
    this.ySpeed = ballAttributes.speed;
    console.log(this.xCoordinates + this.radius);
  }

  draw() {
    if (this.context != null) {
      this.context.beginPath();
      this.context.fillStyle = 'black';
      this.context.arc(this.xCoordinates, this.yCoordinates, this.radius, 0, 2 * Math.PI, false);
      this.context.fill();
    } else {
      throw new Error('Canvas context is null');
    }
  }

  correctXCoordinates(rawXCoordinates: number): number {
    let result = rawXCoordinates;
    if (rawXCoordinates < this.radius) result = this.radius;
    else if (rawXCoordinates + this.radius > 300) result = 300 - this.radius;
    return result;
  }

  correctYCoordinates(rawYCoordinates: number): number {
    let result = rawYCoordinates;
    if (rawYCoordinates < this.radius) result = this.radius;
    else if (rawYCoordinates + this.radius > 150) result = 150 - this.radius;
    return result;
  }
}

export default Ball;
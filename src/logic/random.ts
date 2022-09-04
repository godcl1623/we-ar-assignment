class Random {
  constructor() {
  };

  private getNumberLessThan(maxValue: number): number {
    return Math.floor(Math.random() * maxValue);
  };

  getNumberBetween(minValue: number, maxValue: number): number {
    let result = this.getNumberLessThan(maxValue + 1);
    if (result < minValue) result = minValue;
    return result;
  }

  getBallData() {
    const radius = this.getNumberBetween(10, 20);
    const xCoordinates = this.getNumberLessThan(300);
    const yCoordinates = this.getNumberLessThan(150);
    const speed = this.getNumberBetween(2, 4);
    return { radius, xCoordinates, yCoordinates, speed };
  };
};

export default Random;
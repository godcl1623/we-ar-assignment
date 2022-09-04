class Random {
  constructor() {
  };

  getNumberLessThan(maxValue: number) {
    return Math.floor(Math.random() * maxValue);
  };

  getNumberBetween(minValue: number, maxValue: number) {
    let result = this.getNumberLessThan(maxValue + 1);
    if (result < minValue) result = minValue;
    return result;
  }

  getBallData() {
    const radius = this.getNumberBetween(10, 20);
    const xCoordinate = this.getNumberLessThan(1000);
    const yCoordinate = this.getNumberLessThan(500);
    const speed = this.getNumberBetween(200, 400);
    return { radius, xCoordinate, yCoordinate, speed };
  };
};

export default Random;
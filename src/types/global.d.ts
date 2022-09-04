export type CanvasContextType = CanvasRenderingContext2D | null;

export interface BallAttributes {
  context: CanvasContextType;
  xCoordinate: number;
  yCoordinate: number;
  radius: number;
  speed: number;
}
export type CanvasContextType = CanvasRenderingContext2D | null;

export interface BallAttributes {
  context: CanvasContextType;
  xCoordinates: number;
  yCoordinates: number;
  radius: number;
  speed: number;
}
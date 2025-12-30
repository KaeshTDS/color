
export type ToolType = 'brush' | 'eraser';

export interface Color {
  name: string;
  hex: string;
}

export interface DrawingState {
  color: string;
  brushSize: number;
  tool: ToolType;
}

export interface ColoringPage {
  id: string;
  imageUrl: string;
  prompt: string;
}

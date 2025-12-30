
import { Color } from './types';

export const COLORS: Color[] = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Brown', hex: '#78350f' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
];

export const BRUSH_SIZES = [5, 10, 15, 25, 40];

export const SYSTEM_PROMPT = `You are a coloring book illustrator. Your task is to generate simple, clean, black and white line art coloring pages for children.
Guidelines:
- Only use black lines on a pure white background.
- No shading, no gradients, no grey colors.
- Bold, thick, continuous outlines.
- Large areas for kids to color in.
- Friendly, cute, and child-safe subjects.
- Avoid overly complex details.`;

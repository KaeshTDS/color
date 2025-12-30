
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ToolType } from '../types';

interface DrawingCanvasProps {
  backgroundImageUrl: string | null;
  brushColor: string;
  brushSize: number;
  tool: ToolType;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ 
  backgroundImageUrl, 
  brushColor, 
  brushSize, 
  tool 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingLayerRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Clear everything
  const clearCanvas = useCallback(() => {
    const drawingCtx = drawingLayerRef.current?.getContext('2d');
    if (drawingCtx && drawingLayerRef.current) {
      drawingCtx.clearRect(0, 0, drawingLayerRef.current.width, drawingLayerRef.current.height);
    }
  }, []);

  // Update canvas when background changes
  useEffect(() => {
    if (!backgroundImageUrl) {
      clearCanvas();
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Center and scale image
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.src = backgroundImageUrl;
  }, [backgroundImageUrl, clearCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent) => {
    const canvas = drawingLayerRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Scale coordinates if internal resolution != display size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = drawingLayerRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.stroke();

    setLastPos(pos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const downloadImage = () => {
    const compositeCanvas = document.createElement('canvas');
    compositeCanvas.width = 1024;
    compositeCanvas.height = 1024;
    const compositeCtx = compositeCanvas.getContext('2d');
    if (!compositeCtx) return;

    // Draw background
    if (canvasRef.current) {
        compositeCtx.drawImage(canvasRef.current, 0, 0);
    }
    // Draw drawing
    if (drawingLayerRef.current) {
        compositeCtx.drawImage(drawingLayerRef.current, 0, 0);
    }

    const link = document.createElement('a');
    link.download = 'my-gemini-masterpiece.png';
    link.href = compositeCanvas.toDataURL();
    link.click();
  };

  return (
    <div className="relative group w-full max-w-3xl mx-auto aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-yellow-400">
      {/* Base Layer: Gemini Generated Image */}
      <canvas 
        ref={canvasRef}
        width={1024}
        height={1024}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Drawing Layer */}
      <canvas 
        ref={drawingLayerRef}
        width={1024}
        height={1024}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          onClick={clearCanvas}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95"
        >
          Clear 🗑️
        </button>
        <button 
          onClick={downloadImage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95"
        >
          Save ✨
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;

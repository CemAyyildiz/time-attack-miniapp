import { useRef, useEffect } from 'react';

interface WheelCanvasProps {
  segments: WheelSegment[];
  currentAngle: number;
  size?: number;
}

export default function WheelCanvas({ segments, currentAngle, size = 400 }: WheelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    ctx.clearRect(0, 0, size, size);

    const anglePerSegment = (2 * Math.PI) / segments.length;
    const rotationRad = (currentAngle * Math.PI) / 180;

    segments.forEach((segment, index) => {
      const startAngle = rotationRad + index * anglePerSegment - Math.PI / 2;
      const endAngle = startAngle + anglePerSegment;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = segment.color;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(segment.label, radius * 0.7, 0);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [segments, currentAngle, size]);

  return (
    <div className="relative flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="pixel-corners retro-shadow border-4 border-primary"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 animate-bounce">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-primary" />
      </div>
    </div>
  );
}

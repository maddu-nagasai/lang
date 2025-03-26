
import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  size: number;
  color: string;
  connections: number[];
  animationOffset: number;
}

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      
      // Generate points based on canvas size
      generatePoints();
    };

    const generatePoints = () => {
      const points: Point[] = [];
      const numPoints = Math.min(50, Math.max(20, Math.floor(canvas.width / 40)));
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          size: Math.random() * 2 + 1,
          color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`,
          connections: [],
          animationOffset: Math.random() * Math.PI * 2
        });
      }
      
      // Create connections between nearby points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < canvas.clientWidth / 6) {
            points[i].connections.push(j);
            points[j].connections.push(i);
          }
        }
      }
      
      pointsRef.current = points;
    };

    const draw = (timestamp: number) => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Draw connections
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i];
        
        for (const j of point.connections) {
          const connectedPoint = pointsRef.current[j];
          const dx = point.x - connectedPoint.x;
          const dy = point.y - connectedPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connection once between two points
          if (i < j) {
            ctx.beginPath();
            const alpha = 1 - (distance / (canvas.clientWidth / 6));
            ctx.strokeStyle = isDarkMode 
              ? `rgba(148, 163, 184, ${alpha * 0.2})` 
              : `rgba(51, 65, 85, ${alpha * 0.15})`;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(connectedPoint.x, connectedPoint.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw points
      for (const point of pointsRef.current) {
        ctx.beginPath();
        
        // Add subtle pulsing effect
        const pulse = Math.sin(timestamp * 0.001 + point.animationOffset) * 0.5 + 0.5;
        const size = point.size * (1 + pulse * 0.3);
        
        // Create gradient for each point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size * 2
        );
        
        gradient.addColorStop(0, isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.7)');
        gradient.addColorStop(1, isDarkMode ? 'rgba(59, 130, 246, 0)' : 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animationFrameRef.current = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-80 dark:opacity-60"
    />
  );
}

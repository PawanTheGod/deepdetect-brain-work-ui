import { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const rippleIdCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: rippleIdCounter.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <style>{`
        @keyframes ripple-expand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }

        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          border: 2px solid hsl(var(--primary) / 0.4);
          animation: ripple-expand 2s ease-out forwards;
          pointer-events: none;
        }

        @keyframes spotlight-pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>

      {/* Mouse-following spotlight */}
      {isMouseInside && (
        <div
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '800px',
            height: '800px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
            animation: 'spotlight-pulse 4s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '600px',
            height: '600px',
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBackground;

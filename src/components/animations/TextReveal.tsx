import { useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const TextReveal = ({ children, delay = 0, className = '' }: TextRevealProps) => {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <motion.div 
      className={className}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  maxMove?: number;
}

export const MagneticButton = ({ 
  children, 
  className = '', 
  onClick,
  maxMove = 4 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = rect.width / 2;
      
      if (distance < maxDistance) {
        positionRef.current = {
          x: (deltaX / maxDistance) * maxMove,
          y: (deltaY / maxDistance) * maxMove,
        };
        
        button.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
      positionRef.current = { x: 0, y: 0 };
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxMove]);

  return (
    <motion.div
      ref={buttonRef}
      className={className}
      onClick={onClick}
      style={{ transition: 'transform 0.2s ease-out' }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

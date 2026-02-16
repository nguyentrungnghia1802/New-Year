import React, { useEffect, useState } from 'react';

interface Blossom {
  id: number;
  left: number;
  duration: number;
  size: number;
  delay: number;
  progress: number;
}

const getRandomBlossom = (id: number): Blossom => ({
  id,
  left: Math.random() * 100,
  duration: 3 + Math.random() * 3,
  size: 24 + Math.random() * 24,
  delay: Math.random() * 5,
  progress: 0,
});

const CherryBlossomRain: React.FC<{ count: number }> = ({ count }) => {
  const [blossoms, setBlossoms] = useState<Blossom[]>(
    Array.from({ length: count }, (_, i) => getRandomBlossom(i))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBlossoms(prev => prev.map(b => {
        const nextProgress = b.progress + 0.01 / b.duration;
        if (nextProgress >= 1) {
          return { ...getRandomBlossom(b.id), progress: 0 };
        }
        return { ...b, progress: nextProgress };
      }));
    }, 16);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {blossoms.map((b) => (
        <span
          key={b.id}
          className="absolute blossom"
          style={{
            left: `${b.left}%`,
            top: `calc(-40px + ${b.progress * 110}vh)`,
            fontSize: `${b.size}px`,
            opacity: 1 - b.progress * 0.3,
            transition: 'none',
            pointerEvents: 'none',
          }}
        >🌸</span>
      ))}
    </div>
  );
};

export default CherryBlossomRain;

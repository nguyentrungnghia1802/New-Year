import React, { useEffect, useRef, useState } from 'react';

interface Blossom {
  id: number;
  left: number;
  duration: number;
  size: number;
  delay: number;
}

const getRandomBlossom = (id: number): Blossom => ({
  id,
  left: Math.random() * 100,
  duration: 3 + Math.random() * 3,
  size: 24 + Math.random() * 24,
  delay: Math.random() * 5,
});

const CherryBlossomRain: React.FC<{ count: number }> = ({ count }) => {
  const [blossoms, setBlossoms] = useState<Blossom[]>(
    Array.from({ length: count }, (_, i) => getRandomBlossom(i))
  );

  // Each blossom has a progress (0 to 1), when reaches 1, respawn
  useEffect(() => {
    const interval = setInterval(() => {
      setBlossoms(prev => prev.map(b => {
        // progress: how far the blossom has fallen (0 to 1)
        if (!('progress' in b)) (b as any).progress = 0;
        (b as any).progress += 0.01 / b.duration;
        if ((b as any).progress >= 1) {
          return { ...getRandomBlossom(b.id) };
        }
        return { ...b };
      }));
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {blossoms.map((b, i) => {
        const progress = (b as any).progress || 0;
        return (
          <span
            key={b.id}
            className="absolute blossom"
            style={{
              left: `${b.left}%`,
              top: `calc(-40px + ${progress * 110}vh)`,
              fontSize: `${b.size}px`,
              opacity: 1 - progress * 0.3,
              transition: 'none',
              pointerEvents: 'none',
            }}
          >🌸</span>
        );
      })}
    </div>
  );
};

export default CherryBlossomRain;

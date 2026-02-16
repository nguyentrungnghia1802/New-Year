import React, { createContext, useContext, useRef, useState, useEffect, useMemo, useCallback } from 'react';

interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(`${import.meta.env.BASE_URL}audio/new-year.mp3`);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      // Auto-play when component mounts with user interaction fallback
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Audio autoplay prevented by browser:', err);
          // Browser blocked autoplay, will play when user clicks toggle
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prevMuted) => {
      if (audioRef.current) {
        if (prevMuted) {
          // Was muted, now unmute and play
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        } else {
          // Was playing, now pause
          audioRef.current.pause();
        }
      }
      return !prevMuted;
    });
  }, []);

  const value = useMemo(() => ({ muted, toggleMute }), [muted, toggleMute]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioManager = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioManager must be used within an AudioProvider');
  }
  return context;
};

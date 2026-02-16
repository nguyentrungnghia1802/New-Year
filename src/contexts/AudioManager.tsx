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
      audioRef.current.muted = false;
      // Auto-play when component mounts
      audioRef.current.play().catch(err => console.log('Audio autoplay failed:', err));
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
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
          audioRef.current.muted = false;
        } else {
          audioRef.current.muted = true;
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

import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/new-year.mp3');
      audioRef.current.loop = true;
      audioRef.current.muted = true;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        audioRef.current.muted = false;
      } else {
        audioRef.current.muted = true;
      }
      setMuted(!muted);
    }
  };

  return (
    <AudioContext.Provider value={{ muted, toggleMute }}>
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

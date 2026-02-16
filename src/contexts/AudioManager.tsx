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
      
      // Try to auto-play
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded
            setMuted(false);
          })
          .catch(err => {
            console.log('Audio autoplay prevented by browser:', err);
            // Keep muted = false, so user sees speaker icon and can click to play
            setMuted(false);
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
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      // Audio is paused, play it
      audioRef.current.play()
        .then(() => {
          setMuted(false);
        })
        .catch(err => console.log('Audio play failed:', err));
    } else {
      // Audio is playing, pause it
      audioRef.current.pause();
      setMuted(true);
    }
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

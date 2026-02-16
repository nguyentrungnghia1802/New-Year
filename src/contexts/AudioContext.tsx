import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (soundName: string) => void;
  playSpecialMusic: () => void;
  stopSpecialMusic: () => void;
  isSpecialMusicPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('audioMuted');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [isSpecialMusicPlaying, setIsSpecialMusicPlaying] = useState(false);
  
  const backgroundMusicRef = useRef<Howl | null>(null);
  const specialMusicRef = useRef<Howl | null>(null);
  const soundsRef = useRef<Record<string, Howl>>({});

  useEffect(() => {
    // Khởi tạo nhạc nền
    backgroundMusicRef.current = new Howl({
      src: ['/audio/background.mp3'],
      loop: true,
      volume: 0.3,
      html5: true,
    });

    // Khởi tạo nhạc đặc biệt cho trang pháo hoa
    specialMusicRef.current = new Howl({
      src: ['/audio/fireworks-special.mp3'],
      loop: false,
      volume: 0.5,
      html5: true,
      onend: () => {
        setIsSpecialMusicPlaying(false);
        // Quay lại nhạc nền mặc định
        if (!isMuted && backgroundMusicRef.current) {
          backgroundMusicRef.current.play();
        }
      },
    });

    // Khởi tạo các âm thanh hiệu ứng
    soundsRef.current = {
      click: new Howl({ src: ['/audio/click.mp3'], volume: 0.5 }),
      flower: new Howl({ src: ['/audio/flower.mp3'], volume: 0.4 }),
      lixi: new Howl({ src: ['/audio/lixi.mp3'], volume: 0.6 }),
      firework: new Howl({ src: ['/audio/firework.mp3'], volume: 0.5 }),
      fortune: new Howl({ src: ['/audio/fortune.mp3'], volume: 0.4 }),
    };

    // Phát nhạc nền khi load trang
    if (!isMuted) {
      backgroundMusicRef.current.play();
    }

    return () => {
      // Cleanup khi unmount
      backgroundMusicRef.current?.unload();
      specialMusicRef.current?.unload();
      Object.values(soundsRef.current).forEach(sound => sound.unload());
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('audioMuted', JSON.stringify(isMuted));
    
    if (isMuted) {
      backgroundMusicRef.current?.pause();
      specialMusicRef.current?.pause();
    } else {
      if (isSpecialMusicPlaying) {
        specialMusicRef.current?.play();
      } else {
        backgroundMusicRef.current?.play();
      }
    }
  }, [isMuted, isSpecialMusicPlaying]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const playSound = (soundName: string) => {
    if (!isMuted && soundsRef.current[soundName]) {
      soundsRef.current[soundName].play();
    }
  };

  const playSpecialMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop();
    }
    
    setIsSpecialMusicPlaying(true);
    
    if (!isMuted && specialMusicRef.current) {
      specialMusicRef.current.play();
    }
  };

  const stopSpecialMusic = () => {
    if (specialMusicRef.current) {
      specialMusicRef.current.stop();
    }
    setIsSpecialMusicPlaying(false);
    
    if (!isMuted && backgroundMusicRef.current) {
      backgroundMusicRef.current.play();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        playSound,
        playSpecialMusic,
        stopSpecialMusic,
        isSpecialMusicPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

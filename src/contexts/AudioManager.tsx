import React, { createContext, useContext, useRef, useState, useEffect, useMemo, useCallback } from 'react';

interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(false);
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
            setShowAutoplayPrompt(false);
          })
          .catch(err => {
            console.log('Audio autoplay prevented by browser:', err);
            // Show prompt to enable audio
            setShowAutoplayPrompt(true);
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

  const handleEnableAudio = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.play()
      .then(() => {
        setMuted(false);
        setShowAutoplayPrompt(false);
      })
      .catch(err => {
        console.log('Audio play failed:', err);
      });
  }, []);

  const value = useMemo(() => ({ muted, toggleMute }), [muted, toggleMute]);

  return (
    <AudioContext.Provider value={value}>
      {children}
      
      {/* Autoplay prompt modal */}
      {showAutoplayPrompt && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={handleEnableAudio}
        >
          <div 
            className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4 transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Bật Âm Thanh Tết
              </h3>
              <p className="text-red-100 mb-6">
                Nhấn vào nút bên dưới để thưởng thức nhạc Tết vui tươi! 🎊
              </p>
              <button
                onClick={handleEnableAudio}
                className="bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95"
              >
                🔊 Bật Âm Thanh
              </button>
            </div>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAudioManager = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioManager must be used within an AudioProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CherryBlossomRain from '../components/CherryBlossomRain';
import { useAudioManager } from '../contexts/AudioManager';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasPlayedBell, setHasPlayedBell] = useState(false);
  const { muted, toggleMute } = useAudioManager();

  // Đếm ngược đến Tết âm lịch 2026 (Bính Ngọ) - 17/02/2026
  // TEST: 17:15 hôm nay
  useEffect(() => {
    const targetDate = new Date('2026-02-17T00:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setIsUnlocked(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUnlocked(true);
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Phát âm thanh chuông khi unlock
  useEffect(() => {
    if (isUnlocked && !hasPlayedBell) {
      const bell = new Audio(`${import.meta.env.BASE_URL}audio/ting-ting.mp3`);
      bell.volume = 0.7;
      let playCount = 0;
      
      const playBell = () => {
        if (playCount < 3) {
          bell.currentTime = 0;
          bell.play().catch(err => console.log('Bell play failed:', err));
          playCount++;
          setTimeout(playBell, 1000); // Lặp sau 1 giây
        }
      };
      
      playBell();
      setHasPlayedBell(true);
    }
  }, [isUnlocked, hasPlayedBell]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      {/* Responsive Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${window.innerWidth < 768 ? import.meta.env.BASE_URL + 'images/background/main-mobile.png' : import.meta.env.BASE_URL + 'images/background/main.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-yellow-400/70 hover:bg-yellow-300/80 rounded-full p-3 shadow-lg transition"
        aria-label="Tắt/mở nhạc nền"
      >
        {muted ? (
          <span role="img" aria-label="Unmute">🔇</span>
        ) : (
          <span role="img" aria-label="Mute">🔊</span>
        )}
      </button>

      {/* Countdown Header */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="mb-6 text-lg md:text-3xl font-bold text-center text-yellow-300 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-xl px-4 py-2 md:px-6 md:py-3 shadow-lg tet-gradient" style={{textShadow:'0 3px 10px #D32F2F, 0 0 20px #FFD700, 0 0 30px rgba(255, 215, 0, 0.8)', background: 'rgba(220, 38, 38, 0.7)'}}>
          Count down và đón giao thừa cùng mình nhé 😃
        </div>

        {/* Animated Horses - slow, less, emoji icon */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-20">
          {[0,1].map(i => (
            <span
              key={i}
              className="absolute animate-horse"
              style={{
                left: `${15 + i*60}%`,
                top: `${i===0 ? 15 : 75}%`,
                fontSize: '48px',
                animationDelay: `${i*2}s`,
                animationDuration: '14s',
                zIndex: 30
              }}
            >🐎</span>
          ))}
        </div>

        {/* Falling Cherry Blossom Effect - natural respawn */}
        <CherryBlossomRain count={20} />

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16">
          {[{ label: 'Ngày', value: timeLeft.days }, { label: 'Giờ', value: timeLeft.hours }, { label: 'Phút', value: timeLeft.minutes }, { label: 'Giây', value: timeLeft.seconds }].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-black/60 backdrop-blur-sm rounded-2xl p-3 md:p-6 shadow-2xl border-2 border-yellow-400"
            >
              <div className="text-3xl md:text-6xl font-bold text-yellow-300 mb-1 md:mb-2" style={{textShadow:'0 2px 8px #FFD700, 0 0 12px #D32F2F'}}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-lg font-semibold text-yellow-200">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Pháo Hoa Button */}
          <div className="relative">
            <button
              onClick={() => window.location.href = 'https://nguyentrungnghia1802.github.io/Firework/'}
              disabled={!isUnlocked}
              className={`group relative w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 md:py-6 px-6 md:px-8 rounded-2xl font-bold text-lg md:text-2xl shadow-xl transition-all duration-300 bg-opacity-60 ${
                isUnlocked ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{background: 'rgba(255, 0, 80, 0.6)'}}
            >
              <span className="relative z-10">🎆 Pháo Hoa</span>
              {isUnlocked && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity" />}
            </button>
            
            {/* Locked Badge */}
            {!isUnlocked && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center border-2 border-yellow-400/80 rounded-xl px-3 py-2 pointer-events-none z-20">
                <div className="text-yellow-300 font-bold text-xs md:text-sm mb-1" style={{textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.9)'}}>🔒 Mở sau:</div>
                <div className="flex gap-1 text-xs">
                  <span className="bg-red-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.days).padStart(2, '0')}d</span>
                  <span className="bg-red-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="bg-red-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span className="bg-red-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            )}
          </div>

          {/* Bốc Lì Xì Button */}
          <div className="relative">
            <button
              onClick={() => handleNavigate('/lixi')}
              disabled={!isUnlocked}
              className={`group relative w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 md:py-6 px-6 md:px-8 rounded-2xl font-bold text-lg md:text-2xl shadow-xl transition-all duration-300 bg-opacity-60 ${
                isUnlocked ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{background: 'rgba(255, 180, 0, 0.6)'}}
            >
              <span className="relative z-10">🧧 Bốc Lì Xì</span>
              {isUnlocked && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity" />}
            </button>
            
            {/* Locked Badge */}
            {!isUnlocked && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center border-2 border-yellow-400/80 rounded-xl px-3 py-2 pointer-events-none z-20">
                <div className="text-yellow-300 font-bold text-xs md:text-sm mb-1" style={{textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.9)'}}>🔒 Mở sau:</div>
                <div className="flex gap-1 text-xs">
                  <span className="bg-yellow-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.days).padStart(2, '0')}d</span>
                  <span className="bg-yellow-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="bg-yellow-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span className="bg-yellow-600/95 text-white px-1.5 py-0.5 rounded font-semibold" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            )}
          </div>

          {/* Giao Quẻ Button - Always unlocked */}
          <button
            onClick={() => handleNavigate('/fortune')}
            className="group relative bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 md:py-6 px-6 md:px-8 rounded-2xl font-bold text-lg md:text-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-opacity-60"
            style={{background: 'rgba(120, 80, 255, 0.6)'}}
          >
            <span className="relative z-10">🔮 Giao Quẻ</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

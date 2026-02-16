import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

interface LixiEnvelope {
  id: number;
  amount: number;
  message: string;
  color: string;
}

const LIXI_AMOUNTS = [
  { amount: 500000, message: 'May mắn ngập tràn, năm nay bùng nổ! 🎉', color: '#FF1493' },
  { amount: 200000, message: 'Tài lộc hanh thông, vạn sự như mơ! 💰', color: '#FFD700' },
  { amount: 100000, message: 'Lộc vừa đủ, niềm vui tròn đầy! 🌟', color: '#FF6B6B' },
  { amount: 100000, message: 'Một trăm nghìn hạnh phúc tràn đầy! ✨', color: '#4ECDC4' },
  { amount: 50000, message: 'Vạn sự suôn sẻ, thuận buồm xuôi gió! ⛵', color: '#FFA500' },
  { amount: 20000, message: 'Bình an cả năm, mọi điều an lành! 🕊️', color: '#9370DB' },
  { amount: 10000, message: 'Niềm vui nho nhỏ, hạnh phúc lớn dài! 😊', color: '#FF69B4' },
  { amount: 1000, message: 'Nhỏ mà có võ, vui là chính! 🤗', color: '#32CD32' },
];

const LixiPage: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useAudio();
  const [envelopes, setEnvelopes] = useState<LixiEnvelope[]>([]);
  const [selectedEnvelope, setSelectedEnvelope] = useState<LixiEnvelope | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const shuffleEnvelopes = () => {
    const shuffled = [...LIXI_AMOUNTS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        ...item,
      }));
    setEnvelopes(shuffled);
  };

  useEffect(() => {
    shuffleEnvelopes();
  }, []);

  const handleEnvelopeClick = (envelope: LixiEnvelope) => {
    if (isOpening) return;
    
    playSound('lixi');
    setIsOpening(true);
    setSelectedEnvelope(envelope);
  };

  const handleTryAgain = () => {
    playSound('click');
    setSelectedEnvelope(null);
    setIsOpening(false);
    shuffleEnvelopes();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🧧</div>
        <div className="absolute top-20 right-20 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🧧</div>
        <div className="absolute bottom-20 left-20 text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🧧</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>🧧</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 glow-text text-center">
          🧧 Bốc Lì Xì May Mắn 🧧
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 text-center">
          Chọn một bao lì xì để nhận quà may mắn!
        </p>

        {/* Envelopes Grid */}
        {!selectedEnvelope && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 max-w-6xl w-full">
            {envelopes.map((envelope) => (
              <button
                key={envelope.id}
                onClick={() => handleEnvelopeClick(envelope)}
                className="group relative aspect-[3/4] transform hover:scale-110 transition-all duration-300"
                disabled={isOpening}
              >
                <div
                  className="absolute inset-0 rounded-2xl shadow-2xl"
                  style={{ backgroundColor: envelope.color }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="text-6xl md:text-8xl mb-4 group-hover:scale-125 transition-transform">
                    🧧
                  </div>
                  <div className="text-white font-bold text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    Nhấn vào đây
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </button>
            ))}
          </div>
        )}

        {/* Result Display */}
        {selectedEnvelope && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl animate-scale-in">
              {/* Fireworks Effect */}
              <div className="text-center mb-6">
                <div className="text-6xl md:text-8xl mb-4 animate-bounce">
                  🎉🎊✨
                </div>
              </div>

              {/* Money Display */}
              <div className="text-center mb-8">
                <div className="text-8xl md:text-9xl mb-6">
                  💵
                </div>
                <div className="text-5xl md:text-6xl font-bold text-tet-red mb-4">
                  {formatCurrency(selectedEnvelope.amount)}
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold mb-6 px-6 py-4 rounded-2xl text-white"
                  style={{ backgroundColor: selectedEnvelope.color }}
                >
                  {selectedEnvelope.message}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-center gap-4 text-4xl mb-8">
                <span className="animate-bounce">🌟</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💫</span>
                <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>⭐</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-tet-red to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  🔄 Bốc Lại
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  🏠 Về Trang Chủ
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedEnvelope && (
          <button
            onClick={() => navigate('/')}
            className="mt-8 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
          >
            🏠 Về Trang Chủ
          </button>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LixiPage;

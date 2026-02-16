import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudioManager } from '../contexts/AudioManager';

interface LixiEnvelope {
  id: number;
  amount: number;
  message: string;
}

const LIXI_DATA = [
  { amount: 2000, message: 'Song hỷ lâm môn — May mắn nhân đôi!' },
  { amount: 5000, message: 'Phúc lộc dồi dào — Tài lộc tràn trề!' },
  { amount: 10000, message: 'Vạn sự như ý — Điều gì cũng thành!' },
  { amount: 20000, message: 'Tiền tài rủng rỉnh — Cuộc sống no đầy!' },
  { amount: 50000, message: 'Tấn tài tấn lộc — Thịnh vượng vô biên!' },
  { amount: 100000, message: 'Nghìn vàng mười bạc — Giàu sang phú quý!' },
  { amount: 200000, message: 'Tài vận hanh thông — Của cải luôn đầy!' },
  { amount: 500000, message: 'Đại phát đại lợi — Thành công rực rỡ!' },
];

const LixiPage: React.FC = () => {
  const navigate = useNavigate();
  const { muted, toggleMute } = useAudioManager();
  const [envelopes, setEnvelopes] = useState<LixiEnvelope[]>([]);
  const [selectedEnvelope, setSelectedEnvelope] = useState<LixiEnvelope | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const shuffleEnvelopes = () => {
    const shuffled = [...LIXI_DATA]
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
    
    setIsOpening(true);
    setSelectedEnvelope(envelope);
  };

  const handleTryAgain = () => {
    setSelectedEnvelope(null);
    setIsOpening(false);
    shuffleEnvelopes();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 overflow-hidden">
      {/* Background decoration with traditional bridge/pagoda illustration */}
      <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{backgroundImage: 'url(/images/background/traditional-bg.png)'}}></div>
      
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center" style={{color: '#FF6B35', textShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
          CHỌN LÌ XÌ HAY MẮN
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center italic" style={{color: '#888'}}>
          Lộc xuân của bạn đã là điểm
        </p>

        {/* Envelopes Grid */}
        {!selectedEnvelope && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 max-w-6xl w-full">
            {envelopes.map((envelope, index) => (
              <button
                key={envelope.id}
                onClick={() => handleEnvelopeClick(envelope)}
                className="group relative aspect-[3/4] transform hover:scale-110 transition-all duration-300 animate-float"
                style={{animationDelay: `${index * 0.1}s`}}
                disabled={isOpening}
              >
                {/* Red Envelope */}
                <div className="absolute inset-0 rounded-lg shadow-2xl bg-gradient-to-b from-red-600 to-red-700 border-4 border-yellow-500 overflow-hidden">
                  {/* Gold decorative pattern */}
                  <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-yellow-400 to-transparent opacity-30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-yellow-400 to-transparent opacity-30"></div>
                  
                  {/* Fu symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl border-4 border-yellow-500 group-hover:scale-125 transition-transform duration-300">
                      <span className="text-4xl md:text-5xl font-bold" style={{color: '#D32F2F'}}>福</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Result Display */}
        {selectedEnvelope && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 animate-fade-in">
            <div className="relative bg-gradient-to-br from-yellow-900 to-red-900 rounded-3xl p-6 md:p-12 max-w-2xl w-full shadow-2xl border-4 border-yellow-400 animate-scale-in">
              {/* Close button */}
              <button
                onClick={handleTryAgain}
                className="absolute top-4 right-4 text-white text-2xl hover:text-yellow-400 transition"
              >
                ✕
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{color: '#FFD700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'}}>
                  CHÚC MỪNG NĂM MỚI!
                </h2>
                <p className="text-base md:text-lg italic" style={{color: '#FFF8DC'}}>
                  Lộc xuân của bạn đã là điểm
                </p>
              </div>

              {/* Money Image */}
              <div className="mb-6 bg-white rounded-xl p-4 shadow-2xl">
                {/* Money note placeholder or image */}
                <div className="text-center py-8">
                  <div className="text-5xl md:text-7xl mb-4">💵</div>
                  <div className="text-4xl md:text-6xl font-bold mb-2" style={{color: '#D32F2F'}}>
                    {formatCurrency(selectedEnvelope.amount)}
                  </div>
                </div>
              </div>

              {/* Blessing Message */}
              <div className="text-center mb-8">
                <p className="text-lg md:text-2xl font-bold italic" style={{color: '#FFD700'}}>
                  "{selectedEnvelope.message}"
                </p>
              </div>

              {/* Button */}
              <div className="text-center">
                <button
                  onClick={handleTryAgain}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
                >
                  NHẬN LỘC TIẾP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Home Button */}
        {!selectedEnvelope && (
          <button
            onClick={() => navigate('/')}
            className="mt-8 bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 shadow-lg border-2 border-gray-300"
          >
            🏠 VỀ TRANG CHỦ
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LixiPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

interface FortuneResult {
  title: string;
  overview: string;
  career: string;
  wealth: string;
  love: string;
  health: string;
  image: string;
}

const FORTUNES: FortuneResult[] = [
  {
    title: '🌟 ĐẠI CÁT - VẠN SỰ HANH THÔNG',
    overview: 'Năm mới này là năm của sự may mắn và thịnh vượng. Mọi điều bạn mong muốn đều sẽ được thực hiện một cách suôn sẻ.',
    career: 'Sự nghiệp thăng tiến vượt bậc, cơ hội thăng chức hoặc khởi nghiệp rất thuận lợi. Quý nhân phù trợ xuất hiện đúng lúc.',
    wealth: 'Tài vận hanh thông, nguồn thu nhập tăng lên đáng kể. Đầu tư có lãi, kinh doanh phát đạt.',
    love: 'Tình duyên viên mãn, hạnh phúc tràn đầy. Người độc thân gặp được nửa kia, người đã có đôi thêm gắn bó.',
    health: 'Sức khỏe dồi dào, tinh thần phấn chấn. Năng lượng tích cực tràn đầy.',
  },
  {
    title: '✨ THƯỢNG CÁT - PHÚC LỘC SONG TOÀN',
    overview: 'Quẻ báo hiệu một năm đầy may mắn và hạnh phúc. Công việc thuận lợi, gia đạo an khang.',
    career: 'Công việc ổn định và phát triển tốt. Nỗ lực được ghi nhận, danh tiếng được nâng cao.',
    wealth: 'Tài chính dồi dào, của cải tăng thêm. Có tiền tích lũy, cuộc sống sung túc.',
    love: 'Tình cảm gia đình hòa thuận, quan hệ xã hội tốt đẹp. Được nhiều người yêu mến.',
    health: 'Khỏe mạnh, vui vẻ. Tinh thần lạc quan, cuộc sống cân bằng.',
  },
  {
    title: '🎋 TRUNG CÁT - VẠN SỰ NHƯ Ý',
    overview: 'Năm mới mang đến nhiều điều tốt lành. Dù có thử thách nhỏ nhưng đều vượt qua được.',
    career: 'Tiến bộ từng bước, đạt được mục tiêu đề ra. Kinh nghiệm tích lũy ngày càng nhiều.',
    wealth: 'Thu nhập ổn định, đủ đầy. Biết tiết kiệm và đầu tư khôn ngoan.',
    love: 'Tình cảm êm đềm, hạnh phúc bình yên. Gia đình là chỗ dựa vững chắc.',
    health: 'Sức khỏe tốt, cần chú ý nghỉ ngơi hợp lý. Tập thể dục đều đặn.',
  },
  {
    title: '🌸 TIỂU CÁT - AN KHANG THỊNH VƯỢNG',
    overview: 'Quẻ báo hiệu sự bình an và hạnh phúc. Cuộc sống yên ổn, mọi việc suôn sẻ.',
    career: 'Công việc bình ổn, không có biến động lớn. Phát triển đều đặn theo đúng kế hoạch.',
    wealth: 'Tài chính ổn định, không thiếu thốn. Chi tiêu hợp lý, có dư dả.',
    love: 'Tình cảm bền vững, hiểu nhau và thương yêu. Gia đình ấm áp.',
    health: 'Khỏe mạnh, không bệnh tật. Tâm trạng thoải mái, vui vẻ.',
  },
  {
    title: '🎊 ĐẠI LỢI - VẬN MAY RƯỚC LỘC',
    overview: 'Năm của những cơ hội lớn và thành công rực rỡ. Hãy tận dụng mọi cơ hội.',
    career: 'Bứt phá mạnh mẽ, thành tựu vượt mong đợi. Được tin tưởng và giao trọng trách.',
    wealth: 'Tài lộc dồi dào, của cải tăng lên nhanh chóng. Đầu tư sinh lời cao.',
    love: 'Hạnh phúc viên mãn, tình yêu nở rộ. Mối quan hệ sâu sắc và ý nghĩa.',
    health: 'Tràn đầy sinh lực, sức khỏe tuyệt vời. Tinh thần minh mẫn.',
  },
  {
    title: '🏆 THỊNH VẬN - CÔNG DANH HIỂN HIỂN',
    overview: 'Quẻ đại cát về công danh và sự nghiệp. Năm nay là thời điểm tỏa sáng của bạn.',
    career: 'Thăng tiến vượt bậc, vị trí cao hơn, trọng trách lớn hơn. Tài năng được phát huy.',
    wealth: 'Nguồn thu từ sự nghiệp tăng cao. Của cải phong phú, giàu sang phú quý.',
    love: 'Được ngưỡng mộ và yêu mến. Tình duyên tốt đẹp, gia đình hòa thuận.',
    health: 'Sức khỏe dồi dào, tinh thần phấn chấn. Năng lượng tích cực.',
  },
];

const FortunePage: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useAudio();
  
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: '',
    gender: '',
  });
  
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.day || !formData.month || !formData.year || !formData.gender) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    playSound('fortune');
    
    // Thuật toán random có điều kiện dựa trên ngày sinh
    const seed = parseInt(formData.day) + parseInt(formData.month) + parseInt(formData.year);
    const index = seed % FORTUNES.length;
    
    setTimeout(() => {
      setFortune(FORTUNES[index]);
      setShowResult(true);
    }, 1000);
  };

  const handleReset = () => {
    playSound('click');
    setFormData({ day: '', month: '', year: '', gender: '' });
    setFortune(null);
    setShowResult(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-spin" style={{ animationDuration: '20s' }}>☯️</div>
        <div className="absolute top-20 right-20 text-6xl animate-spin" style={{ animationDuration: '25s' }}>🔮</div>
        <div className="absolute bottom-20 left-20 text-6xl animate-spin" style={{ animationDuration: '30s' }}>✨</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-spin" style={{ animationDuration: '15s' }}>⭐</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {!showResult ? (
          <div className="max-w-2xl w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 glow-text text-center">
              🔮 Giao Quẻ Đầu Năm 🔮
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 text-center">
              Khám phá vận mệnh năm mới của bạn
            </p>

            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Date of Birth */}
              <div className="mb-8">
                <label className="block text-white text-lg font-semibold mb-4">
                  Ngày tháng năm sinh
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="day"
                    placeholder="Ngày"
                    min="1"
                    max="31"
                    value={formData.day}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl bg-white/90 text-gray-800 font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tet-gold"
                  />
                  <input
                    type="number"
                    name="month"
                    placeholder="Tháng"
                    min="1"
                    max="12"
                    value={formData.month}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl bg-white/90 text-gray-800 font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tet-gold"
                  />
                  <input
                    type="number"
                    name="year"
                    placeholder="Năm"
                    min="1900"
                    max="2025"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl bg-white/90 text-gray-800 font-semibold text-center focus:outline-none focus:ring-2 focus:ring-tet-gold"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="mb-8">
                <label className="block text-white text-lg font-semibold mb-4">
                  Giới tính
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      formData.gender === 'male'
                        ? 'bg-blue-500 text-white shadow-xl scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    👨 Nam
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      formData.gender === 'female'
                        ? 'bg-pink-500 text-white shadow-xl scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    👩 Nữ
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-tet-gold to-yellow-500 text-gray-900 py-4 px-8 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4"
              >
                ✨ Xem Quẻ ✨
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                🏠 Về Trang Chủ
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl w-full animate-scale-in">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Fortune Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-tet-red mb-4 glow-text">
                  {fortune?.title}
                </h2>
                <div className="text-6xl mb-6">🎊🎉✨</div>
              </div>

              {/* Fortune Content */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-tet-red mb-3">📜 Tổng Quan</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.overview}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-purple-700 mb-3">💼 Công Việc - Học Tập</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.career}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">💰 Tài Lộc</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.wealth}</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-pink-700 mb-3">💕 Tình Cảm</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.love}</p>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-teal-700 mb-3">🏥 Sức Khỏe</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.health}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  🔄 Xem Lại
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
      </div>
    </div>
  );
};

export default FortunePage;

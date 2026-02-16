import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudioManager } from '../contexts/AudioManager';

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
    title: '🌟 ĐẠI CÁT - LONG PHƯỢNG CHẦU NGUYÊN',
    overview: 'Quẻ Long Phượng Chầu Nguyên báo hiệu Thiên thời, Địa lợi, Nhân hòa đều hội tụ đầy đủ. Vận số đại cát, vạn sự hanh thông. Đây là thời khắc trời đất ban ơn, tổ tiên phù hộ. Quý nhân xuất hiện, công danh phát đạt, gia đạo hưng thịnh.',
    career: 'Sao Văn Xương chiếu mệnh, Thiên Quan tứ đại. Công danh thăng tiến như rồng bay phượng múa. Tháng 3 và tháng 7 âm lịch sẽ có tin vui về thăng chức hoặc gia tăng quyền lực. Nên mở rộng kinh doanh, khởi sự việc lớn vào hướng Đông Nam.',
    wealth: 'Tài tinh đắc vị, Thiên Tài chiếu mệnh. Tài vận hanh thông tứ phương, của cải tăng sinh bội phần. Đầu tư vào tháng 2, 5, 8 âm lịch sẽ sinh lợi lớn. Hợp màu vàng kim, phương Tây Nam để thu hút tài lộc.',
    love: 'Hồng Loan tinh động, Thiên Hỷ lâm môn. Người độc thân gặp được chánh duyên trong năm nay, đặc biệt vào mùa xuân và mùa thu. Người đã có đôi tình duyên viên mãn, hạnh phúc sung mãn. Con cái hiếu thảo, gia đạo hưng thịnh.',
    health: 'Phúc Đức cung tốt, Thọ Tinh vượng tướng. Khí huyết lưu thông, ngũ tạng lục phủ điều hòa. Nên uống nước có vị ngọt nhẹ, ăn thực phẩm màu đỏ và vàng để tăng cường khí vận. Tập thể dục lúc mặt trời mọc để đón khí dương.',
    image: ''
  },
  {
    title: '✨ THƯỢNG CÁT - QUÝ NHÂN PHÁT ĐẠT',
    overview: 'Quẻ Quý Nhân Phát Đạt, cát tinh cao chiếu. Trong năm này, quý nhân tứ phương tề tựu, giúp đỡ đắc lực. Mọi việc làm đều có người hỗ trợ, công danh sự nghiệp thuận lợi hanh thông. Phúc lộc song toàn, gia đạo an khang.',
    career: 'Thiên Quan tứ cát, Quan Lộc cung vượng. Sự nghiệp phát triển nhờ quý nhân nâng đỡ. Tháng 4 và tháng 10 âm lịch có cơ hội thăng tiến lớn. Nên gặp gỡ đối tác vào buổi sáng, kết giao với người mặt phương, má đầy.',
    wealth: 'Tài Bạch tinh chiếu, Lộc Tồn vào mệnh. Nguồn tài từ nghề nghiệp chính dồi dào, thêm có tài lộc phụ. Nên để ý cơ hội làm ăn với người tuổi Thìn, Thân. Màu xanh lam và trắng bạc mang lại may mắn về tài chính.',
    love: 'Hồng Loan cung sáng, Thiên Hỷ đắc vị. Tình duyên tốt đẹp, được gia đình ủng hộ. Cần chú ý giao tiếp, lắng nghe để giữ gìn hạnh phúc. Vợ chồng hòa thuận, con cái ngoan ngoãn, gia đình êm ấm.',
    health: 'Thọ Nguyên cung tốt, Phúc Tinh chiếu mệnh. Sức khỏe ổn định, tinh thần phấn chấn. Nên ăn nhiều rau xanh, trái cây. Đi dạo về hướng Đông vào buổi sáng sẽ tăng cường vận khí và sức khỏe.',
    image: ''
  },
  {
    title: '🎋 TRUNG CÁT - BẢN MỆNH AN THÁI',
    overview: 'Quẻ Bản Mệnh An Thái, trung bình đại cát. Năm nay vận khí ổn định, không có biến động lớn. Làm việc gì cũng nên từ từ, không vội vàng. Giữ được hiện tại thì tương lai càng tốt đẹp. Bình an là phúc, đơn giản là quý.',
    career: 'Quan Lộc cung bình hòa, tiến bộ đều đặn. Không nên thay đổi lớn, hãy vun đắp từng bước nhỏ. Tháng 6 và tháng 9 âm lịch là thời điểm tốt để học hỏi kỹ năng mới. Nên làm việc với những người tính tình điềm đạm.',
    wealth: 'Tài Bạch bình ổn, Lộc Tồn vào cung. Thu nhập đều đặn, không thiếu thốn. Nên tiết kiệm, tích lũy cho tương lai. Đầu tư an toàn như vàng, đất đai sẽ mang lại lợi nhuận ổn định. Tránh đầu cơ, liều lĩnh.',
    love: 'Phu Thê cung hòa hợp, tình cảm bền chặt. Không có sóng gió lớn, cùng nhau vun đắp hạnh phúc đơn giản. Nên dành thời gian cho gia đình, tổ chức các buổi họp mặt ấm cúng.',
    health: 'Thân Cung an ổn, Bệnh Ách không xâm. Sức khỏe tốt, cần duy trì lối sống lành mạnh. Ăn uống điều độ, ngủ nghỉ đúng giờ. Nên uống trà xanh, ăn ngũ cốc để bồi bổ khí huyết.',
    image: ''
  },
  {
    title: '🌸 TIỂU CÁT - THUẬN BUỒM XUÔI GIÓ',
    overview: 'Quẻ Thuận Buồm Xuôi Gió, tiểu cát phát tài. Năm này vận khí thuận lợi, mọi việc suôn sẻ như ý. Tuy không có sự đột phá lớn nhưng mọi thứ đều êm đẹp, an vui. Gia đạo bình yên, tâm hồn thư thái.',
    career: 'Quan Lộc cung bình thường, không thăng không giáng. Công việc ổn định, đồng nghiệp hòa thuận. Nên giữ thái độ khiêm tốn, tích lũy kinh nghiệm. Tháng 1 và tháng 11 âm lịch có thể có thay đổi nhỏ, đều là tốt.',
    wealth: 'Tiểu Tài vào mệnh, Tích Lũy Đức Lợi. Của cải đủ dùng, có thể để dành. Nên làm từ thiện, giúp đỡ người nghèo khó để tích phúc đức. Màu xanh lá và nâu đất mang lại may mắn cho tài vận.',
    love: 'Phu Thê cung êm đềm, tình nghĩa bền lâu. Hai vợ chồng thấu hiểu, chia sẻ. Gia đình ấm áp, con cái vâng lời. Nên cùng nhau đi chùa, cầu an vào đầu năm để giữ gìn hạnh phúc.',
    health: 'Phúc Đức cung tốt, không bệnh hoạn. Khỏe mạnh, vui vẻ. Nên tập thái cực, khí công để điều hòa âm dương. Ăn nhiều rau củ quả, hạn chế đồ chiên rán.',
    image: ''
  },
  {
    title: '🎊 THƯỢNG THƯỢNG - VẠN SỰ HANH THÔNG',
    overview: 'Quẻ Vạn Sự Hanh Thông, đại cát đại lợi. Thiên thời địa lợi nhân hòa đều thuận, vạn sự như ý. Đây là năm của sự bứt phá và thành công rực rỡ. Tự tinh chiếu mệnh, phúc tinh cao chiếu. Mở cửa đón tài, nghênh quý đón lộc.',
    career: 'Thiên Quan đắc tinh, Quan Lộc vượng tướng. Năm nay là năm của sự bứt phá trong sự nghiệp. Cơ hội thăng tiến, khởi nghiệp đều thuận lợi. Tháng 3, 6, 9 âm lịch là thời điểm vàng. Hợp hướng Nam và Đông Nam.',
    wealth: 'Tài Tinh đắc địa, Tứ Phương Tụ Tài. Tài vận hanh thông, của cải nhập môn từ nhiều nguồn. Kinh doanh phát đạt, đầu tư sinh lời cao. Nên mở rộng quy mô, đầu tư bất động sản. Màu đỏ và vàng kim mang lại đại tài.',
    love: 'Hồng Loan, Thiên Hỷ song tinh chiếu mệnh. Tình duyên viên mãn, hôn nhân hạnh phúc. Người độc thân sẽ gặp được chánh duyên, kết hôn trong năm. Người đã có đôi thêm gắn bó, sinh thêm quý tử.',
    health: 'Thọ Tinh vượng tướng, Bệnh Ách không xâm. Sức khỏe dồi dào, tinh thần phấn chấn. Khí huyết lưu thông, ngũ tạng điều hòa. Nên uống sâm, dùng yến để bồi bổ. Tập thể dục buổi sáng sớm.',
    image: ''
  },
  {
    title: '🏆 CƯỜNG THỊNH - KIM NGỌC MÃN ĐƯỜNG',
    overview: 'Quẻ Kim Ngọc Mãn Đường, đại cát vô cương. Đây là quẻ của sự giàu sang phú quý, công danh hiển hách. Năm nay phúc lộc dày dồn, tài vận dồi dào. Tổ tiên phù hộ, thần linh che chở. Mọi điều ước nguyện đều thành.',
    career: 'Văn Xương, Văn Khúc song chiếu. Công danh thăng tiến vượt bậc, địa vị cao sang. Có thể đạt chức vụ lãnh đạo, được nhiều người kính trọng. Tháng 2, 5, 8, 11 âm lịch là tháng đại cát. Hợp hướng Bắc và Tây Bắc.',
    wealth: 'Tài Bạch, Thiên Tài tam hợp. Tài vận vượng tướng, kim ngân đầy két. Kinh doanh phát tài phát lộc, đầu tư nghìn vàn sinh lợi. Nên mở rộng sang ngành nghề mới, hợp tác quốc tế. Màu vàng, tím, đỏ mang lại đại phú.',
    love: 'Phu Thê cung cát tường, Hỷ Khí dồi dào. Vợ chồng cung kính, tình nghĩa vẹn tròn. Gia đình hạnh phúc, con cháu đầy đàn. Nhà cửa tươm tất, của cải đầy kho. Được làng xóm kính trọng.',
    health: 'Phúc Lộc Thọ tam tinh chiếu mệnh. Sức khỏe dồi dào như tuổi trẻ, tinh thần minh mẫn. Ăn uống ngon miệng, ngủ ngon giấc. Nên dùng nhân sâm, linh chi, đông trùng hạ thảo để bổ dưỡng.',
    image: ''
  },
];

const FortunePage: React.FC = () => {
  const navigate = useNavigate();
  const { muted, toggleMute } = useAudioManager();
  
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.day || !formData.month || !formData.year || !formData.gender) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    // Thuật toán random có điều kiện dựa trên ngày sinh
    const seed = Number.parseInt(formData.day) + Number.parseInt(formData.month) + Number.parseInt(formData.year);
    const index = seed % FORTUNES.length;
    
    setTimeout(() => {
      setFortune(FORTUNES[index]);
      setShowResult(true);
    }, 1000);
  };

  const handleReset = () => {
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
        {!showResult ? (
          <div className="max-w-2xl w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 glow-text text-center">
              🔮 Cầu Quẻ Đầu Xuân 🔮
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-center italic">
              Thiên cơ khó lường, quẻ số định phận
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-12 text-center">
              Hãy nhập thông tin bản mệnh để Thần Tiên chỉ lối
            </p>

            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-yellow-400/30">
              {/* Date of Birth */}
              <div className="mb-8">
                <label className="block text-white text-lg font-semibold mb-4 text-center">
                  📅 Ngày Giờ Sinh (Âm Lịch hoặc Dương Lịch)
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
                <label className="block text-white text-lg font-semibold mb-4 text-center">
                  ⚖️ Âm Dương Bản Mệnh
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
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 py-4 px-8 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4 border-2 border-yellow-300"
              >
                🙏 Cầu Quẻ Đầu Xuân 🙏
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
            <div className="bg-gradient-to-br from-yellow-50 via-white to-red-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-400">
              {/* Fortune Title */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-6">🎊 ✨ 🎉</div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{color: '#D32F2F', textShadow: '0 2px 4px rgba(211,47,47,0.3)'}}>
                  {fortune?.title}
                </h2>
                <div className="text-lg md:text-xl italic" style={{color: '#666'}}>
                  「 Thiên cơ bất lộ, nhân duyên tự định 」
                </div>
              </div>

              {/* Fortune Content */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#D32F2F'}}>🌟 Tổng Quát Vận Mệnh</h3>
                  <p className="text-gray-700 text-lg leading-relaxed italic">{fortune?.overview}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#1976D2'}}>💼 Quan Lộc Sự Nghiệp</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.career}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-500">
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#388E3C'}}>💰 Tài Vận Phú Quý</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.wealth}</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-l-4 border-pink-500">
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#C2185B'}}>💕 Tình Duyên Hôn Nhân</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.love}</p>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-teal-500">
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#00796B'}}>🏥 Sức Khỏe Phúc Thọ</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{fortune?.health}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-300"
                >
                  🔄 Cầu Quẻ Lại
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-400"
                >
                  🏠 Về Trang Chủ
                </button>
              </div>
              
              {/* Fortune Disclaimer */}
              <div className="text-center mt-8 pt-6 border-t-2 border-yellow-300">
                <p className="text-sm italic" style={{color: '#888'}}>
                  ✨ Vận mệnh do trời định, phúc lành do ta tạo. Lời quẻ chỉ mang tính tham khảo, hãy luôn tích cực và nỗ lực ✨
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FortunePage;

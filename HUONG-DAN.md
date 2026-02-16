# Hướng Dẫn Hoàn Thiện Website Tết 🎊

## ✅ Đã Hoàn Thành

Website đã được xây dựng thành công với đầy đủ các tính năng:

### 🏗️ Cấu trúc hoàn chỉnh:
- ✅ Vite + React + TypeScript
- ✅ React Router cho 4 trang
- ✅ Tailwind CSS cho styling
- ✅ Hệ thống quản lý âm thanh toàn cục
- ✅ Canvas API cho hiệu ứng pháo hoa

### 📄 4 Trang chính:
1. ✅ **Trang Chủ** (/) - Đồng hồ đếm ngược, hoa tương tác, popup lời chúc
2. ✅ **Trang Pháo Hoa** (/fireworks) - Canvas animation, chuyển năm 2025→2026
3. ✅ **Trang Bốc Lì Xì** (/lixi) - 8 bao lì xì, xáo trộn ngẫu nhiên
4. ✅ **Trang Giao Quẻ** (/fortune) - Form nhập liệu, hiển thị quẻ tích cực

## 🎵 Bước Tiếp Theo: Thêm File Âm Thanh

Để website hoạt động đầy đủ, bạn cần thêm 7 file âm thanh vào `public/audio/`:

### 1. background.mp3
- **Mô tả**: Nhạc nền chung cho website
- **Yêu cầu**: Nhẹ nhàng, dễ nghe, lặp lại được
- **Gợi ý tìm kiếm**: "vietnamese new year music", "spring music", "peaceful background music"
- **Thời lượng**: 2-5 phút

### 2. fireworks-special.mp3
- **Mô tả**: Nhạc đặc biệt cho trang pháo hoa
- **Yêu cầu**: Sôi động, náo nhiệt, không lặp lại
- **Gợi ý tìm kiếm**: "celebration music", "festival music", "epic music"
- **Thời lượng**: 1-2 phút

### 3. click.mp3
- **Mô tả**: Âm thanh khi click nút
- **Yêu cầu**: Ngắn (0.1-0.3s), rõ ràng
- **Gợi ý tìm kiếm**: "button click sound", "ui click sound"

### 4. flower.mp3
- **Mô tả**: Âm thanh khi click vào hoa
- **Yêu cầu**: Nhẹ nhàng, dễ thương (0.2-0.5s)
- **Gợi ý tìm kiếm**: "bell sound", "chime sound", "magic sparkle"

### 5. lixi.mp3
- **Mô tả**: Âm thanh mở lì xì
- **Yêu cầu**: Vui tươi, ngắn (0.3-0.8s)
- **Gợi ý tìm kiếm**: "tada sound", "celebration sound", "cash register"

### 6. firework.mp3
- **Mô tả**: Âm thanh pháo hoa nổ
- **Yêu cầu**: Sắc nét, rõ ràng (0.5-1s)
- **Gợi ý tìm kiếm**: "firework explosion", "boom sound"

### 7. fortune.mp3
- **Mô tả**: Âm thanh khi xem quẻ
- **Yêu cầu**: Trang nghiêm, huyền bí (0.5-2s)
- **Gợi ý tìm kiếm**: "temple bell", "meditation bell", "zen sound"

## 🔗 Nguồn Tải Âm Thanh Miễn Phí

### Khuyến nghị nhất:
1. **Pixabay**: https://pixabay.com/sound-effects/
   - Miễn phí 100%, không cần credit
   - Chất lượng cao, đa dạng

2. **Freesound**: https://freesound.org/
   - Cộng đồng lớn, nhiều lựa chọn
   - Kiểm tra license trước khi dùng

3. **Zapsplat**: https://www.zapsplat.com/
   - Free với tài khoản đã đăng ký
   - Phân loại rõ ràng

### Khác:
- **YouTube Audio Library**: https://studio.youtube.com/
- **Free Music Archive**: https://freemusicarchive.org/
- **Incompetech**: https://incompetech.com/

## 📝 Cách Thêm File Âm Thanh

1. Tải file âm thanh về máy
2. Đổi tên file theo đúng tên yêu cầu (ví dụ: `background.mp3`)
3. Copy file vào thư mục `public/audio/`
4. Refresh trình duyệt để test

```
public/
└── audio/
    ├── background.mp3          ✅
    ├── fireworks-special.mp3   ✅
    ├── click.mp3               ✅
    ├── flower.mp3              ✅
    ├── lixi.mp3                ✅
    ├── firework.mp3            ✅
    └── fortune.mp3             ✅
```

## 🎨 Tùy Chỉnh Website (Tùy Chọn)

### Thay đổi năm đích đếm ngược:
Mở file `src/pages/HomePage.tsx`, tìm và sửa:
```tsx
const targetDate = new Date('2027-01-29T00:00:00').getTime();
```

### Thay đổi mệnh giá lì xì:
Mở file `src/pages/LixiPage.tsx`, tìm và sửa:
```tsx
const LIXI_AMOUNTS = [
  { amount: 500000, message: 'May mắn ngập tràn...', color: '#FF1493' },
  // Thêm hoặc sửa các mệnh giá
];
```

### Thay đổi màu sắc chủ đạo:
Mở file `tailwind.config.js`, tìm và sửa:
```js
colors: {
  'tet-red': '#D32F2F',    // Màu đỏ Tết
  'tet-gold': '#FFD700',   // Màu vàng kim
  'tet-yellow': '#FFC107', // Màu vàng
}
```

### Thêm lời chúc mới vào trang chủ:
Mở file `src/pages/HomePage.tsx`, tìm mảng `BLESSINGS` và thêm:
```tsx
const BLESSINGS = [
  'Chúc mừng năm mới!',
  'An khang thịnh vượng',
  // Thêm lời chúc của bạn ở đây
];
```

## 🚀 Deploy Website

### Cách 1: Vercel (Khuyến nghị - Miễn phí)

1. Tạo tài khoản tại https://vercel.com
2. Cài Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy:
   ```bash
   cd tet-website
   vercel
   ```
4. Làm theo hướng dẫn trên màn hình

### Cách 2: Netlify (Miễn phí)

1. Tạo tài khoản tại https://netlify.com
2. Drag & drop thư mục `dist` sau khi build:
   ```bash
   npm run build
   ```
3. Hoặc kết nối với GitHub repo

### Cách 3: GitHub Pages

1. Cài `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. Thêm vào `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

## 🧪 Test Website

### Desktop:
- ✅ Mở http://localhost:5173/
- ✅ Test tất cả 4 trang
- ✅ Kiểm tra âm thanh hoạt động
- ✅ Test nút bật/tắt nhạc

### Mobile:
- ✅ Mở DevTools (F12) → Toggle device toolbar
- ✅ Test responsive trên các kích thước
- ✅ Kiểm tra touch events
- ✅ Test performance

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Cannot find module '@tsparticles/react'"
```bash
npm install @tsparticles/react @tsparticles/slim @tsparticles/engine
```

### Lỗi: "Howler is not defined"
```bash
npm install howler @types/howler
```

### Âm thanh không phát:
1. Kiểm tra file có đúng tên trong `public/audio/`
2. Kiểm tra format file (phải là .mp3)
3. Thử refresh trình duyệt (Ctrl+F5)
4. Kiểm tra nút mute/unmute

### Canvas không hiển thị pháo hoa:
1. Thử refresh lại trang
2. Kiểm tra Console (F12) xem có lỗi không
3. Thử click vào ảnh để trigger animation

## 💡 Tips

- **Performance**: Tối ưu kích thước file âm thanh (128-192kbps là đủ)
- **Testing**: Test trên nhiều trình duyệt (Chrome, Firefox, Safari)
- **Mobile**: Ưu tiên test trên thiết bị thật, không chỉ DevTools
- **Audio**: Một số trình duyệt block autoplay, cần user interaction đầu tiên

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra Console (F12) để xem lỗi
2. Đọc lại README.md trong thư mục gốc
3. Kiểm tra file structure có đúng không

## 🎉 Hoàn Thành!

Sau khi thêm đủ 7 file âm thanh, website của bạn đã sẵn sàng để:
- ✨ Chia sẻ với bạn bè, người thân
- 🎊 Deploy lên internet
- 🎁 Tùy chỉnh theo ý thích
- 🔄 Tái sử dụng cho các năm sau

**Chúc mừng năm mới! 🎊🎉✨**

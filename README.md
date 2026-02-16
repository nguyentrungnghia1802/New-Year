# Website Tết 2027 🎊

Website Tết đầy đủ tính năng với 4 trang chính: Trang chủ, Pháo hoa, Bốc lì xì, và Giao quẻ.

## 🎯 Công nghệ sử dụng

- **React** + **TypeScript** - Framework và type safety
- **Vite** - Build tool nhanh và nhẹ
- **React Router** - Điều hướng giữa các trang
- **Tailwind CSS** - Styling responsive
- **Howler.js** - Quản lý âm thanh
- **Canvas API** - Hiệu ứng pháo hoa

## 📁 Cấu trúc dự án

```
tet-website/
├── src/
│   ├── components/        # Các components tái sử dụng
│   │   └── AudioControl.tsx
│   ├── contexts/          # React contexts
│   │   └── AudioContext.tsx
│   ├── pages/             # Các trang chính
│   │   ├── HomePage.tsx
│   │   ├── FireworksPage.tsx
│   │   ├── LixiPage.tsx
│   │   └── FortunePage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── audio/            # File âm thanh (cần thêm)
│       ├── background.mp3
│       ├── fireworks-special.mp3
│       ├── click.mp3
│       ├── flower.mp3
│       ├── lixi.mp3
│       ├── firework.mp3
│       └── fortune.mp3
└── package.json
```

## 🎵 File âm thanh cần thiết

Bạn cần thêm các file âm thanh sau vào thư mục `public/audio/`:

1. **background.mp3** - Nhạc nền chung cho website (nên là bài nhạc Tết nhẹ nhàng)
2. **fireworks-special.mp3** - Nhạc đặc biệt cho trang pháo hoa (bài nhạc sôi động)
3. **click.mp3** - Âm thanh khi click nút
4. **flower.mp3** - Âm thanh khi click vào hoa (tiếng chuông nhẹ)
5. **lixi.mp3** - Âm thanh mở lì xì (tiếng pháo nổ nhẹ)
6. **firework.mp3** - Âm thanh pháo nổ
7. **fortune.mp3** - Âm thanh khi xem quẻ (tiếng chuông chùa)

### Nguồn tải âm thanh miễn phí:
- [Pixabay](https://pixabay.com/sound-effects/)
- [Freesound](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)

## 🚀 Hướng dẫn chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Thêm file âm thanh vào `public/audio/`** (xem danh sách ở trên)

3. **Chạy development server:**
   ```bash
   npm run dev
   ```

4. **Build cho production:**
   ```bash
   npm run build
   ```

## 🌐 Deploy

### Vercel (Khuyến nghị)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Push thư mục dist lên GitHub Pages
```

## 📱 Tính năng

### Trang Chủ (/)
- ⏰ Đồng hồ đếm ngược đến Tết 2027
- 🌸 Hoa mai và hoa hồng tương tác
- 💬 Popup lời chúc ngẫu nhiên
- 🎯 Điều hướng đến các trang khác

### Trang Pháo Hoa (/fireworks)
- 🎆 Hiệu ứng chuyển từ 2025 → 2026
- 🎨 Canvas animation với nhiều kiểu pháo
- 🎵 Nhạc đặc biệt tự động phát
- ✨ Chữ chúc mừng fade in/out

### Trang Bốc Lì Xì (/lixi)
- 🧧 8 bao lì xì với mệnh giá ngẫu nhiên
- 🎁 Animation mở phong bao
- 💰 Hiển thị số tiền và lời chúc
- 🔄 Xáo trộn lại sau mỗi lần bốc

### Trang Giao Quẻ (/fortune)
- 📅 Form nhập ngày sinh và giới tính
- 🔮 Thuật toán tạo quẻ dựa trên ngày sinh
- ✨ Hiển thị quẻ với 5 khía cạnh
- 🎨 Giao diện đẹp mắt, dễ đọc

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa file `tailwind.config.js`:
```js
colors: {
  'tet-red': '#D32F2F',    // Màu đỏ Tết
  'tet-gold': '#FFD700',   // Màu vàng kim
  'tet-yellow': '#FFC107', // Màu vàng
}
```

### Thay đổi năm đếm ngược
Chỉnh sửa trong `src/pages/HomePage.tsx`:
```tsx
const targetDate = new Date('2027-01-29T00:00:00').getTime();
```

### Thay đổi mệnh giá lì xì
Chỉnh sửa trong `src/pages/LixiPage.tsx`:
```tsx
const LIXI_AMOUNTS = [
  { amount: 500000, message: '...', color: '#FF1493' },
  // ... các mệnh giá khác
];
```

## 🎯 Tối ưu hóa

- ✅ Responsive cho mobile và desktop
- ✅ Lazy loading cho images
- ✅ LocalStorage cho trạng thái nhạc
- ✅ Optimized Canvas rendering
- ✅ Smooth animations với CSS transitions

## 📝 License

MIT License - Tự do sử dụng và chỉnh sửa

## 💝 Credits

Được tạo với ❤️ để chúc mừng năm mới Đinh Tỵ 2027!

# New-Year

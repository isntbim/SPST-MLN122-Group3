# SPST-MLN122-Group3: Học phần Kinh tế Thị trường Định hướng XHCN tại Việt Nam

Một slide thuyết trình tương tác (Interactive Slide Deck) chất lượng cao được thiết kế nhằm nâng cao chất lượng giảng dạy và học tập chương **Kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam** (Mục 5.1). Dự án được phát triển dưới dạng ứng dụng Web SPA hiện đại sử dụng React, Tailwind CSS, và GSAP để kiến tạo các hiệu ứng tương tác trực quan sống động.

👉 **Demo Trực tiếp (Local):** [http://localhost:5173/SPST-MLN122-Group3/](http://localhost:5173/SPST-MLN122-Group3/)

---

## 🌟 Tính Năng Nổi Bật

- **11 Slide Tương Tác Sống Động:** Mỗi trang slide được thiết kế theo chủ đề lý luận riêng, có chuyển cảnh mượt mà và các hiệu ứng micro-interactions tinh tế.
- **La Bàn Chiến Lược (Slide 4):** Kích hoạt kim nam châm để hiển thị các lý do khách quan thúc đẩy mô hình phát triển kinh tế vĩ mô ở nước ta.
- **Bánh Răng Đồng Bộ LLSX & QHSX (Slide 5):** Thanh kéo tương tác trực quan cho phép "khớp nối" và vận hành hai trục động lực thị trường cốt lõi.
- **Cây Khát Vọng Việt Nam (Slide 6):** Click kích hoạt 5 quả khát vọng quốc gia (Dân giàu, Nước mạnh, Dân chủ, Công bằng, Văn minh) để xem phân tích chi tiết.
- **Đồ Thị Phóng To Trực Quan (Slide 7):** Sơ đồ mục tiêu phát triển kinh tế vĩ mô hỗ trợ zoom toàn màn hình (Click-to-Zoom Modal) và hiển thị chỉ dẫn thu hút trên hover.
- **Cán Cân Phát Triển & Công Bằng (Slide 10):** Biểu đồ cán cân tương tác mô tả trạng thái cân bằng động giữa Tích lũy kinh tế và An sinh xã hội.
- **Lộ Trình Tích Hợp 3 Cấp Độ (Slide 11):** Sơ đồ cấp độ lồng ghép công bằng xã hội trực tiếp vào từng bước đi và quy hoạch vĩ mô.
- **Hệ Thống Trắc Nghiệm Củng Cố (Mặt sau Slide):** Mỗi slide tích hợp một bộ câu hỏi ôn tập tương tác nhanh ở mặt sau. Hỗ trợ chọn lại đáp án linh hoạt (Re-answering) kèm giải thích lý luận chi tiết (Feedback).

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core:** [React](https://react.dev/) (Vite bundler)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation Engine:** [GSAP (GreenSock Animation Platform)](https://gsap.com/) & `@gsap/react`
- **Iconography:** FontAwesome v6
- **Typography:** Google Fonts (Outfit, Inter)

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Cài đặt môi trường
Đảm bảo bạn đã cài đặt Node.js (phiên bản 18 trở lên).

```bash
# Di chuyển vào thư mục dự án
cd project

# Cài đặt các thư viện phụ thuộc
npm install
```

### 2. Chạy môi trường Phát triển (Local Dev)
Khởi động Vite dev server cục bộ hỗ trợ HMR (Hot Module Replacement):

```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173/SPST-MLN122-Group3/`

### 3. Biên dịch Production Build
Đóng gói mã nguồn để deploy lên hosting tĩnh (GitHub Pages...):

```bash
npm run build
```
Bản build tĩnh sẽ nằm ở thư mục `dist/`.

---

## 📁 Cấu Trúc Mã Nguồn Chính

```text
project/
├── public/                 # Các tài nguyên tĩnh (image1.png...)
├── src/
│   ├── components/
│   │   └── PresenterStage.jsx  # Component điều phối chính chứa tất cả slide & logic tương tác
│   ├── index.css           # Cấu hình Tailwind directives & custom CSS animations
│   ├── main.jsx            # Entry point của React
│   └── App.jsx             # Component bọc ngoài cùng
├── vite.config.js          # Cấu hình Vite (base path cho GitHub Pages)
└── package.json            # Scripts & Danh sách thư viện sử dụng
```

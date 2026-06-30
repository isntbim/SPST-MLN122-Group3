import React, { useState } from 'react';
import PresenterStage from './components/PresenterStage';
import GameArena from './components/GameArena';
import MindmapModal from './components/tools/MindmapModal';
import FlashcardsModal from './components/tools/FlashcardsModal';
import ChatbotModal from './components/tools/ChatbotModal';
import IntegrityModal from './components/tools/IntegrityModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('pres');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeModal, setActiveModal] = useState(null); // 'mindmap' | 'flashcards' | 'chatbot' | 'integrity' | null
  
  const totalSlides = 10;

  // Presenter tips & estimations (mapped to current slide)
  const coachTips = {
    1: 'Giới thiệu đại diện nhóm và dẫn dắt bằng 3 câu hỏi khởi động để tạo không khí thảo luận sôi nổi cho lớp học.',
    2: 'Mục 5.1.1 (Phần 1): Trình bày định nghĩa cốt lõi. Hãy click chuyển đổi tab Phổ biến / Đặc thù để phân tích bản chất biện chứng Cái chung & Cái riêng.',
    3: 'Mục 5.1.1 (Phần 2): Trình bày 3 Cột trụ cấu thành (A, B, C - nhấn để mở chi tiết) và nêu bật tính nhân dân, lực lượng quyết định thành bại của mô hình.',
    4: 'Mục 5.1.2: Hãy nhấn chuột vào vòng tròn La bàn để kim la bàn xoay 360 độ, phát sóng radar mở rộng 3 lý do cốt lõi của tính tất yếu.',
    5: 'Mục 5.1.2: Sử dụng thanh trượt để khớp nối bánh răng Lực lượng sản xuất thực tế & Quan hệ sản xuất, đồng thời click bật 3 chỉ báo sức mạnh thị trường để kích hoạt động cơ tăng trưởng.',
    6: 'Mục 5.1.2: Tương tác trực tiếp trên Cây khát vọng. Click từng quả Dân giàu, Nước mạnh... để thuyết minh mong ước thật sự của nhân dân.',
    7: 'Tóm lược đặc trưng 1 & 2: Mục tiêu là phát triển LLSX nâng cao đời sống dân cư; Cơ cấu sở hữu bình đẳng nhưng Kinh tế nhà nước giữ vai trò then chốt.',
    8: 'Tóm lược đặc trưng 3 & 4: Vai trò điều tiết vĩ mô của Nhà nước do Đảng lãnh đạo để sửa chữa khuyết tật tự phát; Phân phối đa dạng nâng đỡ nhóm yếu thế.',
    9: 'Tóm lược đặc trưng 5 (Phần 1): Mối quan hệ gắn kết giữa tăng trưởng kinh tế với công bằng xã hội; giải thích vai trò kép của tiến bộ xã hội.',
    10: 'Tóm lược đặc trưng 5 (Phần 2): Đi sâu vào phương thức thực hiện - lồng ghép công bằng xã hội vào từng quy hoạch, chính sách vĩ mô ngay từ đầu.'
  };

  const timeEstimations = {
    1: '45 Giây',
    2: '45 Giây',
    3: '45 Giây',
    4: '60 Giây',
    5: '60 Giây',
    6: '60 Giây',
    7: '30 Giây',
    8: '30 Giây',
    9: '45 Giây',
    10: '45 Giây'
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setActiveTab('game');
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col antialiased">
      {/* === HEADER NAVIGATION === */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-vnred-800 shadow-md">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-vnred-600 p-2.5 rounded-xl text-vngold-400 border border-vngold-400/20 shadow-[0_0_15px_rgba(202,8,53,0.3)] animate-pulse">
                <i className="fa-solid fa-scale-balanced text-xl"></i>
              </div>
              <div>
                <span className="font-display font-black text-sm md:text-lg tracking-wider uppercase block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">
                  Sản phẩm Sáng tạo - Nhóm 3
                </span>
                <span className="text-[10px] md:text-xs text-slate-450 block -mt-0.5">
                  Kinh tế chính trị Mác - Lênin • Chương 5.1
                </span>
              </div>
            </div>

            <nav className="flex space-x-2 bg-slate-955 p-1.5 rounded-full border border-slate-800">
              <button 
                onClick={() => setActiveTab('pres')}
                className={`flex items-center space-x-2 px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'pres' 
                    ? 'bg-vnred-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <i className="fa-solid fa-chalkboard-user"></i>
                <span>Slide Thuyết Trình</span>
              </button>
              <button 
                onClick={() => setActiveTab('game')}
                className={`flex items-center space-x-2 px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'game' 
                    ? 'bg-vnred-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <i className="fa-solid fa-chess-knight"></i>
                <span>Đấu Trường Kinh Tế</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* === TOOLBAR & ACCESSORIES === */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs font-semibold py-2 px-4 shadow-inner flex justify-center flex-wrap gap-4 z-20">
        <button 
          onClick={() => setActiveModal('mindmap')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-vngold-400/50 rounded-lg text-slate-350 hover:text-vngold-400 transition-all"
        >
          <i className="fa-solid fa-sitemap text-vngold-400"></i>
          <span>Sơ đồ tư duy (Mindmap)</span>
        </button>
        <button 
          onClick={() => setActiveModal('flashcards')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-vnemerald-500/50 rounded-lg text-slate-355 hover:text-vnemerald-500 transition-all"
        >
          <i className="fa-solid fa-rectangle-list text-vnemerald-500"></i>
          <span>Thẻ ghi nhớ (Flashcards)</span>
        </button>
        <button 
          onClick={() => setActiveModal('chatbot')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-vnred-500/50 rounded-lg text-slate-355 hover:text-vnred-500 transition-all"
        >
          <i className="fa-solid fa-comments text-vnred-500"></i>
          <span>Trợ lý Phản biện AI</span>
        </button>
        <button 
          onClick={() => setActiveModal('integrity')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-lg text-slate-450 hover:text-slate-200 transition-all"
        >
          <i className="fa-solid fa-signature"></i>
          <span>Liêm chính học thuật</span>
        </button>
      </div>

      {/* === MAIN CONTENT === */}
      <main className="flex-grow flex flex-col max-w-[1650px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'pres' ? (
          <section className="flex-grow flex flex-col xl:flex-row gap-6 w-full">
            {/* Sidebar list & tips */}
            <div className="flex flex-col justify-start space-y-4 xl:w-72 flex-shrink-0">
              <div className="glass-panel rounded-3xl p-5 border border-slate-800 shadow-xl bg-slate-900">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                  <i className="fa-solid fa-bars-staggered mr-1.5 text-vngold-400"></i>Mục lục Slide
                </h3>
                <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                  {[
                    '1. Trang bìa & Khảo sát',
                    '2. 5.1.1 Khái niệm: Định nghĩa & Bản chất',
                    '3. 5.1.1 Khái niệm: Cấu thành & Lực lượng',
                    '4. 5.1.2 Tất yếu (La bàn)',
                    '5. 5.1.2 Tất yếu (Động lực kép)',
                    '6. 5.1.2 Tất yếu (Cây Khát vọng)',
                    '7. Đặc trưng: Mục tiêu & Sở hữu',
                    '8. Đặc trưng: Quản lý & Phân phối',
                    '9. Đặc trưng: Tăng trưởng & Cân bằng (P1)',
                    '10. Đặc trưng: Tăng trưởng & Cân bằng (P2)'
                  ].map((title, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx + 1)}
                      className={`text-left w-full p-3 rounded-xl text-xs sm:text-sm transition-all duration-200 border-l-4 ${
                        currentSlide === idx + 1
                          ? 'border-vnred-600 bg-vnred-950/40 text-vnred-200 font-bold'
                          : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presenter Guidelines */}
              <div className="bg-gradient-to-br from-slate-900 to-vnred-950/70 border border-vnred-900/50 p-5 rounded-3xl shadow-xl flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-vngold-400 uppercase tracking-widest flex items-center">
                      <i className="fa-regular fa-lightbulb mr-1.5 animate-bounce text-vngold-400"></i>Gợi ý Người Thuyết Trình:
                    </p>
                    <span className="text-[10px] bg-vnred-900/60 border border-vnred-700 text-vnred-200 px-2 py-0.5 rounded-full font-bold">
                      Giới hạn: 4 Phút
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-350">
                    {coachTips[currentSlide]}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">Thời gian ước tính:</span>
                  <span className="text-xs font-black text-vngold-400">{timeEstimations[currentSlide]}</span>
                </div>
              </div>
            </div>

            {/* Slide Stage Screen */}
            <div className="flex-grow flex flex-col justify-between">
              <PresenterStage 
                currentSlide={currentSlide} 
                onSlideChange={setCurrentSlide}
              />

              {/* Slide Navigation controls */}
              <div className="flex items-center justify-between pt-4 mt-4 z-10">
                <button 
                  disabled={currentSlide === 1}
                  onClick={handlePrevSlide}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                  <span>Trước đó</span>
                </button>
                <div className="text-xs text-slate-400 font-bold block lg:hidden">
                  Slide {currentSlide}/8
                </div>
                <button 
                  onClick={handleNextSlide}
                  className="px-5 py-2.5 bg-vnred-600 hover:bg-vnred-700 border border-vnred-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-vnred-950/20 transition-all flex items-center space-x-1.5"
                >
                  {currentSlide === totalSlides ? (
                    <>
                      <span>Trải nghiệm Game!</span>
                      <i className="fa-solid fa-gamepad"></i>
                    </>
                  ) : (
                    <>
                      <span>Tiếp theo</span>
                      <i className="fa-solid fa-chevron-right"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        ) : (
          <GameArena onSwitchToPres={() => setActiveTab('pres')} />
        )}
      </main>

      {/* === FOOTER === */}
      <footer className="bg-slate-900 text-slate-500 py-6 border-t border-slate-850 text-center text-xs">
        <div className="max-w-[1650px] mx-auto px-4">
          <p className="mb-1.5 font-semibold text-slate-400">© 2026 - Dự án Sản phẩm Sáng tạo Nhóm. Bộ môn Lý luận Chính trị.</p>
          <p className="text-[10px] text-slate-600">Ứng dụng EdTech tương tác phục vụ giảng dạy lý luận Kinh tế Chính trị Mác - Lênin (Học phần 5.1.2)</p>
        </div>
      </footer>

      {/* === ACCESSORY MODALS === */}
      <MindmapModal 
        isOpen={activeModal === 'mindmap'} 
        onClose={() => setActiveModal(null)} 
      />
      <FlashcardsModal 
        isOpen={activeModal === 'flashcards'} 
        onClose={() => setActiveModal(null)} 
      />
      <ChatbotModal 
        isOpen={activeModal === 'chatbot'} 
        onClose={() => setActiveModal(null)} 
      />
      <IntegrityModal 
        isOpen={activeModal === 'integrity'} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
}

import React, { useState } from 'react';

export default function FlashcardsModal({ isOpen, onClose }) {
  const [flipped, setFlipped] = useState({
    1: false,
    2: false,
    3: false,
    4: false
  });

  if (!isOpen) return null;

  const toggleFlip = (id) => {
    setFlipped(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const cards = [
    {
      id: 1,
      section: 'Học phần 5.1.1',
      title: 'KTTT định hướng XHCN',
      back: 'Là nền kinh tế vận hành đầy đủ, đồng bộ theo quy luật thị trường, có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo để hướng tới xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh.'
    },
    {
      id: 2,
      section: 'Học phần 5.1.2',
      title: 'Tính tất yếu khách quan',
      back: 'Lựa chọn mô hình này là tất yếu do quy luật khách quan của thời kỳ quá độ (Một là), do tính ưu việt của cơ chế thị trường thúc đẩy sức sản xuất (Hai là), và phù hợp với nguyện vọng chung của nhân dân (Ba là).'
    },
    {
      id: 3,
      section: 'Học phần 5.1.3',
      title: 'Sở hữu & Vai trò chủ đạo',
      back: 'Kinh tế Nhà nước giữ vai trò chủ đạo, dẫn dắt các thành phần kinh tế khác, trong khi Kinh tế Tư nhân là động lực quan trọng thúc đẩy cạnh tranh và giải phóng các tiềm năng nội lực xã hội.'
    },
    {
      id: 4,
      section: 'Học phần 5.1.3',
      title: 'Tăng trưởng & Công bằng',
      back: 'Thuộc tính bản chất nhất quán của mô hình, yêu cầu gắn tăng trưởng kinh tế với tiến bộ xã hội ngay trong từng bước đi và từng chính sách, không chờ kinh tế phát triển cao mới phân phối.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 shadow-2xl flex flex-col justify-between max-h-[90vh] bg-slate-900 border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
          <h3 className="font-display font-black text-lg text-vnemerald-500 flex items-center">
            <i className="fa-solid fa-rectangle-list mr-2"></i>Thẻ từ khóa học thuật (Flashcards)
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-auto p-2 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[60vh]">
          {cards.map(card => (
            <div 
              key={card.id} 
              className={`flip-card h-44 cursor-pointer ${flipped[card.id] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(card.id)}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front bg-slate-950 border border-slate-800 p-5 flex flex-col justify-between items-center rounded-3xl hover:border-vnemerald-500/40 transition-colors">
                  <span className="text-[10px] uppercase font-bold text-vnred-500 tracking-wider">{card.section}</span>
                  <h4 className="text-base font-extrabold text-slate-200 my-auto">{card.title}</h4>
                  <span className="text-[10px] text-slate-500 flex items-center">
                    <i className="fa-solid fa-arrows-rotate mr-1"></i>Bấm để xem mặt sau
                  </span>
                </div>
                {/* Back Side */}
                <div className="flip-card-back bg-gradient-to-br from-slate-950 to-vnemerald-950/20 border border-vnemerald-900/30 p-5 flex flex-col justify-center items-center rounded-3xl">
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-left">
                    {card.back}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-slate-850 hover:bg-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-700">
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
}

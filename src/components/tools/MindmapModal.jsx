import React, { useState } from 'react';
import gsap from 'gsap';

export default function MindmapModal({ isOpen, onClose }) {
  const [detailText, setDetailText] = useState(
    'Chọn một nút sơ đồ tư duy phía trên để đọc nội dung cốt lõi của bài học.'
  );

  if (!isOpen) return null;

  const data = {
    root: '<strong>Chương 5.1:</strong> Trọng tâm phân tích cấu trúc vĩ mô của nền KTTT định hướng XHCN tại Việt Nam, lý giải tại sao sự kết hợp này là khách quan lịch sử và các đặc trưng cốt lõi.',
    511: '<strong>Mục 5.1.1 Khái niệm:</strong> Nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật thị trường, chịu sự điều tiết của Nhà nước pháp quyền xã hội chủ nghĩa do Đảng Cộng sản lãnh đạo.',
    512: '<strong>Mục 5.1.2 Tính tất yếu:</strong> [Trọng tâm Slide 3, 4, 5]: Sự phát triển do 3 mốc: Quy luật khách quan của thời kỳ quá độ (Một là), Tính ưu việt giải phóng năng suất của thị trường (Hai là), và Nguyện vọng ấm no của nhân dân (Ba là).',
    '513a': '<strong>5.1.3 (Mục tiêu & Sở hữu):</strong> Mục tiêu giải phóng LLSX vì CNXH. Cơ cấu nhiều thành phần kinh tế, trong đó Kinh tế Nhà nước chủ đạo bảo vệ định hướng, Kinh tế tư nhân là động lực quan trọng.',
    '513b': '<strong>5.1.3 (Quản lý & Phân phối):</strong> Quản lý bởi Nhà nước pháp quyền XHCN dưới Đảng lãnh đạo. Phân phối đa dạng theo lao động, đóng góp vốn và an sinh phúc lợi xã hội.',
    '513c': '<strong>5.1.3 (Tăng trưởng & Công bằng):</strong> Thực hiện tiến bộ xã hội ngay trong từng bước đi và từng chính sách, coi công bằng vừa là mục tiêu và là điều kiện để phát triển bền vững.'
  };

  const focusNode = (nodeType) => {
    setDetailText(data[nodeType]);
    
    // Animate detail box highlight
    gsap.fromTo('#mindmap-detail-box', 
      { backgroundColor: 'rgba(202, 8, 53, 0.15)' },
      { backgroundColor: 'rgba(15, 23, 42, 1)', duration: 0.8 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-4xl rounded-3xl p-6 shadow-2xl flex flex-col justify-between max-h-[90vh] bg-slate-900 border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
          <h3 className="font-display font-black text-lg text-vngold-400 flex items-center">
            <i className="fa-solid fa-sitemap mr-2"></i>Sơ đồ tư duy Chương 5.1
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-auto p-4 bg-slate-950 rounded-2xl border border-slate-850 min-h-[350px] flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl p-4 text-center">
            <svg viewBox="0 0 300 160" className="w-full max-w-2xl mx-auto select-none">
              {/* Connecting Paths */}
              <path d="M150,80 Q100,50 60,35" fill="none" stroke="#ca0835" strokeWidth="1.5" strokeDasharray="2,2"/>
              <path d="M150,80 H50" fill="none" stroke="#d97706" strokeWidth="1.5"/>
              <path d="M150,80 Q100,110 60,125" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="2,2"/>
              <path d="M150,80 Q200,50 240,35" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,2"/>
              <path d="M150,80 Q200,110 240,125" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,2"/>
              
              {/* Core root node */}
              <g onClick={() => focusNode('root')} className="cursor-pointer group">
                <rect x="110" y="68" width="80" height="24" rx="12" fill="#ca0835" stroke="#fbbf24" strokeWidth="1.5" className="group-hover:stroke-white transition-all"/>
                <text x="150" y="82.5" fontSize="6.5" fontWeight="900" fill="#ffffff" textAnchor="middle">CHƯƠNG 5.1: KTTT XHCN</text>
              </g>

              {/* Branch 1 (5.1.1) */}
              <g onClick={() => focusNode('511')} className="cursor-pointer group">
                <rect x="10" y="23" width="50" height="18" rx="6" fill="#1e293b" stroke="#ca0835" strokeWidth="1" className="group-hover:stroke-white transition-all"/>
                <text x="35" y="33.5" fontSize="5" fill="#f8fafc" fontWeight="bold" textAnchor="middle">5.1.1 Khái niệm</text>
              </g>

              {/* Branch 2 (5.1.2) - Core active */}
              <g onClick={() => focusNode('512')} className="cursor-pointer group">
                <rect x="5" y="71" width="45" height="18" rx="6" fill="#7f1d1d" stroke="#fbbf24" strokeWidth="1.2" className="group-hover:stroke-white transition-all"/>
                <text x="27.5" y="81.5" fontSize="5" fill="#fbbf24" fontWeight="bold" textAnchor="middle">5.1.2 Tất yếu</text>
              </g>

              {/* Branch 3 (5.1.3 Pt A) */}
              <g onClick={() => focusNode('513a')} className="cursor-pointer group">
                <rect x="10" y="116" width="50" height="18" rx="6" fill="#1e293b" stroke="#059669" strokeWidth="1" className="group-hover:stroke-white transition-all"/>
                <text x="35" y="126.5" fontSize="5" fill="#f8fafc" fontWeight="bold" textAnchor="middle">Mục tiêu &amp; Sở hữu</text>
              </g>

              {/* Branch 4 (5.1.3 Pt B) */}
              <g onClick={() => focusNode('513b')} className="cursor-pointer group">
                <rect x="235" y="26" width="55" height="18" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" className="group-hover:stroke-white transition-all"/>
                <text x="262.5" y="36.5" fontSize="5" fill="#cbd5e1" fontWeight="bold" textAnchor="middle">Quản lý &amp; Phân phối</text>
              </g>

              {/* Branch 5 (5.1.3 Pt C) */}
              <g onClick={() => focusNode('513c')} className="cursor-pointer group">
                <rect x="235" y="116" width="55" height="18" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" className="group-hover:stroke-white transition-all"/>
                <text x="262.5" y="126.5" fontSize="5" fill="#cbd5e1" fontWeight="bold" textAnchor="middle">Tăng trưởng &amp; Công bằng</text>
              </g>
            </svg>
            
            <div id="mindmap-detail-box" className="mt-6 p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-350 min-h-[60px] text-left transition-colors duration-300" dangerouslySetInnerHTML={{ __html: detailText }} />
          </div>
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

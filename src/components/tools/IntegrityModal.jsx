import React from 'react';

export default function IntegrityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 shadow-2xl flex flex-col justify-between max-h-[85vh] bg-slate-900 border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
          <h3 className="font-display font-black text-base text-slate-300 flex items-center">
            <i className="fa-solid fa-signature mr-2 text-slate-400"></i>Liêm chính học thuật &amp; Tài liệu
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-200 mb-1">1. Cam kết liêm chính học thuật</h4>
            <p>
              Sản phẩm EdTech này tuân thủ các nguyên tắc liêm chính học thuật trong nghiên cứu và giảng dạy lý luận chính trị. Mọi thông tin cốt lõi đều được đối chiếu trực tiếp từ Giáo trình Kinh tế Chính trị Mác - Lênin của Bộ Giáo dục và Đào tạo Việt Nam.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-1">2. Sử dụng Trí tuệ Nhân tạo (AI) có trách nhiệm</h4>
            <p>
              Trí tuệ nhân tạo được sử dụng hỗ trợ lập trình giao diện trực quan và cấu trúc hóa kịch bản phản biện, đảm bảo không bóp méo, dịch sai hoặc làm sai lệch tư tưởng cốt lõi của nội dung bài học.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-1">3. Danh mục tài liệu tham khảo chính</h4>
            <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px] sm:text-xs">
              <li>Giáo trình Kinh tế chính trị Mác - Lênin (Chương 5).</li>
              <li>Tài liệu số hóa bài giảng nhóm: <span className="font-bold text-slate-350">main-knowledge/Chương 5.1.md</span>.</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-slate-850 hover:bg-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-700">
            Tôi đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}

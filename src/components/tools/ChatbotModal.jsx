import React, { useState, useRef, useEffect } from 'react';

export default function ChatbotModal({ isOpen, onClose }) {
  const [logs, setLogs] = useState([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ lý phản biện được thiết kế riêng cho Chương 5.1. Dưới sự chỉ dẫn của bạn, tôi sẽ giúp bạn ứng phó với các câu hỏi chất vấn khó của bạn học hoặc ban giám khảo một cách bình tĩnh, chuẩn xác. Hãy chọn một câu hỏi phản biện dưới đây hoặc nhập câu hỏi!'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isTyping]);

  if (!isOpen) return null;

  const chatbotPresets = {
    1: {
      q: 'Tại sinh kinh tế thị trường lại đi đôi với định hướng XHCN? Liệu có mâu thuẫn không?',
      a: '<strong>Trả lời (Quyết đoán & Trọng tâm):</strong> Hoàn toàn không mâu thuẫn. Kinh tế thị trường đóng vai trò là phương thức, công cụ vĩ mô tối ưu để giải phóng và phát triển lực lượng sản xuất xã hội. Còn định hướng XHCN là mục tiêu chính trị xã hội mang tính nhân văn, bảo đảm mọi thành quả tăng trưởng đều quay lại phục vụ cuộc sống của đông đảo nhân dân lao động thay vì chỉ tích lũy tư bản tối đa cho một nhóm nhỏ tư nhân. Sự kết hợp biện chứng này lấy năng suất thị trường làm động lực và lấy công bằng xã hội làm mục tiêu chỉ đạo.'
    },
    2: {
      q: 'Kinh tế Nhà nước đóng vai trò chủ đạo có bóp nghẹt sự phát triển của Kinh tế tư nhân hay không?',
      a: '<strong>Trả lời (Khách quan & Khoa học):</strong> Không hề bóp nghẹt mà ngược lại đóng vai trò bệ đỡ. Kinh tế Nhà nước tập trung vào các hạ tầng xương sống thiết yếu, đầu tư các dự án công cộng rủi ro cao nhưng tối quan trọng mà tư nhân không thể hoặc không muốn làm (như mạng lưới điện, an ninh quốc phòng, giao thông trọng điểm). Việc này tạo ra một hệ sinh thái hạ tầng ổn định giúp Kinh tế Tư nhân yên tâm đầu tư, cạnh tranh bình đẳng lành mạnh. Tư nhân là động lực năng động quan trọng, còn Nhà nước đóng vai trò chủ đạo mở đường và bảo hộ.'
    },
    3: {
      q: 'Nếu cơ chế thị trường đã tự điều tiết rất tốt rồi, tại sao Nhà nước cần phải can thiệp sâu như thế?',
      a: '<strong>Trả lời (Thuyết phục & Thực tiễn):</strong> Cơ chế thị trường tự do tuyệt đối luôn có những khuyết tật bản chất không thể tự khắc phục: như khủng hoảng kinh tế chu kỳ, phân hóa giàu nghèo cực đoan dẫn đến xung đột xã hội, độc quyền tư nhân bóc lột người tiêu dùng, hủy hoại môi trường sinh thái. Sự điều tiết vĩ mô của Nhà nước pháp quyền xã hội chủ nghĩa chính là công cụ chốt chặn giúp giảm thiểu phân hóa giàu nghèo, sửa chữa các thất bại thị trường và nâng đỡ nhóm người lao động yếu thế, bảo đảm phát triển bền vững.'
    }
  };

  const handlePreset = (id) => {
    const preset = chatbotPresets[id];
    setLogs(prev => [...prev, { sender: 'user', text: preset.q }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setLogs(prev => [...prev, { sender: 'ai', text: preset.a }]);
    }, 1000);
  };

  const handleSend = () => {
    const query = inputText.trim();
    if (!query) return;

    setInputText('');
    setLogs(prev => [...prev, { sender: 'user', text: query }]);
    setIsTyping(true);

    let response = 'Tôi đã ghi nhận câu hỏi phản biện của bạn. Trên tinh thần lý luận của Chương 5, mọi chính sách kinh tế Việt Nam đều hướng đến mục tiêu cao nhất là giải phóng lực lượng sản xuất kết hợp bảo đảm tiến bộ xã hội. Hãy đối chiếu các luận cứ trong các Slide để có câu trả lời chuẩn xác nhất với thực tiễn giảng dạy.';
    
    const lq = query.toLowerCase();
    if (lq.includes('vốn') || lq.includes('phân phối')) {
      response = '<strong>Trả lời học thuật:</strong> Quan hệ phân phối bị quyết định bởi quan hệ sở hữu về tư liệu sản xuất. Ở nước ta, do đa hình thức sở hữu nên thực hiện phân phối đa dạng (theo lao động, theo hiệu quả kinh tế, đóng góp vốn và an sinh phúc lợi). Trong đó, phân phối theo lao động và phúc lợi chính là trụ cột phản ánh bản chất XHCN.';
    } else if (lq.includes('sở hữu') || lq.includes('tư nhân')) {
      response = '<strong>Trả lời học thuật:</strong> Nền kinh tế nước ta có nhiều hình thức sở hữu, nhiều thành phần kinh tế. Trong đó, Kinh tế Nhà nước đóng vai trò chủ đạo, còn Kinh tế Tư nhân được coi trọng là một động lực quan trọng của nền kinh tế. Sự liên kết này bình đẳng trước pháp luật, cạnh tranh và hợp tác cùng có lợi.';
    } else if (lq.includes('đảng') || lq.includes('chính trị')) {
      response = '<strong>Trả lời học thuật:</strong> Đảng Cộng sản Việt Nam giữ vai trò lãnh đạo toàn diện nền kinh tế thông qua đường lối, cương lĩnh và chủ trương lớn. Đây là nhân tố quyết định chốt chặn bảo đảm nền kinh tế thị trường vận hành đúng định hướng xã hội chủ nghĩa, phục vụ vì lợi ích tối cao của nhân dân.';
    }

    setTimeout(() => {
      setIsTyping(false);
      setLogs(prev => [...prev, { sender: 'ai', text: response }]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 shadow-2xl flex flex-col justify-between h-[85vh] bg-slate-900 border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
          <h3 className="font-display font-black text-base text-vnred-500 flex items-center">
            <i className="fa-solid fa-comments mr-2"></i>Trợ lý Phản biện &amp; QA Học thuật
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        {/* Chat window */}
        <div 
          ref={scrollRef} 
          className="flex-grow overflow-y-auto p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-4 min-h-[250px] text-xs sm:text-sm flex flex-col"
        >
          {logs.map((log, index) => (
            <div 
              key={index} 
              className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                log.sender === 'user' 
                  ? 'bg-slate-800 border border-slate-700/60 text-slate-100 self-end ml-auto text-right' 
                  : 'bg-slate-900 border border-slate-800 text-slate-300'
              }`}
              dangerouslySetInnerHTML={{ __html: log.text }}
            />
          ))}
          {isTyping && (
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl max-w-[50%] text-slate-500 italic animate-pulse">
              Trợ lý đang soạn phản hồi...
            </div>
          )}
        </div>

        {/* Preset prompts */}
        <div className="mt-4 flex flex-col gap-2">
          <button 
            onClick={() => handlePreset(1)} 
            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-vnred-600/30 text-[10px] sm:text-xs text-slate-350 hover:text-slate-100 rounded-xl text-left w-full transition-colors"
          >
            ❓ Tại sao KTTT lại đi đôi với XHCN? Liệu có mâu thuẫn?
          </button>
          <button 
            onClick={() => handlePreset(2)} 
            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-vnred-600/30 text-[10px] sm:text-xs text-slate-355 hover:text-slate-100 rounded-xl text-left w-full transition-colors"
          >
            ❓ Vai trò chủ đạo của KT Nhà nước có bóp nghẹt KT tư nhân?
          </button>
          <button 
            onClick={() => handlePreset(3)} 
            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-vnred-600/30 text-[10px] sm:text-xs text-slate-355 hover:text-slate-100 rounded-xl text-left w-full transition-colors"
          >
            ❓ Tại sao Nhà nước cần can thiệp sâu thay vì để thị trường tự do?
          </button>
        </div>
        
        {/* Custom Input */}
        <div className="mt-4 flex space-x-2 border-t border-slate-800/80 pt-3">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi phản biện của bạn..." 
            className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-vnred-600"
          />
          <button 
            onClick={handleSend} 
            className="px-4.5 bg-vnred-600 hover:bg-vnred-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all border border-vnred-500"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

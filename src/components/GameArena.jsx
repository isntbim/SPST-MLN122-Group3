import React, { useState } from 'react';

export default function GameArena({ onSwitchToPres }) {
  const [score, setScore] = useState({ gdp: 50, xhcn: 50, welfare: 50, trust: 50 });
  const [step, setStep] = useState(0); // 0 = Start, 1..5 = playing, 6 = End
  const [feedback, setFeedback] = useState('');
  const [locked, setLocked] = useState(false);

  const gameQuestions = {
    1: {
      category: '1. Bối cảnh Đổi mới & Tính tất yếu khách quan',
      text: 'Trước năm 1986, nền kinh tế Việt Nam vận hành theo cơ chế kế hoạch hóa tập trung bao cấp gặp nhiều khó khăn, kìm hãm sức sản xuất. Để giải quyết, bạn quyết định hành động vĩ mô:',
      choices: [
        {
          text: 'Giữ nguyên cơ chế cũ, tăng cường bao cấp trợ giá để duy trì ổn định xã hội tối đa.',
          feedback: 'Thất bại! Cơ chế bao cấp kìm hãm sản xuất, triệt tiêu động lực cạnh tranh khiến đất nước lún sâu vào khủng hoảng vĩ mô.',
          stats: { gdp: -15, xhcn: 0, welfare: -10, trust: -15 }
        },
        {
          text: 'Khởi xướng đổi mới, chuyển dịch sang nền kinh tế thị trường định hướng XHCN nhiều thành phần.',
          feedback: 'Quyết sách lịch sử xuất sắc! Giải phóng hoàn toàn sức sản xuất, khơi dậy tiềm năng kinh doanh của toàn dân.',
          stats: { gdp: 20, xhcn: 10, welfare: 10, trust: 20 }
        },
        {
          text: 'Tự do hóa tuyệt đối nền kinh tế vĩ mô theo mô hình tư bản, xóa bỏ hoàn toàn vai trò của Nhà nước.',
          feedback: 'Cảnh báo! GDP tăng nhanh nhưng mất kiểm soát định hướng chính trị, chênh lệch giàu nghèo gia tăng cực đoan.',
          stats: { gdp: 25, xhcn: -30, welfare: -20, trust: -10 }
        }
      ]
    },
    2: {
      category: '2. Quy luật khách quan & Quan hệ sản xuất',
      text: 'Theo Quy luật khách quan (Một là), quan hệ sản xuất phải phù hợp trình độ lực lượng sản xuất. Hiện nay LLSX ở Việt Nam còn nhiều tầng nấc từ thủ công tới hiện đại. Bạn điều chỉnh cơ cấu thế nào?',
      choices: [
        {
          text: 'Nóng vội đưa tất cả các cơ sở sản xuất tư nhân vào công hữu quốc doanh lập tức.',
          feedback: 'Quy luật phản ứng! Quan hệ sản xuất đi quá xa so với trình độ LLSX lạc hậu thực tế sẽ triệt tiêu động lực làm việc của nhân dân.',
          stats: { gdp: -20, xhcn: 10, welfare: -10, trust: -15 }
        },
        {
          text: 'Phát triển đa dạng các thành phần kinh tế, thừa nhận đa hình thức sở hữu tương ứng với thực tế.',
          feedback: 'Chính xác! Đa dạng hóa sở hữu giúp huy động mọi nguồn lực phát triển sản xuất quốc gia.',
          stats: { gdp: 15, xhcn: 10, welfare: 10, trust: 15 }
        },
        {
          text: 'Chỉ phát triển duy nhất kinh tế tư nhân độc quyền, xóa bỏ hoàn toàn vai trò điều tiết công cộng.',
          feedback: 'Sai lầm! Mất đi vai trò chủ đạo của Nhà nước, khiến nền kinh tế dễ bị tổn thương trước khủng hoảng ngoại biên.',
          stats: { gdp: 15, xhcn: -25, welfare: -10, trust: -5 }
        }
      ]
    },
    3: {
      category: '3. Tính ưu việt của Sức mạnh thị trường',
      text: 'Để phát huy "tính ưu việt của thị trường" (Hai là), thúc đẩy cạnh tranh lành mạnh và tối ưu hóa nguồn tài nguyên vĩ mô, giải pháp phân bổ của bạn là:',
      choices: [
        {
          text: 'Nhà nước áp đặt giá trần, giá sàn cứng nhắc cho tất cả mọi mặt hàng tiêu dùng trên thị trường.',
          feedback: 'Trái quy luật! Tiêu diệt động cơ sản xuất của người cung cấp, dẫn đến hiện tượng đầu cơ gom hàng và thị trường đen.',
          stats: { gdp: -15, xhcn: 5, welfare: -10, trust: -15 }
        },
        {
          text: 'Tôn trọng các quy luật cung cầu, cạnh tranh tự do, đồng thời giữ vững kiểm soát vĩ mô của Nhà nước.',
          feedback: 'Đúng đắn! Phát huy năng lực tự điều phối tài nguyên của thị trường để nâng cao hiệu suất kinh doanh vĩ mô.',
          stats: { gdp: 20, xhcn: 10, welfare: 10, trust: 15 }
        },
        {
          text: 'Cho phép các tập đoàn tư nhân lớn tự do liên kết độc quyền, thao túng giá cả thị trường tùy ý.',
          feedback: 'Hiểm họa độc quyền! Đầu cơ lũng đoạn xuất hiện gây thiệt hại nặng nề cho người lao động bình dân.',
          stats: { gdp: 10, xhcn: -20, welfare: -15, trust: -10 }
        }
      ]
    },
    4: {
      category: '4. Đồng thuận Nguyện vọng Nhân dân',
      text: 'Mô hình phải đáp ứng khao khát của nhân dân (Ba là) về "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh". Khi cân đối các nguồn lực quốc gia, bạn ưu tiên:',
      choices: [
        {
          text: 'Tập trung 100% tài chính vào mục tiêu GDP, dời lại việc chi trả an sinh xã hội vào thế hệ sau.',
          feedback: 'Mất cân đối! Tăng trưởng thiếu bền vững, bất bình đẳng tăng cao dẫn đến xung đột xã hội nghiêm trọng.',
          stats: { gdp: 20, xhcn: -15, welfare: -20, trust: -15 }
        },
        {
          text: 'Gắn tăng trưởng kinh tế chặt chẽ với công bằng xã hội ngay trong từng chính sách phát triển.',
          feedback: 'Tuyệt hảo! Thực hiện đúng bản chất XHCN, nhận được sự đồng thuận và lòng tin vững chắc của toàn dân.',
          stats: { gdp: 15, xhcn: 15, welfare: 20, trust: 20 }
        },
        {
          text: 'Áp dụng chính sách bình quân cào bằng, chia đều nguồn lực tài sản bất kể năng lực đóng góp.',
          feedback: 'Trì trệ! Bình quân chủ nghĩa cào bằng triệt tiêu động lực phấn đấu làm giàu chính đáng của cá nhân.',
          stats: { gdp: -15, xhcn: 5, welfare: 5, trust: -10 }
        }
      ]
    },
    5: {
      category: '5. Đặc trưng Sở hữu & Thành phần chủ đạo',
      text: 'Kinh tế Nhà nước đóng vai trò chủ đạo trong nền kinh tế nhiều thành phần. Để phát huy vai trò dẫn dắt này mà không làm giảm tính năng động của các thành phần khác, bạn chỉ thị:',
      choices: [
        {
          text: 'Quốc hữu hóa và đóng cửa toàn bộ doanh nghiệp tư nhân để nhà nước kiểm soát 100% thị trường sản xuất.',
          feedback: 'Sai lầm nghiêm trọng! Loại bỏ kinh tế tư nhân làm triệt tiêu tính năng động sáng tạo của thị trường.',
          stats: { gdp: -25, xhcn: 5, welfare: -10, trust: -20 }
        },
        {
          text: 'Kinh tế Nhà nước nắm giữ các ngành hạ tầng then chốt, huyết mạch quốc gia; đồng thời tạo môi trường công bằng hỗ trợ tư nhân.',
          feedback: 'Định hướng chính xác! Kinh tế nhà nước đóng vai trò bệ đỡ, dẫn dắt vĩ mô tạo khoảng không cho các thành phần khác phát triển lành mạnh.',
          stats: { gdp: 20, xhcn: 15, welfare: 15, trust: 20 }
        },
        {
          text: 'Bán sạch toàn bộ tài sản và cổ phần hóa các doanh nghiệp nhà nước trong các ngành quốc phòng, an ninh cốt lõi.',
          feedback: 'Nguy hiểm! Nhà nước tự tước bỏ công cụ vĩ mô, mất khả năng tự chủ kinh tế quốc phòng trước biến động thế giới.',
          stats: { gdp: 10, xhcn: -30, welfare: -15, trust: -10 }
        }
      ]
    }
  };

  const handleSelectChoice = (choice) => {
    if (locked) return;
    setLocked(true);
    setFeedback(choice.feedback);

    // Update stats with clamp
    setScore(prev => {
      const next = {};
      for (let k in prev) {
        next[k] = Math.max(0, Math.min(100, prev[k] + choice.stats[k]));
      }
      return next;
    });

    setTimeout(() => {
      setFeedback('');
      setLocked(false);
      setStep(prev => prev + 1);
    }, 3500);
  };

  const startGame = () => {
    setScore({ gdp: 50, xhcn: 50, welfare: 50, trust: 50 });
    setStep(1);
    setFeedback('');
  };

  // Rank calc
  const getRank = () => {
    const avg = (score.gdp + score.xhcn + score.welfare + score.trust) / 4;
    if (avg >= 75) return 'Nhà Kiến tạo Vĩ mô Xuất sắc';
    if (avg >= 60) return 'Chuyên viên Hoạch định Cao cấp';
    if (avg < 40) return 'Nhà Quản trị Khủng hoảng';
    return 'Ủy viên Tập sự';
  };

  const getEndScorecard = () => {
    const avg = (score.gdp + score.xhcn + score.welfare + score.trust) / 4;
    if (avg >= 75) {
      return {
        title: 'Vinh danh Lãnh đạo Kiệt xuất!',
        badge: 'Nhà kiến tạo vĩ mô xuất sắc',
        feedback: 'Chúc mừng! Bạn đã hoàn thành xuất sắc nhiệm kỳ của mình. Nền kinh tế tăng trưởng mạnh mẽ, định hướng chính trị xã hội vững chắc, an sinh xã hội bảo đảm và lòng tin nhân dân tuyệt đối. Đây chính là minh chứng sống động của sự vận dụng chuẩn xác tư duy Chương 5.'
      };
    } else if (avg >= 55) {
      return {
        title: 'Hoàn thành nhiệm vụ điều hành!',
        badge: 'Nhà kỹ trị thực tiễn',
        feedback: 'Nhiệm kỳ của bạn ghi nhận nhiều thành tựu tăng trưởng tốt. Tuy nhiên, đôi lúc bạn còn đưa ra quyết sách chưa thực sự cân bằng giữa phát triển tự do kinh tế và phân phối công bằng. Hãy tiếp tục ôn tập tư duy Chương 5 để cải thiện kỹ năng vĩ mô.'
      };
    } else {
      return {
        title: 'Cảnh báo Khủng hoảng vĩ mô!',
        badge: 'Nhà quản lý điều hành bất ổn',
        feedback: 'Nền kinh tế vĩ mô mất cân đối trầm trọng! Hoặc là bạn để kinh tế tăng trưởng nóng chệch hướng an sinh xã hội, hoặc là cơ chế cào bằng kìm hãm hoàn toàn sức sản xuất khiến nhân dân thất vọng. Hãy xem kỹ lại các Slide lý thuyết bài học để bắt đầu lại.'
      };
    }
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row gap-6">
      {/* Sidebar stats panel */}
      <div className="w-full lg:w-80 flex flex-col space-y-4 flex-shrink-0">
        <div className="bg-gradient-to-br from-slate-900 to-vnred-950/90 text-white p-6 rounded-3xl shadow-2xl border border-vnred-900/60">
          <h3 className="font-display font-black text-sm uppercase tracking-widest text-vngold-400 mb-4 flex items-center border-b border-vnred-900/50 pb-2">
            <i className="fa-solid fa-square-poll-vertical mr-2 text-vngold-400"></i>
            <span>Chỉ Số Vĩ Mô Đất Nước</span>
          </h3>
          
          <div className="space-y-4">
            {/* GDP */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span><i className="fa-solid fa-chart-line text-vnemerald-500 mr-2"></i>Tăng trưởng GDP</span>
                <span className="font-extrabold text-vnemerald-500">{score.gdp}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-vnemerald-500 h-full transition-all duration-500" style={{ width: `${score.gdp}%` }}></div>
              </div>
            </div>

            {/* XHCN */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span><i className="fa-solid fa-flag text-vnred-500 mr-2"></i>Định hướng XHCN</span>
                <span className="font-extrabold text-vnred-500">{score.xhcn}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-vnred-600 h-full transition-all duration-500" style={{ width: `${score.xhcn}%` }}></div>
              </div>
            </div>

            {/* Welfare */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span><i className="fa-solid fa-hand-holding-heart text-sky-400 mr-2"></i>An sinh &amp; Phúc lợi</span>
                <span className="font-extrabold text-sky-400">{score.welfare}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-sky-400 h-full transition-all duration-500" style={{ width: `${score.welfare}%` }}></div>
              </div>
            </div>

            {/* Trust */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span><i className="fa-solid fa-users-line text-vngold-400 mr-2"></i>Lòng tin nhân dân</span>
                <span className="font-extrabold text-vngold-400">{score.trust}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-vngold-400 h-full transition-all duration-500" style={{ width: `${score.trust}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-vnred-900/50 flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Chức vụ hiện tại:</span>
            <span className="font-extrabold text-vngold-400">{getRank()}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Luật chơi nhanh:</p>
          <p className="text-xs leading-relaxed text-slate-450">
            Đóng vai trò nhà hoạch định chính sách kinh tế Việt Nam vĩ mô. Trải qua 5 tình huống quyết sách để cân bằng hoàn hảo các chỉ số tăng trưởng và định hướng xã hội.
          </p>
        </div>
      </div>

      {/* Main gaming viewport */}
      <div className="flex-grow flex flex-col justify-between bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-6 sm:p-8 relative overflow-hidden min-h-[500px]">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
          <span className="text-xs font-bold text-vnred-500 uppercase tracking-widest flex items-center">
            <i className="fa-solid fa-gamepad mr-2"></i>Trình giả lập chính sách vĩ mô
          </span>
          <span className="text-xs text-slate-400 font-bold">
            {step === 0 ? 'Khởi động' : step > 5 ? 'Hoàn tất' : `Tình huống ${step}/5`}
          </span>
        </div>

        {/* 1. Start view */}
        {step === 0 && (
          <div className="flex-grow flex flex-col justify-center items-center text-center py-6">
            <div className="w-16 h-16 bg-vnred-950/60 border border-vnred-800 text-vnred-500 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3 className="font-display font-black text-2xl text-slate-100 mb-2">Đấu Trường Kinh Tế</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              Thử thách khả năng lãnh đạo, điều hành chính sách kinh tế đối mặt với các tình huống phân bổ tài nguyên, điều tiết độc quyền và giữ gìn định hướng công bằng XHCN.
            </p>
            <button 
              onClick={startGame} 
              className="px-8 py-3.5 bg-vnred-600 hover:bg-vnred-700 border border-vnred-500 text-white font-extrabold rounded-xl shadow-lg shadow-vnred-950/40 transition-all flex items-center space-x-2"
            >
              <span>Bắt đầu nhiệm kỳ điều phối</span>
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
        )}

        {/* 2. Playing view */}
        {step > 0 && step <= 5 && (
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 mb-6 relative">
                <span className="text-[9px] font-black text-vnred-500 uppercase tracking-widest block mb-1">
                  {gameQuestions[step].category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-200 leading-relaxed">
                  {gameQuestions[step].text}
                </h4>
              </div>
              
              <div className="space-y-3">
                {gameQuestions[step].choices.map((choice, idx) => (
                  <button 
                    key={idx}
                    disabled={locked}
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-left p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-vnred-600 disabled:opacity-50 disabled:pointer-events-none transition-all text-xs sm:text-sm font-semibold flex justify-between items-start space-x-2"
                  >
                    <span className="bg-slate-900 text-slate-400 font-bold px-2 py-0.5 rounded mr-1 flex-shrink-0 uppercase">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-300 leading-normal flex-grow">{choice.text}</span>
                    <i className="fa-solid fa-chevron-right text-slate-600 mt-0.5"></i>
                  </button>
                ))}
              </div>
            </div>

            {feedback && (
              <div className="mt-6 p-4 rounded-2xl bg-vnred-950/30 border border-vnred-900/40 text-xs sm:text-sm text-vnred-200 flex items-start space-x-2 animate-pulse">
                <i className="fa-solid fa-circle-nodes mt-0.5 text-vnred-400 flex-shrink-0"></i>
                <p><strong>Kết quả:</strong> {feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* 3. End Scorecard view */}
        {step > 5 && (
          <div className="flex-grow flex flex-col justify-center items-center text-center py-6">
            <div className="w-16 h-16 bg-vngold-950 border border-vngold-600 text-vngold-400 rounded-full flex items-center justify-center text-3xl mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <i className="fa-solid fa-crown"></i>
            </div>
            <h3 className="font-display font-black text-2xl text-slate-100 mb-1">
              {getEndScorecard().title}
            </h3>
            <p className="text-xs sm:text-sm text-vngold-400 font-extrabold uppercase tracking-widest mb-6">
              Xếp loại: {getEndScorecard().badge}
            </p>
            
            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl max-w-lg mb-6 text-left">
              <p className="text-xs font-bold text-slate-350 mb-2">Đánh giá tổng quát hiệu quả điều hành:</p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {getEndScorecard().feedback}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={startGame} 
                className="px-6 py-3 bg-vnred-600 hover:bg-vnred-700 border border-vnred-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Bắt đầu nhiệm kỳ mới
              </button>
              <button 
                onClick={onSwitchToPres} 
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
              >
                Quay lại Slide ôn tập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Register GSAP hook
gsap.registerPlugin(useGSAP);

export default function PresenterStage({ currentSlide, onSlideChange }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // --- Slide 2: Khái niệm 5.1.1 States ---
  const [slide2Tab, setSlide2Tab] = useState('chung'); // 'chung' | 'rieng'
  const [activePillar, setActivePillar] = useState(1); // 1 (vận hành), 2 (mục tiêu), 3 (quản lý)

  // Auto-scaling logic (locks fixed 1280x720 stage inside 16:9 canvas parent)
  const handleResize = () => {
    if (!containerRef.current || !stageRef.current) return;
    const parent = containerRef.current;
    const stage = stageRef.current;
    
    const pw = parent.clientWidth;
    const ph = parent.clientHeight;
    
    const dw = 1280;
    const dh = 720;
    
    const scaleX = pw / dw;
    const scaleY = ph / dh;
    const scale = Math.min(scaleX, scaleY);
    
    gsap.set(stage, {
      scale: scale,
      x: (pw - dw * scale) / 2,
      y: (ph - dh * scale) / 2,
      transformOrigin: '0 0'
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recalculate layout scale and reset flip status when slide changes
  useEffect(() => {
    setIsFlipped(false);
    setIsScaleBalanced(false);
    setScaleAngle(-12);
    setRoadmapLayers({ vimo: false, vungmien: false, nganhan: false });
    setRoadmapTooltip('Bấm chọn từng cấp độ lồng ghép ở biểu đồ để xem phương thức thực hành.');
    
    // Reset Slide 2 states
    setSlide2Tab('chung');
    setActivePillar(1);
    
    setTimeout(handleResize, 30);
  }, [currentSlide]);

  // Entrance animations via useGSAP
  useGSAP(() => {
    if (currentSlide === 1) {
      gsap.from('#title-header', { opacity: 0, y: -45, duration: 1, ease: 'power3.out' });
      gsap.from('#warmup-container', { opacity: 0, scale: 0.95, duration: 0.8, delay: 0.2, ease: 'back.out(1.2)' });
    }
    if (currentSlide === 2) {
      gsap.from('#slide2-title', { opacity: 0, y: -25, duration: 0.8, ease: 'power3.out' });
      gsap.from('#slide2-definition', { opacity: 0, y: 35, duration: 0.9, ease: 'power3.out', delay: 0.1 });
      gsap.from('#slide2-dual-nature', { opacity: 0, x: -40, duration: 0.9, ease: 'power3.out', delay: 0.25 });
      gsap.from('#slide2-quiz-btn', { scale: 0.9, duration: 0.6, ease: 'back.out(1.5)', delay: 0.4 });
    }
    if (currentSlide === 3) {
      gsap.from('#slide3-title', { opacity: 0, y: -25, duration: 0.8, ease: 'power3.out' });
      gsap.from('#slide3-bottom-banner', { opacity: 0, y: 25, duration: 0.7, ease: 'power2.out', delay: 0.25 });
      gsap.from('#slide3-quiz-btn', { scale: 0.9, duration: 0.6, ease: 'back.out(1.5)', delay: 0.4 });
    }
    if (currentSlide === 9) {
      // Set initial scale positions on load to prevent any shift or disconnect
      gsap.set('#scale-beam', { rotation: -12, svgOrigin: '150 40' });
      gsap.set('#left-pan', { rotation: 12, svgOrigin: '60 40' });
      gsap.set('#right-pan', { rotation: 12, svgOrigin: '240 40' });
      gsap.set(['#weight-1', '#weight-2', '#weight-3'], { opacity: 0, y: -120 });
    }
  }, { dependencies: [currentSlide], scope: containerRef });

  // Slide 2 Tab content entrance animation
  useGSAP(() => {
    if (currentSlide === 2) {
      gsap.fromTo('#slide2-tab-content',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, { dependencies: [slide2Tab], scope: containerRef });

  // Slide 3 Accordion item list stagger animation
  useGSAP(() => {
    if (currentSlide === 3 && activePillar > 0) {
      gsap.fromTo(`#slide2-pillar-detail-${activePillar} li`,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, { dependencies: [activePillar], scope: containerRef });

  // ==============================================
  // INTERACTIVE GRAPHICS STATES
  // ==============================================

  // --- Slide 1: 3 Warm-up questions & Live Poll Tally ---
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [warmupPolls, setWarmupPolls] = useState({
    1: { yes: 40, no: 60, voted: false },
    2: { yes: 75, no: 25, voted: false },
    3: { yes: 50, no: 50, voted: false }
  });

  const handleWarmupVote = (questionId, option) => {
    if (warmupPolls[questionId].voted) return;
    setWarmupPolls(prev => {
      const current = prev[questionId];
      let newYes = current.yes;
      let newNo = current.no;
      if (option === 'yes') {
        newYes += 1;
      } else {
        newNo += 1;
      }
      return {
        ...prev,
        [questionId]: { yes: newYes, no: newNo, voted: true }
      };
    });
  };

  // --- Slide 3: Compass Needles & Radar waves ---
  const [showCompassNodes, setShowCompassNodes] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleIdRef = useRef(0);

  const triggerCompass = () => {
    gsap.to('#compass-needle', {
      rotation: '+=360',
      transformOrigin: '50% 50%',
      duration: 1.5,
      ease: 'power3.out'
    });

    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, { id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1600);

    setShowCompassNodes(true);
  };

  // --- Slide 4: Cogs & Boosters (Mesh distance = 70px) ---
  const [sliderVal, setSliderVal] = useState(0);
  const [boosters, setBoosters] = useState({ comp: false, sd: false, res: false });
  const [gearsRotating, setGearsRotating] = useState(false);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setSliderVal(val);
    if (val === 100) {
      setGearsRotating(true);
    } else {
      setGearsRotating(false);
    }
  };

  const handleBoosterToggle = (type) => {
    setBoosters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // --- Slide 5: Tree of Aspiration ---
  const [clickedFruits, setClickedFruits] = useState({
    wealth: false, power: false, democ: false, equity: false, civ: false
  });
  const [treeTooltip, setTreeTooltip] = useState('Chưa có khát vọng nào được kích hoạt. Hãy bấm chọn quả trên cây.');
  const [treeRipples, setTreeRipples] = useState([]);
  const treeRippleIdRef = useRef(0);

  const fruitDesires = {
    wealth: '<strong>Khát vọng DÂN GIÀU:</strong> Mong muốn nhân dân ấm no, hạnh phúc, ai cũng có công ăn việc làm ổn định, thu nhập ngày càng cao và điều kiện sống sung túc.',
    power: '<strong>Khát vọng NƯỚC MẠNH:</strong> Mong muốn quốc gia tự chủ kinh tế, quốc phòng vững mạnh, có tiếng nói và vị thế đối ngoại cao trên thế giới.',
    democ: '<strong>Khát vọng DÂN CHỦ:</strong> Người dân làm chủ xã hội, được tôn trọng, tự do ngôn luận và có tiếng nói trong các chính sách vĩ mô.',
    equity: '<strong>Khát vọng CÔNG BẰNG:</strong> Thu hẹp khoảng cách giàu nghèo, bình đẳng cơ hội phát triển, phân phối theo kết quả lao động và qua an sinh xã hội.',
    civ: '<strong>Khát vọng VĂN MINH:</strong> Xã hội hiện đại, giữ vững thuần phong mỹ tục bản sắc văn hóa Việt, phát triển bền vững đi đôi bảo vệ môi trường.'
  };

  const handleFruitClick = (type) => {
    const nextClicked = { ...clickedFruits, [type]: true };
    setClickedFruits(nextClicked);
    setTreeTooltip(fruitDesires[type]);

    const id = treeRippleIdRef.current++;
    setTreeRipples(prev => [...prev, { id, type }]);
    setTimeout(() => {
      setTreeRipples(prev => prev.filter(r => r.id !== id));
    }, 1200);

    const allActive = Object.values(nextClicked).filter(Boolean).length === 5;
    if (allActive) {
      gsap.to('#tree-svg', { 
        filter: 'drop-shadow(0 0 15px rgba(202, 8, 53, 0.45)) drop-shadow(0 0 8px rgba(251, 191, 36, 0.3))',
        duration: 0.6 
      });
      gsap.fromTo('#reason-3-text', { opacity: 0 }, { opacity: 1, duration: 0.8 });
    }
  };

  // --- Slide 8: Balance Scale ---
  const [isScaleBalanced, setIsScaleBalanced] = useState(false);
  const [scaleAngle, setScaleAngle] = useState(-12);

  const runBalanceAnimation = () => {
    setIsScaleBalanced(false);

    // Reset styles and kill active tweens
    gsap.killTweensOf(['#scale-beam', '#left-pan', '#right-pan', '#weight-1', '#weight-2', '#weight-3']);
    gsap.set('#scale-beam', { rotation: -12, svgOrigin: '150 40' });
    gsap.set('#left-pan', { rotation: 12, svgOrigin: '60 40' });
    gsap.set('#right-pan', { rotation: 12, svgOrigin: '240 40' });
    gsap.set(['#weight-1', '#weight-2', '#weight-3'], { opacity: 0, y: -120 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsScaleBalanced(true);
      }
    });
    tl.timeScale(1.6);

    // Step 1: Weight 1 falls (Red weight, left side, LLSX/Tích lũy)
    tl.to('#weight-1', { opacity: 1, y: 0, duration: 0.6, ease: 'power1.in' })
      .to('#scale-beam', { rotation: -25, svgOrigin: '150 40', duration: 0.4, ease: 'back.out(1.5)' }, '-=0.05')
      .to('#left-pan', { rotation: 25, svgOrigin: '60 40', duration: 0.4, ease: 'back.out(1.5)' }, '<')
      .to('#right-pan', { rotation: 25, svgOrigin: '240 40', duration: 0.4, ease: 'back.out(1.5)' }, '<');

    // Step 2: Weight 2 falls (Green weight, right side, heavier, An sinh/Công bằng)
    tl.to('#weight-2', { opacity: 1, y: 0, duration: 0.6, ease: 'power1.in', delay: 0.25 })
      .to('#scale-beam', { rotation: 14, svgOrigin: '150 40', duration: 0.5, ease: 'power2.out' }, '-=0.05')
      .to('#left-pan', { rotation: -14, svgOrigin: '60 40', duration: 0.5, ease: 'power2.out' }, '<')
      .to('#right-pan', { rotation: -14, svgOrigin: '240 40', duration: 0.5, ease: 'power2.out' }, '<');

    // Step 3: Weight 3 falls (Gold weight, left side, balancing)
    tl.to('#weight-3', { opacity: 1, y: 0, duration: 0.6, ease: 'power1.in', delay: 0.25 })
      .to('#scale-beam', { rotation: 0, svgOrigin: '150 40', duration: 1.2, ease: 'elastic.out(1.2, 0.4)' }, '-=0.05')
      .to('#left-pan', { rotation: 0, svgOrigin: '60 40', duration: 1.2, ease: 'elastic.out(1.2, 0.4)' }, '<')
      .to('#right-pan', { rotation: 0, svgOrigin: '240 40', duration: 1.2, ease: 'elastic.out(1.2, 0.4)' }, '<');
  };

  // --- Slide 10: Integration Roadmap ---
  const [roadmapLayers, setRoadmapLayers] = useState({
    vimo: false,
    vungmien: false,
    nganhan: false
  });
  const [roadmapTooltip, setRoadmapTooltip] = useState('Bấm chọn từng cấp độ lồng ghép ở biểu đồ để xem phương thức thực hành.');

  // ==============================================
  // UNIFIED REINFORCEMENT POLLS DATA
  // ==============================================
  const [pollStates, setPollStates] = useState({});

  const slidePolls = {
    2: {
      correct: 'c',
      question: 'Nền kinh tế thị trường định hướng XHCN ở Việt Nam vận hành đầy đủ và đồng bộ theo yếu tố nào trước tiên?',
      options: [
        { key: 'a', text: 'A. Các chỉ thị hành chính từ cơ quan quản lý' },
        { key: 'b', text: 'B. Mô hình kế hoạch hóa tập trung bao cấp' },
        { key: 'c', text: 'C. Các quy luật của thị trường' },
        { key: 'd', text: 'D. Các quy định áp đặt từ thị trường quốc tế' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.1]: Đã là một nền kinh tế thị trường thì thuộc tính cơ bản và tiên quyết là phải tôn trọng, vận hành tuân theo các quy luật khách quan của thị trường (như quy luật cung cầu, quy luật giá trị, quy luật cạnh tranh) chứ không quản lý bằng mệnh lệnh hành chính hay bao cấp như mô hình cũ.',
      feedbackIncorrect: 'Chưa chính xác! Đã là một nền kinh tế thị trường thì thuộc tính cơ bản và tiên quyết là phải vận hành tuân theo các quy luật khách quan của thị trường.'
    },
    3: {
      correct: 'b',
      question: 'Ai là lực lượng quyết định, vừa là chủ thể thực hiện vừa là đối tượng thụ hưởng thành quả của nền kinh tế thị trường định hướng XHCN tại Việt Nam?',
      options: [
        { key: 'a', text: 'A. Các nhà đầu tư nước ngoài' },
        { key: 'b', text: 'B. Nhân dân' },
        { key: 'c', text: 'C. Các tập đoàn kinh tế tư nhân lớn' },
        { key: 'd', text: 'D. Các cơ quan quản lý nhà nước vĩ mô' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.1]: Bản chất của mô hình kinh tế thị trường định hướng XHCN mang tính nhân dân sâu sắc. Thành công của mô hình phụ thuộc vào sự nỗ lực xây dựng của toàn thể nhân dân, đồng thời đích đến cuối cùng là phục vụ cho lợi ích của đại đa số quần chúng nhân dân (hướng tới xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh).',
      feedbackIncorrect: 'Chưa chính xác! Bản chất của mô hình kinh tế thị trường định hướng XHCN mang tính nhân dân sâu sắc. Hãy thử chọn lại!'
    },
    4: {
      correct: 'a',
      question: 'Vì sao sự lựa chọn kinh tế thị trường định hướng XHCN lại được xem là "nhất quán"?',
      options: [
        { key: 'a', text: 'A. Là lựa chọn xuyên suốt thời kỳ quá độ, không tạm thời hay đối phó' },
        { key: 'b', text: 'B. Là sự sao chép hoàn chỉnh từ mô hình Xô Viết cũ' },
        { key: 'c', text: 'C. Là mô hình đổi mới liên tục theo tình huống ngắn hạn' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.2]: Lựa chọn này là nhất quán xuyên suốt, không hề mang tính nhất thời, chắp vá hay đối phó.',
      feedbackIncorrect: 'Chưa chính xác! Thử suy luận lại nội dung học phần để có quyết định đúng đắn.'
    },
    5: {
      correct: 'b',
      question: 'Vì sao động cơ "Cạnh tranh lành mạnh" lại cần thiết cho tính ưu việt của thị trường?',
      options: [
        { key: 'a', text: 'A. Giúp các tập đoàn lớn độc quyền tiêu diệt tư nhân lập tức' },
        { key: 'b', text: 'B. Thúc đẩy cải tiến công nghệ, hạ giá thành và nâng cao hiệu quả xã hội' },
        { key: 'c', text: 'C. Loại bỏ hoàn toàn vai trò quản lý vĩ mô của Nhà nước' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.2]: Cạnh tranh buộc doanh nghiệp liên tục cải tiến và nâng cao công suất, thể hiện tính ưu việt của thị trường.',
      feedbackIncorrect: 'Chưa chính xác! Thử suy luận lại nội dung học phần để có quyết định đúng đắn.'
    },
    6: {
      correct: 'a',
      question: 'Vì sao "Công bằng xã hội" lại được đính kết chung với khát vọng "Dân giàu" trong mô hình kinh tế này?',
      options: [
        { key: 'a', text: 'A. Để bảo đảm thành quả tăng trưởng được chia sẻ hài hòa, không phát sinh bất bình đẳng cực đoan' },
        { key: 'b', text: 'B. Để triệt tiêu mọi động lực phấn đấu làm giàu chính đáng của người lao động' },
        { key: 'c', text: 'C. Nhằm hạn chế toàn bộ hoạt động thương mại với đối tác nước ngoài' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.2]: Công bằng xã hội giúp duy trì lòng tin, ngăn ngừa bất bình đẳng sâu sắc, giữ vững bản chất XHCN.',
      feedbackIncorrect: 'Chưa chính xác! Thử suy luận lại nội dung học phần để có quyết định đúng đắn.'
    },
    7: {
      correct: 'c',
      question: 'Thành phần kinh tế nào nắm giữ vai trò "chủ đạo" dẫn dắt vĩ mô trong cơ cấu nhiều thành phần?',
      options: [
        { key: 'a', text: 'A. Kinh tế tư nhân nội địa' },
        { key: 'b', text: 'B. Kinh tế có vốn đầu tư nước ngoài (FDI)' },
        { key: 'c', text: 'C. Kinh tế Nhà nước' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.3]: Kinh tế nhà nước giữ vai trò chủ đạo là lực lượng then chốt để ổn định vĩ mô và định hướng XHCN.',
      feedbackIncorrect: 'Chưa chính xác! Thử suy luận lại nội dung học phần để có quyết định đúng đắn.'
    },
    8: {
      correct: 'b',
      question: 'Đâu là hình thức phân phối phản ánh đậm nét nhất định hướng XHCN bảo đảm công bằng xã hội?',
      options: [
        { key: 'a', text: 'A. Phân phối hoàn toàn theo lượng cổ phần sở hữu vốn' },
        { key: 'b', text: 'B. Phân phối theo lao động, hiệu quả kinh tế và qua phúc lợi an sinh xã hội' },
        { key: 'c', text: 'C. Chia đều của cải cào bằng bình quân chủ nghĩa' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.3]: Phối hợp chặt chẽ giữa phân phối theo lao động và hệ thống an sinh xã hội chính là chìa khóa định hướng.',
      feedbackIncorrect: 'Chưa chính xác! Thử suy luận lại nội dung học phần để có quyết định đúng đắn.'
    },
    9: {
      correct: 'b',
      question: 'Theo đoạn trích, tiến bộ và công bằng xã hội đóng vai trò như thế nào đối với nền kinh tế thị trường định hướng XHCN?',
      options: [
        { key: 'a', text: 'A. Chỉ là mục tiêu cuối cùng sau khi nền kinh tế đã phát triển rất giàu mạnh' },
        { key: 'b', text: 'B. Vừa là điều kiện bảo đảm sự phát triển bền vững, vừa là mục tiêu thể hiện bản chất tốt đẹp của chế độ' },
        { key: 'c', text: 'C. Chỉ là giải pháp tình thế ngắn hạn để giải quyết mâu thuẫn xã hội tạm thời' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.3]: Tiến bộ và công bằng xã hội đóng vai trò kép: vừa là điều kiện bảo đảm sự phát triển bền vững, vừa là mục tiêu thể hiện bản chất chế độ.',
      feedbackIncorrect: 'Chưa chính xác! Hãy suy luận lại vai trò kép của công bằng xã hội đối với sự phát triển bền vững.'
    },
    10: {
      correct: 'b',
      question: 'Việc thực hiện tiến bộ và công bằng xã hội ở nước ta cần phải được lồng ghép như thế nào?',
      options: [
        { key: 'a', text: 'A. Đợi kinh tế đạt mức phát triển cao mới quay lại giải quyết các vấn đề xã hội hoặc làm từ thiện' },
        { key: 'b', text: 'B. Phải được lồng ghép ngay trong từng chính sách, chiến lược, quy hoạch, kế hoạch và từng giai đoạn phát triển' },
        { key: 'c', text: 'C. Chỉ lồng ghép vào hoạt động của các doanh nghiệp và tổ chức phi chính phủ tự phát' }
      ],
      feedbackCorrect: 'Đúng! [Mục 5.1.3]: Gắn tăng trưởng với công bằng xã hội phải thực hiện "ngay trong từng bước đi và từng chính sách phát triển", không chờ đợi.',
      feedbackIncorrect: 'Chưa chính xác! Xem kỹ lại phương thức lồng ghép tiến bộ xã hội "ngay trong từng bước đi" đã phân tích.'
    }
  };

  const handlePollAnswer = (optionKey) => {
    if (pollStates[currentSlide]) return;
    const poll = slidePolls[currentSlide];
    const isCorrect = optionKey === poll.correct;
    setPollStates(prev => ({
      ...prev,
      [currentSlide]: { isCorrect, option: optionKey }
    }));
  };

  return (
    <div id="slide-canvas-parent" ref={containerRef}>
      <div id="slide-stage" ref={stageRef} className={`flip-card w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner w-full h-full">
          
          {/* ==============================================
              FRONT SIDE (Slide Visual Presentation)
             ============================================== */}
          <div className="flip-card-front w-full h-full bg-[#0f172a] p-12 flex flex-col justify-between overflow-hidden text-left">
            
            {/* SLIDE 1: TRANG BÌA & KHỞI ĐỘNG */}
            {currentSlide === 1 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div className="flex items-center space-x-2.5 bg-vnred-955 border border-vnred-800 text-vnred-400 px-6 py-2 rounded-full text-sm sm:text-base font-extrabold w-fit mx-auto mb-1.5">
                  <i className="fa-solid fa-graduation-cap text-lg"></i>
                  <span>HỌC PHẦN: KINH TẾ CHÍNH TRỊ MÁC - LÊNIN</span>
                </div>
                
                <div className="text-center my-auto">
                  <h1 id="title-header" className="font-display font-black text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
                    Chương 5: Kinh Tế Thị Trường <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 glow-accent">
                      Định Hướng XHCN
                    </span> Ở Việt Nam
                  </h1>
                  
                  <div id="warmup-container" className="max-w-4xl mx-auto bg-slate-950/80 border border-slate-800 rounded-3xl p-5 text-left shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-2.5 h-full bg-vnred-600 rounded-l-3xl"></div>
                    <h4 className="text-base font-black text-vngold-400 uppercase tracking-widest mb-4 flex items-center">
                      <i className="fa-solid fa-fire-flame-simple mr-2 text-vnred-500 animate-pulse text-lg"></i>
                      Khởi Động Lớp Học: 3 Câu Hỏi Thảo Luận
                    </h4>
                    
                    <div className="space-y-2.5">
                      {[
                        { id: 1, q: "❓ Theo bạn, 'Kinh tế thị trường' và 'Xã hội chủ nghĩa' có thể cùng song hành hòa hợp không?" },
                        { id: 2, q: "❓ Trước thời kỳ Đổi mới 1986, nền kinh tế bao cấp nước ta gặp khó khăn gì mà bạn biết?" },
                        { id: 3, q: "❓ Khi nghe khẩu hiệu 'Dân giàu, nước mạnh...', yếu tố nào làm bạn tâm đắc nhất?" }
                      ].map(item => {
                        const isExpanded = activeQuestion === item.id;
                        const poll = warmupPolls[item.id];
                        const totalVotes = poll.yes + poll.no;
                        const yesPct = Math.round((poll.yes / totalVotes) * 100);
                        const noPct = Math.round((poll.no / totalVotes) * 100);

                        return (
                          <div key={item.id} className="border border-slate-850 rounded-2xl overflow-hidden transition-all bg-slate-900/50">
                            <button 
                              onClick={() => setActiveQuestion(isExpanded ? null : item.id)}
                              className="w-full text-left py-3 px-5 text-sm sm:text-base font-black text-slate-205 hover:text-white flex justify-between items-center transition-colors"
                            >
                              <span>{item.q}</span>
                              <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-slate-500 text-base`}></i>
                            </button>
                            
                            {isExpanded && (
                              <div className="py-3.5 px-5 bg-slate-950 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fadeIn">
                                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                                  Ban thuyết trình hãy khảo sát ý kiến trực quan của lớp trước khi bắt đầu bài học.
                                </p>
                                
                                {!poll.voted ? (
                                  <div className="flex space-x-3 w-full sm:w-auto">
                                    <button 
                                      onClick={() => handleWarmupVote(item.id, 'yes')}
                                      className="px-6 py-3 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-black text-sm rounded-xl transition-all shadow-md cursor-pointer"
                                    >
                                      👍 Có/Đồng ý
                                    </button>
                                    <button 
                                      onClick={() => handleWarmupVote(item.id, 'no')}
                                      className="px-6 py-3 bg-vnred-600 hover:bg-vnred-700 text-white font-black text-sm rounded-xl transition-all shadow-md cursor-pointer"
                                    >
                                      👎 Không/Phân vân
                                    </button>
                                  </div>
                                ) : (
                                  <div className="w-full sm:w-64 space-y-2.5">
                                    <div className="flex justify-between items-center text-sm font-black text-slate-355">
                                      <span>Đồng ý: {yesPct}%</span>
                                      <span>Không đồng ý: {noPct}%</span>
                                    </div>
                                    <div className="h-3.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden flex">
                                      <div className="bg-vnemerald-500 h-full transition-all duration-500" style={{ width: `${yesPct}%` }}></div>
                                      <div className="bg-vnred-600 h-full transition-all duration-500" style={{ width: `${noPct}%` }}></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: KHÁI NIỆM - PHẦN 1 */}
            {currentSlide === 2 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div id="slide2-title" className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-sm font-extrabold px-2.5 py-1 rounded">Mục 5.1.1 (Phần 1)</span>
                    <h2 className="font-display text-4xl lg:text-5xl font-black text-slate-100">
                      Định nghĩa &amp; Bản chất "Kép"
                    </h2>
                  </div>
                  <p className="text-lg text-slate-400 italic mb-6">
                    [Khung lý luận vĩ mô]: Định nghĩa cốt lõi và Tính biện chứng của mô hình kinh tế thị trường định hướng XHCN.
                  </p>
                  
                  {/* Row 1: Định nghĩa cốt lõi */}
                  <div id="slide2-definition" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 mb-6 shadow-lg relative overflow-hidden text-left">
                    <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-vnred-600 to-vngold-400 h-full"></div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-vnred-950/80 p-2.5 rounded-xl text-vnred-500 border border-vnred-900/40 mt-1 flex-shrink-0">
                        <i className="fa-solid fa-scale-balanced text-xl lg:text-2xl"></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-vngold-400 uppercase tracking-widest mb-1">Định nghĩa Cốt lõi</h4>
                        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                          Nền kinh tế thị trường định hướng xã hội chủ nghĩa (XHCN) ở Việt Nam là nền kinh tế vận hành đầy đủ, đồng bộ theo các <span className="text-vngold-400 font-bold">quy luật của thị trường</span>, đồng thời hướng tới mục tiêu từng bước xác lập một xã hội <span className="text-vnemerald-450 font-bold">"Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"</span>, dưới sự điều tiết của <span className="text-vnred-400 font-bold">Nhà nước pháp quyền XHCN</span> do <span className="text-vnred-400 font-bold">Đảng Cộng sản Việt Nam lãnh đạo</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Bản chất kép */}
                  <div id="slide2-dual-nature" className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between text-left min-h-[220px]">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-black text-vngold-400 uppercase tracking-widest">Bản chất "Kép" của mô hình</h4>
                        <span className="text-[10px] text-slate-500 font-semibold italic">Sự kết hợp biện chứng</span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-400 mb-4">
                        Sự kết hợp biện chứng giữa thuộc tính phổ biến của thị trường thế giới và điều kiện đặc thù tại Việt Nam:
                      </p>
                      
                      {/* Custom Capsule Tabs */}
                      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl mb-4 relative max-w-md mx-auto">
                        <button 
                          onClick={() => setSlide2Tab('chung')}
                          className={`flex-1 text-center py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                            slide2Tab === 'chung' 
                              ? 'bg-vnred-600 text-white shadow-md' 
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Tính phổ biến (Cái chung)
                        </button>
                        <button 
                          onClick={() => setSlide2Tab('rieng')}
                          className={`flex-1 text-center py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                            slide2Tab === 'rieng' 
                              ? 'bg-vnred-600 text-white shadow-md' 
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Tính đặc thù (Cái riêng)
                        </button>
                      </div>

                      {/* Content display with transition */}
                      <div id="slide2-tab-content" className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 min-h-[110px] text-sm sm:text-base text-slate-300">
                        {slide2Tab === 'chung' ? (
                          <div className="space-y-1.5">
                            <span className="text-vnemerald-400 font-black text-xs uppercase tracking-wider block">Thuộc tính thị trường tự do</span>
                            <p className="leading-relaxed">
                              Vận hành đầy đủ theo các quy luật khách quan (Cung - cầu, giá trị, cạnh tranh, lưu thông tiền tệ). Đa dạng hóa hình thức sở hữu và các thành phần kinh tế, tự do liên kết kinh doanh lành mạnh trước pháp luật.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <span className="text-vnred-400 font-black text-xs uppercase tracking-wider block">Bối cảnh lịch sử xã hội VN</span>
                            <p className="leading-relaxed">
                              Gắn liền với điều kiện lịch sử, trình độ phát triển và hoàn cảnh chính trị - xã hội cụ thể. "Định hướng XHCN" là công cụ định hình thị trường, không bóp méo thị trường mà nhằm hướng đến phục vụ lợi ích của đại đa số nhân dân lao động.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  id="slide2-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

            {/* SLIDE 3: KHÁI NIỆM - PHẦN 2 */}
            {currentSlide === 3 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div id="slide3-title" className="flex items-center space-x-3 mb-2">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-sm font-extrabold px-2.5 py-1 rounded">Mục 5.1.1 (Phần 2)</span>
                    <h2 className="font-display text-4xl lg:text-5xl font-black text-slate-100">
                      Cấu thành cốt lõi &amp; Lực lượng quyết định
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-slate-400 italic mb-4">
                    [Khung lý luận vĩ mô]: 3 cột trụ cấu thành và Tính chất nhân dân sâu sắc của nền kinh tế.
                  </p>

                  <div className="grid grid-cols-12 gap-6 my-auto items-stretch min-h-[380px]">
                    {/* Left side selector */}
                    <div className="col-span-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-vngold-400 uppercase tracking-widest mb-1">3 Bộ phận cấu thành</h4>
                        {[
                          { id: 1, label: 'A. Vận hành thị trường', icon: 'fa-gears', color: 'text-vnemerald-400' },
                          { id: 2, label: 'B. Định hướng XHCN', icon: 'fa-bullseye', color: 'text-vnred-400' },
                          { id: 3, label: 'C. Cơ chế quản lý', icon: 'fa-building-columns', color: 'text-vngold-400' }
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => setActivePillar(item.id)}
                            className={`w-full text-left p-4 rounded-xl border font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${
                              activePillar === item.id
                                ? 'bg-slate-900 border-vnred-500 text-white shadow-[0_0_12px_rgba(202,8,53,0.2)]'
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <span className="flex items-center">
                              <i className={`fa-solid ${item.icon} ${item.color} mr-2.5 text-base`}></i>
                              {item.label}
                            </span>
                            {activePillar === item.id && (
                              <span className="w-1.5 h-1.5 rounded-full bg-vnred-500 animate-ping"></span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Compact Bottom Banner */}
                      <div id="slide3-bottom-banner" className="bg-gradient-to-r from-vnred-955 to-slate-900/60 border border-vnred-900/30 rounded-xl p-3.5 text-left shadow-inner">
                        <div className="flex items-center space-x-2 mb-1">
                          <i className="fa-solid fa-users text-vnred-400 text-sm"></i>
                          <span className="text-vngold-400 font-black tracking-wide uppercase text-sm sm:text-base">Lực lượng &amp; Vai trò</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-semibold italic">
                          "Muốn thành công phải do nhân dân nỗ lực xây dựng." Nhân dân vừa là chủ thể xây dựng vừa là người thụ hưởng trực tiếp thành quả.
                        </p>
                      </div>
                    </div>

                    {/* Right side details display (FIXED HEIGHT) */}
                    <div className="col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                          <h4 className="text-sm font-black text-slate-200 uppercase tracking-widest">Chi tiết nội dung</h4>
                          <span className="text-[10px] text-vnred-400 font-bold uppercase tracking-wider bg-vnred-955 px-2 py-0.5 rounded border border-vnred-900/30">
                            Bộ phận {activePillar === 1 ? 'A' : activePillar === 2 ? 'B' : 'C'}
                          </span>
                        </div>

                        <div className="min-h-[220px]">
                          {activePillar === 1 && (
                            <ul id="slide2-pillar-detail-1" className="space-y-4 text-sm sm:text-base text-slate-300 list-none pl-1">
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vnemerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Thị trường đóng vai trò quyết định trong việc phân bổ các nguồn lực xã hội và thúc đẩy sản xuất.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vnemerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Giá cả và quan hệ trao đổi được hình thành khách quan theo quan hệ cung - cầu và cạnh tranh.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vnemerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Các chủ thể kinh tế tự chủ, bình đẳng pháp lý và tự do hợp tác kinh doanh lành mạnh.</span>
                              </li>
                            </ul>
                          )}

                          {activePillar === 2 && (
                            <ul id="slide2-pillar-detail-2" className="space-y-4 text-sm sm:text-base text-slate-300 list-none pl-1">
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vnred-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Kinh tế gắn liền với an sinh: Phát triển vì mục tiêu <strong>"Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"</strong>.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vnred-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Phải gắn kết tăng trưởng kinh tế với tiến bộ và công bằng xã hội trong từng bước đi và từng chính sách.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vnred-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>Khuyến khích làm giàu hợp pháp đi đôi với xóa đói giảm nghèo bền vững, chăm lo các nhóm yếu thế.</span>
                              </li>
                            </ul>
                          )}

                          {activePillar === 3 && (
                            <ul id="slide2-pillar-detail-3" className="space-y-4 text-sm sm:text-base text-slate-300 list-none pl-1">
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vngold-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span><strong>Đảng Cộng sản lãnh đạo tối cao</strong>, vạch định đường lối phát triển và định hướng quyết sách vĩ mô.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vngold-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span><strong>Nhà nước pháp quyền XHCN quản lý</strong>, kiến tạo môi trường kinh doanh và điều tiết sửa chữa khuyết tật thị trường.</span>
                              </li>
                              <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-vngold-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span><strong>Kinh tế Nhà nước giữ vai trò chủ đạo</strong>, cùng kinh tế tập thể làm nền tảng vững chắc cho nền kinh tế quốc dân.</span>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-850 pt-3 text-[11px] text-slate-500 flex items-center space-x-1">
                        <i className="fa-solid fa-lightbulb text-vngold-400"></i>
                        <span>Bấm các bộ phận bên trái để chuyển đổi hiển thị thông tin chi tiết.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  id="slide3-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

            {/* SLIDE 4: STRATEGIC COMPASS */}
            {currentSlide === 4 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.2</span>
                    <h2 className="font-display text-5xl font-black text-slate-100">
                      Bàn Điều Hướng Chiến Lược &amp; Mô hình Tổng quát
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-auto py-2">
                    <div className="space-y-5">
                      <div className="bg-slate-950/65 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 left-0 w-1.5 bg-vnred-600 h-full"></div>
                        <p className="text-slate-150 text-lg md:text-xl font-semibold leading-relaxed text-left">
                          "Phát triển kinh tế thị trường định hướng xã hội chủ nghĩa là <span className="text-vngold-400 font-black uppercase tracking-wide glow-accent">đường lối chiến lược nhất quán</span>, là <span className="text-vngold-400 font-black uppercase tracking-wide glow-accent">mô hình kinh tế tổng quát</span> trong suốt thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam."
                        </p>
                      </div>
                      <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-sm sm:text-base text-slate-400 flex items-center space-x-2.5">
                        <i className="fa-solid fa-circle-info text-vngold-400 text-lg"></i>
                        <span>Click vào <strong>La bàn chiến lược</strong> bên phải để kích hoạt kim nam châm và mở rộng 3 lý do khách quan.</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-slate-950/40 border border-slate-855 rounded-3xl min-h-[250px] relative">
                      <div 
                        onClick={triggerCompass} 
                        className="relative w-52 h-52 cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full select-none">
                          <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#ca0835" strokeWidth="2.5"/>
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2"/>
                          <text x="50" y="21" fontFamily="'Outfit', sans-serif" fontSize="9.5" fontWeight="900" fill="#ca0835" textAnchor="middle">N</text>
                          <text x="50" y="86" fontFamily="'Outfit', sans-serif" fontSize="9.5" fontWeight="900" fill="#94a3b8" textAnchor="middle">S</text>
                          <text x="19" y="53" fontFamily="'Outfit', sans-serif" fontSize="9.5" fontWeight="900" fill="#94a3b8" textAnchor="middle">W</text>
                          <text x="81" y="53" fontFamily="'Outfit', sans-serif" fontSize="9.5" fontWeight="900" fill="#94a3b8" textAnchor="middle">E</text>
                          
                          <g id="compass-needle">
                            <polygon points="50,15 46,50 50,47" fill="#ca0835" />
                            <polygon points="50,15 54,50 50,47" fill="#ef4444" />
                            <polygon points="50,85 46,50 50,53" fill="#d97706" />
                            <polygon points="50,85 54,50 50,53" fill="#fbbf24" />
                            <circle cx="50" cy="50" r="4.5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.2"/>
                          </g>
                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
                          {ripples.map(rip => (
                            <div 
                              key={rip.id} 
                              className="radar-ripple"
                              style={{ animation: 'radar-expand 1.6s ease-out forwards' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    id="compass-sub-nodes" 
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 transition-all duration-500 ${showCompassNodes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
                  >
                    <div className="p-4 bg-slate-950 border-t-4 border-t-vnred-600 border-slate-800 rounded-2xl text-center shadow-md">
                      <span className="text-sm uppercase font-bold text-vnred-400 block mb-1.5">Lý do 1: Quy luật khách quan</span>
                      <p className="text-sm sm:text-base text-slate-300 font-semibold leading-relaxed">
                        Phù hợp với quy luật lịch sử khách quan của thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950 border-t-4 border-t-vnemerald-500 border-slate-800 rounded-2xl text-center shadow-md">
                      <span className="text-sm uppercase font-bold text-vnemerald-500 block mb-1.5">Lý do 2: Sức mạnh thị trường</span>
                      <p className="text-sm sm:text-base text-slate-300 font-semibold leading-relaxed">
                        Do sức mạnh kinh tế nội sinh và tính ưu việt của cơ chế thị trường thúc đẩy sức sản xuất.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950 border-t-4 border-t-vngold-400 border-slate-800 rounded-2xl text-center shadow-md">
                      <span className="text-sm uppercase font-bold text-vngold-400 block mb-1.5">Lý do 3: Nguyện vọng nhân dân</span>
                      <p className="text-sm sm:text-base text-slate-300 font-semibold leading-relaxed">
                        Mô hình phù hợp khao khát của nhân dân: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button 
                  id="slide4-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}            {/* SLIDE 5: GEARS & BOOSTERS */}
            {currentSlide === 5 && (() => {
              const boosterPct = Math.round((Object.values(boosters).filter(Boolean).length / 3) * 100);
              return (
                <div className="flex flex-col h-[624px] justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.2</span>
                      <h2 className="font-display text-5xl font-black text-slate-100">
                        Quy luật Khách quan &amp; Động lực thị trường
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto py-2">
                      <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between min-h-[300px] shadow-xl">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-200 mb-2 flex items-center space-x-2">
                            <span className="w-4 h-4 bg-vnred-600 rounded-full"></span>
                            <span>Một là: Quy luật khách quan của thời kỳ quá độ</span>
                          </h3>
                          <p className="text-sm sm:text-base text-slate-400 mb-3 leading-relaxed">
                            Trình độ lực lượng sản xuất thấp kém yêu cầu phải có nhiều thành phần kinh tế. Kéo thanh trượt bên dưới để ăn khớp và kết nối cơ chế.
                          </p>
                        </div>

                        <div className="flex items-center justify-center my-2">
                          <svg id="gears-svg" viewBox="0 0 240 120" className="w-full max-w-[310px] h-auto select-none overflow-visible">
                            <g 
                              id="gear-1-group" 
                              style={{ transform: `translateX(${-15 + (sliderVal / 100) * 15}px)` }}
                            >
                              <g 
                                id="gear-1-rotate"
                                className={sliderVal === 100 ? "animate-spin-slow" : ""}
                                style={{ 
                                  transform: `rotate(${sliderVal * 1.8}deg)`, 
                                  transformOrigin: '85px 60px' 
                                }}
                              >
                                <circle cx="85" cy="60" r="30" fill="none" stroke="#ca0835" strokeWidth="5.5"/>
                                <g fill="#ca0835">
                                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                                    <rect key={deg} x="82" y="20" width="6" height="15" rx="2" transform={`rotate(${deg} 85 60)`}/>
                                  ))}
                                </g>
                                <circle cx="85" cy="60" r="12" fill="#0f172a"/>
                                <text x="85" y="63" fontSize="9.5" fill="#ffffff" fontWeight="900" fontFamily="'Outfit', sans-serif" textAnchor="middle">LLSX</text>
                              </g>
                            </g>

                            <g 
                              id="gear-2-group" 
                              style={{ transform: `translateX(${15 - (sliderVal / 100) * 15}px)` }}
                            >
                              <g 
                                id="gear-2-rotate"
                                className={sliderVal === 100 ? "animate-spin-slow-reverse" : ""}
                                style={{ 
                                  transform: `rotate(${-sliderVal * 1.8}deg)`, 
                                  transformOrigin: '155px 60px' 
                                }}
                              >
                                <circle cx="155" cy="60" r="30" fill="none" stroke="#fbbf24" strokeWidth="5.5"/>
                                <g fill="#fbbf24">
                                  {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map(deg => (
                                    <rect key={deg} x="152" y="20" width="6" height="15" rx="2" transform={`rotate(${deg} 155 60)`}/>
                                  ))}
                                </g>
                                <circle cx="155" cy="60" r="12" fill="#0f172a"/>
                                <text x="155" y="63" fontSize="9.5" fill="#ffffff" fontWeight="900" fontFamily="'Outfit', sans-serif" textAnchor="middle">QHSX</text>
                              </g>
                            </g>
                          </svg>
                        </div>

                        <div className="space-y-2.5 mt-1">
                          <label className="text-sm font-black text-slate-400 flex justify-between uppercase tracking-wider">
                            <span>Khớp nối quan hệ sản xuất &amp; Lực lượng sản xuất</span>
                            <span className={`font-extrabold ${sliderVal === 100 ? 'text-vnemerald-500 glow-accent' : 'text-vnred-500'}`}>
                              {sliderVal === 100 ? 'Đã kết nối & Vận hành' : 'Chưa đồng bộ'}
                            </span>
                          </label>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={sliderVal} 
                            onChange={handleSliderChange} 
                            className="w-full cursor-pointer"
                          />
                        </div>

                        <div 
                          id="reason-1-text" 
                          className={`transition-all duration-500 mt-2 p-3 bg-vnred-955/40 border border-vnred-900/50 rounded-2xl text-sm sm:text-base text-vnred-200 italic leading-relaxed ${
                            sliderVal === 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <strong>Một là:</strong> "Phát triển kinh tế thị trường định hướng xã hội chủ nghĩa là tất yếu, phù hợp với quy luật khách quan của thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam."
                        </div>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between min-h-[300px] shadow-xl">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-200 mb-2 flex items-center space-x-2">
                            <span className="w-4 h-4 bg-vnemerald-500 rounded-full"></span>
                            <span>Hai là: Tính ưu việt của cơ chế thị trường</span>
                          </h3>
                          <p className="text-sm sm:text-base text-slate-400 mb-3 leading-relaxed">
                            Cơ chế thị trường phân bổ tài nguyên tối ưu, giải phóng sức sản xuất. Click kích hoạt 3 động cơ chính thúc đẩy tăng trưởng.
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 my-2">
                          {[
                            { id: 'comp', icon: 'fa-code-compare', label: 'Cạnh tranh lành mạnh' },
                            { id: 'sd', icon: 'fa-arrows-up-down', label: 'Cung - Cầu vĩ mô' },
                            { id: 'res', icon: 'fa-leaf', label: 'Tối ưu tài nguyên' }
                          ].map(item => (
                            <button 
                              key={item.id}
                              onClick={() => handleBoosterToggle(item.id)}
                              className={`p-3 border rounded-2xl transition-all flex flex-col items-center text-center cursor-pointer ${
                                boosters[item.id] 
                                  ? 'bg-vnemerald-950/40 border-vnemerald-500 scale-95 shadow-[0_0_12px_rgba(16,185,129,0.25)]' 
                                  : 'bg-slate-900 border-slate-800 hover:border-vnemerald-500/55'
                              }`}
                            >
                              <i className={`fa-solid ${item.icon} text-2xl mb-1.5 ${boosters[item.id] ? 'text-vnemerald-500 animate-bounce' : 'text-slate-500'}`}></i>
                              <span className="text-xs font-extrabold text-slate-355 leading-tight">{item.label}</span>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-2.5 relative">
                          <div className="flex justify-between items-center text-sm font-black text-slate-400 uppercase tracking-wider">
                            <span>Thanh Sức Mạng Thị Trường:</span>
                            <span className="text-vnemerald-500 font-extrabold">
                              {boosterPct}%
                            </span>
                          </div>
                          <div className="h-5 bg-slate-950 rounded-full border border-slate-850 overflow-hidden relative">
                            <div 
                              id="booster-bar" 
                              className={`h-full bg-gradient-to-r transition-all duration-500 ${
                                boosterPct >= 99 
                                  ? 'from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                                  : 'from-blue-600 to-sky-400'
                              }`}
                              style={{ 
                                width: `${boosterPct}%`, 
                                transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                              }}
                            />
                            <div 
                              id="booster-flame" 
                              className={`absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-vnemerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-ping transition-all duration-500 ${
                                boosterPct >= 99 ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          </div>
                        </div>

                        <div 
                          id="reason-2-text" 
                          className={`transition-all duration-500 mt-2 p-3 bg-vnemerald-955/40 border border-vnemerald-900/50 rounded-2xl text-sm sm:text-base text-vnemerald-300 italic leading-relaxed ${
                            boosterPct >= 99 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <strong>Hai là:</strong> "Do tính ưu việt của thị trường thúc đẩy phát triển."
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    id="slide5-quiz-btn"
                    onClick={() => setIsFlipped(true)}
                    className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                  >
                    <i className="fa-solid fa-rotate text-base"></i>
                    <span>Luyện tập: Câu hỏi củng cố</span>
                  </button>
                </div>
              );
            })()}

            {/* SLIDE 6: TREE OF ASPIRATION */}
            {currentSlide === 6 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.2</span>
                    <h2 className="font-display text-5xl font-black text-slate-100">
                      Mô hình Phù hợp với Nguyện vọng của Nhân dân
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-auto py-2">
                    <div className="space-y-4">
                      <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-3xl">
                        <h3 className="text-base font-black text-vngold-400 uppercase tracking-widest mb-3">Ý nghĩa nhân văn vĩ mô</h3>
                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                          Nền kinh tế thị trường nước ta không phát triển vì lợi ích lợi nhuận thuần túy của tư bản, mà lấy sự ấm no, công bằng, hạnh phúc của quảng đại quần chúng làm đích đến bền vững.
                        </p>
                      </div>
                      <div className="p-4 bg-vnred-950/20 border border-vnred-900/40 rounded-2xl text-sm sm:text-base text-slate-205 flex items-start space-x-2.5">
                        <i className="fa-solid fa-circle-question text-vnred-500 text-lg mt-0.5"></i>
                        <span>Click kích hoạt cả 5 <strong>"Quả khát vọng"</strong> trên cây Việt Nam ở bên phải để thuyết minh mong muốn của nhân dân.</span>
                      </div>
                      
                      <div 
                        className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-base sm:text-lg text-slate-300 min-h-[70px] flex items-center transition-all duration-300 leading-relaxed font-semibold"
                        dangerouslySetInnerHTML={{ __html: treeTooltip }}
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 bg-slate-950/40 border border-slate-850 rounded-3xl min-h-[260px] relative">
                      <div className="w-full max-w-[300px] h-[260px] relative">
                        <svg id="tree-svg" viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_5px_rgba(255,255,255,0.05)] transition-all duration-500">
                          <path d="M50,90 L50,55" stroke="#92400e" strokeWidth="8" strokeLinecap="round"/>
                          <path d="M50,65 Q35,50 30,40" fill="none" stroke="#92400e" strokeWidth="5" strokeLinecap="round"/>
                          <path d="M50,60 Q65,45 70,35" fill="none" stroke="#92400e" strokeWidth="5" strokeLinecap="round"/>
                          <path d="M50,55 Q45,35 48,22" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round"/>
                          
                          <circle cx="30" cy="38" r="15" fill="#047857" opacity="0.3"/>
                          <circle cx="70" cy="33" r="15" fill="#047857" opacity="0.3"/>
                          <circle cx="50" cy="22" r="17" fill="#047857" opacity="0.4"/>
                        </svg>
                        
                        {[
                          { id: 'wealth', top: '28%', left: '10%', icon: 'fa-coins', label: 'DÂN GIÀU' },
                          { id: 'power', top: '25%', right: '5%', icon: 'fa-shield-halved', label: 'NƯỚC MẠNH' },
                          { id: 'democ', top: '8%', left: '38%', icon: 'fa-hand-fist', label: 'DÂN CHỦ' },
                          { id: 'equity', top: '52%', left: '16%', icon: 'fa-scale-balanced', label: 'CÔNG BẰNG' },
                          { id: 'civ', top: '42%', right: '3%', icon: 'fa-graduation-cap', label: 'VĂN MINH' }
                        ].map(fruit => (
                          <button 
                            key={fruit.id}
                            id={`fr-${fruit.id}`}
                            onClick={() => handleFruitClick(fruit.id)}
                            style={{ top: fruit.top, left: fruit.left, right: fruit.right }}
                            className={`absolute px-4 py-2 border rounded-full text-xs font-black flex items-center space-x-1.5 transition-all shadow-md cursor-pointer ${
                              clickedFruits[fruit.id]
                                ? 'border-emerald-500 bg-emerald-950/80 text-emerald-400 scale-95 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                : 'bg-vnred-955 border-vnred-600 text-slate-200 hover:border-emerald-500 hover:text-emerald-400'
                            }`}
                          >
                            <i className={`fa-solid ${fruit.icon} ${clickedFruits[fruit.id] ? 'text-emerald-400 animate-pulse' : 'text-vngold-400'}`}></i>
                            <span>{fruit.label}</span>
                          </button>
                        ))}

                        <div id="tree-ripple-waves" className="absolute inset-0 pointer-events-none overflow-visible">
                          {treeRipples.map(rip => {
                            const positions = {
                              wealth: { top: '35%', left: '20%' },
                              power: { top: '32%', left: '80%' },
                              democ: { top: '15%', left: '50%' },
                              equity: { top: '60%', left: '25%' },
                              civ: { top: '55%', left: '75%' }
                            };
                            const pos = positions[rip.type];
                            return (
                              <div 
                                key={rip.id} 
                                className="radar-ripple absolute"
                                style={{
                                  top: pos.top,
                                  left: pos.left,
                                  transform: 'translate(-50%, -50%)',
                                  animation: 'radar-expand 1.2s ease-out forwards'
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    id="reason-3-text" 
                    className={`transition-all duration-500 max-w-4xl mx-auto p-4 bg-gradient-to-r from-vnred-950 to-vngold-955 border border-vngold-600/30 rounded-2xl text-center text-sm sm:text-base text-vngold-200 italic font-semibold shadow-lg ${
                      Object.values(clickedFruits).every(Boolean) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    <strong>Ba là:</strong> "Do đó là mô hình kinh tế thị trường phù hợp với nguyện vọng của nhân dân mong muốn dân giàu, nước mạnh, dân chủ, công bằng, văn minh."
                  </div>
                </div>
                
                <button 
                  id="slide6-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

            {/* SLIDE 7: MỤC TIÊU & SỞ HỮU */}
            {currentSlide === 7 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.3 (Phần A)</span>
                    <h2 className="font-display text-5xl font-black text-slate-100">
                      Đặc trưng về Mục tiêu &amp; Cơ cấu Quan hệ Sở hữu
                    </h2>
                  </div>
                  <p className="text-lg text-slate-400 italic mb-6">
                    [Khung lý luận vĩ mô]: Vai trò chủ đạo của Kinh tế Nhà nước và động lực phát triển từ Kinh tế Tư nhân.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-2">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-black text-vngold-400 uppercase tracking-widest mb-3">Về Mục tiêu Phát triển</h4>
                        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
                          Giải phóng lực lượng sản xuất, xây dựng cơ sở vật chất kỹ thuật vững chắc của chủ nghĩa xã hội. Nâng cao đời sống vật chất và tinh thần của toàn thể nhân dân.
                        </p>
                      </div>
                      <span className="text-sm sm:text-base text-vnred-400 block border-t border-slate-800/80 pt-3 font-semibold">
                        Sự khác biệt cốt lõi so với kinh tế thị trường tư bản (TBCN) vốn ưu tiên tích lũy tư bản tối đa cho giới chủ.
                      </span>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 shadow-xl">
                      <h4 className="text-lg font-black text-vnemerald-500 uppercase tracking-widest mb-3">Về Cơ cấu Sở hữu &amp; Thành phần</h4>
                      <p className="text-base sm:text-lg text-slate-205 leading-relaxed mb-3 font-bold">
                        Cơ cấu kinh tế nhiều thành phần:
                      </p>
                      <ul className="text-sm sm:text-lg text-slate-300 space-y-4 list-disc pl-5">
                        <li><strong>Kinh tế Nhà nước:</strong> Giữ vai trò chủ đạo, là công cụ dẫn dắt vĩ mô.</li>
                        <li><strong>Kinh tế Tư nhân:</strong> Được coi trọng là một động lực quan trọng của nền kinh tế.</li>
                        <li><strong>Kinh tế Tập thể, FDI:</strong> Mắt xích quan trọng cùng hợp tác và cạnh tranh bình đẳng.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button 
                  id="slide7-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

            {/* SLIDE 8: QUẢN LÝ & PHÂN PHỐI */}
            {currentSlide === 8 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.3 (Phần B)</span>
                    <h2 className="font-display text-5xl font-black text-slate-100">
                      Quan hệ Quản lý vĩ mô &amp; Cơ chế Phân phối
                    </h2>
                  </div>
                  <p className="text-lg text-slate-400 italic mb-6">
                    [Khung lý luận vĩ mô]: Sự quản lý và can thiệp của Nhà nước pháp quyền cùng các hình thức phân phối thu nhập.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-2">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 shadow-xl">
                      <h4 className="text-lg font-black text-vngold-400 uppercase tracking-widest mb-3">Về Quan hệ Quản lý</h4>
                      <p className="text-base sm:text-lg text-slate-205 leading-relaxed">
                        Nhà nước quản lý thông qua luật pháp, chiến lược và chính sách trên cơ sở tôn trọng quy luật thị trường. Nhiệm vụ then chốt là tạo lập sân chơi bình đẳng, ổn định vĩ mô, khắc phục triệt để các khuyết tật tự phát của thị trường tự do.
                      </p>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 shadow-xl">
                      <h4 className="text-lg font-black text-vnemerald-500 uppercase tracking-widest mb-3">Về Quan hệ Phân phối</h4>
                      <p className="text-base sm:text-lg text-slate-205 leading-relaxed mb-3 font-bold">
                        Thực hiện đa dạng hóa hình thức phân phối để giải phóng tiềm năng xã hội:
                      </p>
                      <ul className="text-sm sm:text-lg text-slate-300 space-y-4 list-disc pl-5">
                        <li>Phân phối theo kết quả lao động &amp; hiệu quả kinh tế.</li>
                        <li>Phân phối theo mức đóng góp vốn, nguồn lực.</li>
                        <li>Phân phối thông qua hệ thống an sinh xã hội &amp; phúc lợi công cộng.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button 
                  id="slide8-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

            {/* SLIDE 9: TĂNG TRƯỞNG & CÂN BẰNG - PHẦN 1: BẢN CHẤT & VAI TRÒ KÉP */}
            {currentSlide === 9 && (
              <div className="flex flex-col h-[624px] justify-between relative">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.3 (Phần C1)</span>
                    <h2 className="font-display text-5xl font-black text-slate-100">
                      Tăng trưởng Kinh tế &amp; Công bằng xã hội: Bản chất &amp; Vai trò kép
                    </h2>
                  </div>
                  <p className="text-lg text-slate-400 italic mb-4">
                    [Khung lý luận vĩ mô]: Phân tích lý do vì sao tiến bộ và công bằng xã hội là thuộc tính sống còn của mô hình Việt Nam.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto py-2 items-center">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                      <div>
                        <h4 className="text-base font-black text-vngold-400 uppercase tracking-widest mb-1.5 flex items-center">
                          <i className="fa-solid fa-seedling mr-1.5 text-vngold-400"></i>Đặt vấn đề &amp; Bản chất chế độ
                        </h4>
                        <p className="text-sm sm:text-base text-slate-305 leading-relaxed font-semibold">
                          Chúng ta không đi theo con đường tư bản chủ nghĩa - tức là chấp nhận đánh đổi phân hóa giàu nghèo cực đoan, "bánh mì lớn trước rồi chia sau". Ở Việt Nam, phát triển kinh tế là để phục vụ nhân dân, vì con người.
                        </p>
                      </div>
                      
                      <div className="border-t border-slate-850 pt-3">
                        <h4 className="text-base font-black text-vnemerald-500 uppercase tracking-widest mb-1.5 flex items-center">
                          <i className="fa-solid fa-shuffle mr-1.5 text-vnemerald-500"></i>Vai trò kép: Điều kiện &amp; Mục tiêu
                        </h4>
                        <ul className="text-sm sm:text-base text-slate-355 space-y-2 pl-4 list-disc">
                          <li><strong>Về mặt điều kiện:</strong> Là nền tảng ổn định xã hội, ngăn ngừa bất bình đẳng sâu sắc gây khủng hoảng trì trệ.</li>
                          <li><strong>Về mặt mục tiêu:</strong> Thể hiện bản chất tốt đẹp của CNXH, hiện thực hóa từng bước trong thời kỳ quá độ.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-950/40 border border-slate-850 rounded-3xl p-6 flex flex-col items-center justify-between min-h-[280px] shadow-xl text-center">
                      <div className="w-full flex-grow flex items-center justify-center relative overflow-visible h-36">
                        {/* Interactive Balance Scale SVG */}
                        <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto select-none overflow-visible">
                          {/* Stand Base */}
                          <path d="M150,110 L150,40" stroke="#475569" strokeWidth="6" strokeLinecap="round"/>
                          <polygon points="150,105 130,135 170,135" fill="#475569"/>
                          
                          {/* Scale Beam Group (controlled dynamically via GSAP) */}
                          <g id="scale-beam">
                            <line x1="60" y1="40" x2="240" y2="40" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round"/>
                            <circle cx="150" cy="40" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5"/>
                            
                            {/* Left Pan */}
                            <g id="left-pan">
                              <line x1="60" y1="40" x2="40" y2="90" stroke="#f43f5e" strokeWidth="2"/>
                              <line x1="60" y1="40" x2="80" y2="90" stroke="#f43f5e" strokeWidth="2"/>
                              <path d="M30,90 L90,90 Q60,110 30,90" fill="#f43f5e" opacity="0.8"/>
                              <text x="60" y="85" fontSize="9.5" fontWeight="900" fill="#ffffff" textAnchor="middle">TĂNG TRƯỞNG</text>
                              
                              {/* Weight 1 (Red) */}
                              <circle id="weight-1" cx="50" cy="80" r="8" fill="#e11d48" stroke="#ffffff" strokeWidth="1"/>
                              {/* Weight 3 (Gold) */}
                              <circle id="weight-3" cx="70" cy="80" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1"/>
                            </g>
                            
                            {/* Right Pan */}
                            <g id="right-pan">
                              <line x1="240" y1="40" x2="220" y2="90" stroke="#10b981" strokeWidth="2"/>
                              <line x1="240" y1="40" x2="260" y2="90" stroke="#10b981" strokeWidth="2"/>
                              <path d="M210,90 L270,90 Q240,110 210,90" fill="#10b981" opacity="0.8"/>
                              <text x="240" y="85" fontSize="9.5" fontWeight="900" fill="#ffffff" textAnchor="middle">CÔNG BẰNG</text>
                              
                              {/* Weight 2 (Green) */}
                              <circle id="weight-2" cx="240" cy="78" r="12" fill="#059669" stroke="#ffffff" strokeWidth="1"/>
                            </g>
                          </g>
                        </svg>
                      </div>

                      <div className="w-full space-y-3">
                        <button 
                          onClick={runBalanceAnimation}
                          className={`px-5 py-2.5 text-sm font-black rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            isScaleBalanced 
                              ? 'bg-vnemerald-950/40 border border-vnemerald-500 text-vnemerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]' 
                              : 'bg-vnred-600 hover:bg-vnred-700 text-white border-2 border-vngold-400 hover:border-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          }`}
                        >
                          {isScaleBalanced ? '✓ Chạy lại mô phỏng' : 'Cân bằng Cán cân Kinh tế'}
                        </button>
                        
                        <div className={`p-4 rounded-2xl border transition-all duration-305 min-h-[64px] flex items-center justify-center text-center leading-relaxed ${
                          isScaleBalanced 
                            ? 'bg-vnemerald-950/40 border-vnemerald-500 text-vnemerald-200 text-base sm:text-lg font-black shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse'
                            : 'bg-slate-950/80 border-slate-900 text-slate-355 text-sm sm:text-base font-semibold'
                        }`}>
                          <span>
                            {isScaleBalanced 
                              ? '"Kinh tế tăng trưởng bền vững nhờ nền tảng tiến bộ công bằng xã hội được bảo đảm."'
                              : 'Cán cân đang lệch về tăng trưởng thuần túy. Bấm nút để cân đối kinh tế.'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  id="slide9-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

            {/* SLIDE 10: TĂNG TRƯỞNG & CÂN BẰNG - PHƯƠNG THỨC THỰC HIỆN */}
            {currentSlide === 10 && (
              <div className="flex flex-col h-[624px] justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="bg-vnred-955 text-vnred-400 border border-vnred-800 text-base font-extrabold px-3 py-1 rounded">Mục 5.1.3 (Phần C2)</span>
                    <h2 className="font-display text-5xl font-black text-slate-100">
                      Phương thức hiện thực hóa Công bằng xã hội
                    </h2>
                  </div>
                  <p className="text-lg text-slate-400 italic mb-4">
                    [Khung lý luận vĩ mô]: Cơ chế lồng ghép công bằng xã hội trực tiếp vào từng bước đi của nền kinh tế thị trường.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto py-2 items-center">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                      <div>
                        <h4 className="text-base font-black text-vngold-400 uppercase tracking-widest mb-1.5 flex items-center">
                          <i className="fa-solid fa-check-double mr-1.5 text-vngold-400"></i>Thực hiện ngay trong từng bước đi
                        </h4>
                        <p className="text-sm sm:text-base text-slate-305 leading-relaxed font-semibold">
                          Chúng ta không đợi đến khi kinh tế thật giàu rồi mới đi giải quyết các vấn đề xã hội hay làm từ thiện. Công bằng xã hội phải đi đôi, đồng hành cùng sự phát triển vĩ mô ngay từ đầu.
                        </p>
                      </div>
                      
                      <div className="border-t border-slate-850 pt-3">
                        <h4 className="text-base font-black text-vnemerald-500 uppercase tracking-widest mb-1.5 flex items-center">
                          <i className="fa-solid fa-building-circle-check mr-1.5 text-vnemerald-500"></i>Ví dụ Thực tế (Khu công nghiệp)
                        </h4>
                        <p className="text-sm sm:text-base text-slate-355 leading-relaxed">
                          Khi quy hoạch một khu công nghiệp lớn (phát triển kinh tế), Nhà nước đồng thời quy hoạch xây dựng ngay khu nhà ở xã hội cho công nhân và trường học cho con em họ (chính sách xã hội). Kinh tế phát triển đến đâu, đời sống nhân dân tăng lên đến đó.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/40 border border-slate-855 rounded-3xl p-6 flex flex-col justify-between min-h-[280px] shadow-xl text-left">
                      <div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Sơ đồ 3 Cấp độ Lồng ghép:</h4>
                        
                        <div className="space-y-2.5">
                          {[
                            { key: 'vimo', label: '1. Chính sách kinh tế vĩ mô', text: 'Tích hợp phân phối công bằng các yếu tố sản xuất và cơ hội phát triển đồng đều cho mọi thành phần kinh tế.' },
                            { key: 'vungmien', label: '2. Chiến lược & Quy hoạch vùng', text: 'Phát triển cân đối giữa các địa phương, hỗ trợ vùng nghèo, xây dựng cơ sở hạ tầng an sinh đồng bộ.' },
                            { key: 'nganhan', label: '3. Kế hoạch ngắn hạn & Từng giai đoạn', text: 'Lồng ghép chỉ tiêu xóa đói giảm nghèo, giáo dục, y tế trực tiếp vào các kế hoạch phát triển kinh tế hàng năm.' }
                          ].map(layer => (
                            <button
                              key={layer.key}
                              onClick={() => {
                                setRoadmapLayers(prev => ({ ...prev, [layer.key]: true }));
                                setRoadmapTooltip(`<strong>${layer.label}:</strong> ${layer.text}`);
                              }}
                              className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                                roadmapLayers[layer.key]
                                  ? 'border-vnemerald-500 bg-vnemerald-955 text-slate-100 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                                  : 'border-slate-800 bg-slate-900 text-slate-450 hover:border-slate-700 hover:text-slate-300'
                              }`}
                            >
                              <span className="text-sm font-bold">{layer.label}</span>
                              <i className={`fa-solid ${roadmapLayers[layer.key] ? 'fa-circle-check text-vnemerald-500' : 'fa-circle-question text-slate-600'}`}></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div 
                        className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-300 transition-all duration-305 min-h-[60px]"
                        dangerouslySetInnerHTML={{ __html: roadmapTooltip }}
                      />
                      
                      {Object.values(roadmapLayers).every(Boolean) && (
                        <div className="mt-2 text-center text-sm font-black text-vngold-400 uppercase tracking-widest animate-pulse flex items-center justify-center space-x-1.5 bg-vngold-955 border border-vngold-600/30 p-2 rounded-xl">
                          <i className="fa-solid fa-sync text-sm animate-spin"></i>
                          <span>Đồng bộ hóa thành công: Kinh tế ⇄ An sinh</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  id="slide10-quiz-btn"
                  onClick={() => setIsFlipped(true)}
                  className="mx-auto px-6 py-2.5 bg-vnemerald-600 hover:bg-vnemerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-2 transition-all uppercase tracking-wider cursor-pointer animate-pulse"
                >
                  <i className="fa-solid fa-rotate text-base"></i>
                  <span>Luyện tập: Câu hỏi củng cố</span>
                </button>
              </div>
            )}

          </div>

          {/* ==============================================
              BACK SIDE (Reinforcement Quiz / Flashcard Face)
             ============================================== */}
          <div className="flip-card-back w-full h-full bg-slate-950 border border-slate-850 p-12 flex flex-col justify-between overflow-hidden text-left">
            {slidePolls[currentSlide] ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-vnemerald-500/10 text-vnemerald-400 border border-vnemerald-500/20 text-sm font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Câu hỏi ôn tập củng cố bài học (Slide {currentSlide}/10)
                    </span>
                  </div>
                  
                  <h3 className="text-4xl font-black text-slate-100 mb-8 leading-relaxed">
                    {slidePolls[currentSlide].question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {slidePolls[currentSlide].options.map(opt => (
                      <button 
                        key={opt.key}
                        disabled={!!pollStates[currentSlide]}
                        onClick={() => handlePollAnswer(opt.key)}
                        className={`text-left p-5 rounded-2xl bg-slate-900 border text-base sm:text-lg font-bold transition-all duration-200 leading-relaxed flex items-center space-x-4 cursor-pointer ${
                          pollStates[currentSlide]?.option === opt.key 
                            ? pollStates[currentSlide].isCorrect 
                              ? 'border-vnemerald-500 bg-vnemerald-950/20 text-vnemerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                              : 'border-vnred-600 bg-vnred-955 text-vnred-200'
                            : 'border-slate-800 hover:border-vnred-600 hover:bg-slate-850 text-slate-300'
                        }`}
                      >
                        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center font-black text-sm border border-slate-800">
                          {opt.key.toUpperCase()}
                        </span>
                        <span>{opt.text.substring(3)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {pollStates[currentSlide] && (
                    <div className={`p-5 rounded-2xl border text-base sm:text-lg font-semibold flex items-start space-x-2.5 animate-pulse ${
                      pollStates[currentSlide].isCorrect 
                        ? 'bg-vnemerald-950/30 border-vnemerald-500/30 text-vnemerald-300' 
                        : 'bg-vnred-955/20 border-vnred-600/30 text-vnred-200'
                    }`}>
                      <i className={`fa-solid ${pollStates[currentSlide].isCorrect ? 'fa-circle-check text-vnemerald-500' : 'fa-triangle-exclamation text-vnred-500'} mt-0.5 text-lg flex-shrink-0`}></i>
                      <p className="leading-relaxed">
                        {pollStates[currentSlide].isCorrect 
                          ? slidePolls[currentSlide].feedbackCorrect 
                          : slidePolls[currentSlide].feedbackIncorrect}
                      </p>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="mx-auto px-6 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-200 font-black text-sm sm:text-base rounded-xl shadow-md flex items-center space-x-1.5 transition-all uppercase tracking-wider border border-slate-800 cursor-pointer"
                  >
                    <i className="fa-solid fa-rotate-left text-base"></i>
                    <span>Quay lại bài giảng</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <i className="fa-solid fa-face-smile text-5xl text-vngold-400"></i>
                <h3 className="text-2xl font-bold text-slate-355">Slide này không có câu hỏi trắc nghiệm</h3>
                <button 
                  onClick={() => setIsFlipped(false)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  Quay lại
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

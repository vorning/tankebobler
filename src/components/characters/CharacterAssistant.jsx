import { useState, useEffect, useRef } from "react";

const CharacterAssistant = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Refs til at holde styr på timers
  const thinkingTimer = useRef(null);
  const hideTimer = useRef(null);

  const messages = [
    "Du klarer det godt! 💪",
    "Fortsæt sådan! 🌟",
    "Godt tænkt! 💭",
    "Du er på rette vej! 🎯",
    "Tag en pause hvis du har brug for det! 😌",
    "Du lærer så meget! 🧠",
    "Jeg tror på dig! ✨",
  ];

  // Vis velkomstbesked efter 3 sekunder
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup timers ved unmount
  useEffect(() => {
    return () => {
      if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const handleClick = () => {
    // Clear eksisterende timers
    if (thinkingTimer.current) clearTimeout(thinkingTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    setIsThinking(true);
    setShowMessage(true);

    // Ny thinking timer
    thinkingTimer.current = setTimeout(() => {
      setCurrentMessage(randomMessage);
      setIsThinking(false);
    }, 800);

    // Ny hide timer
    hideTimer.current = setTimeout(() => {
      setShowMessage(false);
    }, 4800); // 800ms thinking + 4000ms message = 4800ms total
  };

  return (
    <>
      {/* Inline CSS for no conflicts */}
      <style>{`
        .debug-character-assistant {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 9999;
          width: 70px;
          height: 70px;
          font-family: 'Fredoka', sans-serif;
        }
        
        .debug-character-circle {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%);
          border-radius: 50%;
          border: 3px solid #9333EA;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 4px 16px rgba(147, 51, 234, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .debug-character-circle:hover {
          transform: scale(1.05);
        }
        
        .debug-character-circle:active {
          transform: scale(0.95);
        }
        
        .debug-speech-bubble {
          position: absolute;
          bottom: 80px;
          right: -10px;
          background: white;
          border: 2px solid #E9D5FF;
          border-radius: 16px;
          padding: 14px 18px;
          min-width: 200px;
          max-width: 280px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          font-family: 'Fredoka', sans-serif;
          font-size: 14px;
          color: #1F2937;
          animation: slideInUp 0.4s ease-out;
        }
        
        .debug-speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 40px;
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 7px solid white;
        }
        
        .debug-thinking-dots {
          display: flex;
          gap: 4px;
          justify-content: center;
          align-items: center;
          height: 20px;
        }
        
        .debug-thinking-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9333EA;
          animation: thinkingPulse 1.4s ease-in-out infinite;
        }
        
        .debug-thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
        .debug-thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
        .debug-thinking-dots span:nth-child(3) { animation-delay: 0s; }
        
        .debug-floating-animation {
          animation: debugFloat 4s ease-in-out infinite;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes thinkingPulse {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes debugFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .debug-character-assistant {
            bottom: 20px;
            right: 20px;
          }
          .debug-speech-bubble {
            max-width: 250px;
            right: -15px;
          }
        }
        
        @media (max-width: 480px) {
          .debug-character-assistant {
            bottom: 15px;
            right: 15px;
          }
          .debug-character-circle {
            width: 60px;
            height: 60px;
            font-size: 20px;
          }
          .debug-speech-bubble {
            max-width: 200px;
            right: -20px;
            font-size: 12px;
            padding: 10px 14px;
          }
        }
      `}</style>

      <div className="debug-character-assistant">
        {showMessage && (
          <div className="debug-speech-bubble">
            {isThinking ? (
              <div className="debug-thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <p style={{ margin: 0, lineHeight: 1.4 }}>{currentMessage}</p>
            )}
          </div>
        )}

        <div
          className={`debug-character-circle ${
            !isThinking ? "debug-floating-animation" : ""
          }`}
          onClick={handleClick}
          title="Klik for motivation!"
        >
          🤔
        </div>
      </div>
    </>
  );
};

export default CharacterAssistant;

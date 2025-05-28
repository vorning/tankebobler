import { useState, useEffect } from "react";

const MainCharacterSofie = ({
  size = "xl",
  mood = "happy",
  interactive = true,
  showSpeechBubble = true,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [eyesBlink, setEyesBlink] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Sofies beskeder inspireret af "Sofies Verden"
  const sofieMessages = {
    welcome: [
      "Hej! Jeg er Sofie! Klar til at udforske verdens mysterier? 🌟",
      "Velkommen tilbage! Hvad skal vi lære i dag? ✨",
      "Fantastisk at se dig igen! Lad os tænke sammen! 💭",
    ],
    motivation: [
      "Du tænker virkelig som en filosof! 🤔",
      "Husker du spørgsmålet: Hvem er du? Det undersøger vi sammen! 🌟",
      "Hver ny lektion gør dig klogere! Alberto ville være stolt! 📚",
      "Filosofi handler om at undre sig - og det gør du perfekt! ✨",
      "Kom, lad os udforske tankernes verden sammen! 🌍",
    ],
    excited: [
      "Wow! Du bliver rigtig dygtig til at tænke! 🎉",
      "Det er så spændende at lære sammen med dig! ⚡",
      "Du stiller de bedste spørgsmål! 💫",
    ],
  };

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Vis velkomstbesked ved første load
  useEffect(() => {
    if (interactive && showSpeechBubble) {
      const timer = setTimeout(() => {
        showRandomMessage("welcome");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const showRandomMessage = (type = "motivation", duration = 4000) => {
    if (!interactive || !showSpeechBubble) return;

    const messages = sofieMessages[type] || sofieMessages.motivation;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    setIsThinking(true);
    setShowMessage(true);

    setTimeout(() => {
      setCurrentMessage(randomMessage);
      setIsThinking(false);
    }, 800);

    setTimeout(() => {
      setShowMessage(false);
    }, duration + 800);
  };

  const handleSofieClick = () => {
    if (interactive) {
      const messageType = Math.random() > 0.7 ? "excited" : "motivation";
      showRandomMessage(messageType);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "xl":
        return {
          width: "120px",
          height: "120px",
          fontSize: "20px",
          bubbleBottom: "140px", // Tilbage til original
        };
      case "large":
        return {
          width: "96px",
          height: "96px",
          fontSize: "18px",
          bubbleBottom: "110px", // Tilbage til original
        };
      case "medium":
        return {
          width: "80px",
          height: "80px",
          fontSize: "16px",
          bubbleBottom: "95px", // Tilbage til original
        };
      default:
        return {
          width: "80px",
          height: "80px",
          fontSize: "16px",
          bubbleBottom: "95px", // Tilbage til original
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <div style={{ position: "relative", zIndex: 1, marginTop: "40px" }}>
      {/* Sofies Speech Bubble - forbedret positioning */}
      {interactive && showSpeechBubble && showMessage && (
        <div
          style={{
            position: "absolute",
            bottom: sizeStyles.bubbleBottom,
            right: "-20px",
            zIndex: 30,
            animation: "slideInUp 0.4s ease-out",
          }}
        >
          <div
            style={{
              background: "white",
              border: "3px solid #F59E0B",
              borderRadius: "20px",
              padding: "16px 20px",
              boxShadow: "0 8px 25px rgba(245, 158, 11, 0.3)",
              maxWidth: "320px",
              minWidth: "200px",
              fontFamily: "'Fredoka', sans-serif",
              position: "relative",
            }}
          >
            {isThinking ? (
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "24px",
                }}
              >
                <div
                  className="thinking-dot"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#F59E0B",
                    borderRadius: "50%",
                    animation: "bounce 1.4s ease-in-out infinite",
                  }}
                ></div>
                <div
                  className="thinking-dot"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#FBBF24",
                    borderRadius: "50%",
                    animation: "bounce 1.4s ease-in-out infinite",
                    animationDelay: "0.15s",
                  }}
                ></div>
                <div
                  className="thinking-dot"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#FCD34D",
                    borderRadius: "50%",
                    animation: "bounce 1.4s ease-in-out infinite",
                    animationDelay: "0.3s",
                  }}
                ></div>
              </div>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: "#92400E",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  textAlign: "center",
                }}
              >
                {currentMessage}
              </p>
            )}
          </div>

          {/* Speech bubble arrow - forbedret */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "40px",
              marginTop: "-3px",
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "12px solid #F59E0B",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "42px",
              marginTop: "-6px",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white",
            }}
          ></div>
        </div>
      )}

      {/* Sofie Character - forbedret design */}
      <div
        style={{
          ...sizeStyles,
          background:
            "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FBBF24 100%)",
          border: "4px solid #F59E0B",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none", // Tilføj denne linje
          WebkitUserSelect: "none", // For Safari
          MozUserSelect: "none", // For Firefox
          cursor: "pointer", // Tilføj denne linje

          boxShadow: isHovering
            ? "0 12px 30px rgba(245, 158, 11, 0.4), 0 0 0 4px rgba(245, 158, 11, 0.2)"
            : "0 8px 25px rgba(245, 158, 11, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          animation: "sofie-float 4s ease-in-out infinite",
          transform: isHovering ? "scale(1.1)" : "scale(1)",
          overflow: "hidden",
        }}
        onClick={handleSofieClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Glowing background effect */}
        <div
          style={{
            position: "absolute",
            inset: "-2px",
            background:
              "linear-gradient(45deg, #F59E0B, #FBBF24, #FCD34D, #F59E0B)",
            borderRadius: "50%",
            zIndex: -1,
            animation: "rotate 4s linear infinite",
            opacity: isHovering ? 0.7 : 0,
          }}
        ></div>

        {/* Sofies kropp/ansigt */}
        <div
          style={{
            width: "85%",
            height: "85%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FDBA74 0%, #FB923C 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "inset 0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Hår - forbedret styling */}
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "60%",
              background: "linear-gradient(135deg, #92400E 0%, #B45309 100%)",
              borderRadius: "50px 50px 20px 20px",
              zIndex: -1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          ></div>

          {/* Hår detaljer */}
          <div
            style={{
              position: "absolute",
              top: "-12px",
              left: "20%",
              width: "15px",
              height: "25px",
              background: "#A16207",
              borderRadius: "50%",
              transform: "rotate(-20deg)",
              zIndex: -1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "25%",
              width: "12px",
              height: "20px",
              background: "#A16207",
              borderRadius: "50%",
              transform: "rotate(15deg)",
              zIndex: -1,
            }}
          ></div>

          {/* Ansigt container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Øjne - forbedret animation */}
            <div
              style={{
                display: "flex",
                gap: size === "xl" ? "12px" : "10px",
                marginBottom: "8px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  width: size === "xl" ? "10px" : "8px",
                  height: eyesBlink ? "2px" : size === "xl" ? "10px" : "8px",
                  background: "#1F2937",
                  borderRadius: eyesBlink ? "2px" : "50%",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                {/* Øje glint */}
                {!eyesBlink && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      width: "3px",
                      height: "3px",
                      background: "white",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
              </div>
              <div
                style={{
                  width: size === "xl" ? "10px" : "8px",
                  height: eyesBlink ? "2px" : size === "xl" ? "10px" : "8px",
                  background: "#1F2937",
                  borderRadius: eyesBlink ? "2px" : "50%",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                {/* Øje glint */}
                {!eyesBlink && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      width: "3px",
                      height: "3px",
                      background: "white",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
              </div>
            </div>

            {/* Næse */}
            <div
              style={{
                width: "4px",
                height: "6px",
                background: "#EA580C",
                borderRadius: "50%",
                marginBottom: "4px",
                opacity: 0.7,
              }}
            ></div>

            {/* Mund - animeret baseret på mood */}
            <div
              style={{
                width: size === "xl" ? "18px" : "14px",
                height: size === "xl" ? "9px" : "7px",
                border: "3px solid #1F2937",
                borderTop: "none",
                borderRadius: "0 0 18px 18px",
                marginTop: "2px",
                animation: isHovering
                  ? "smile-wiggle 0.5s ease-in-out"
                  : "none",
              }}
            ></div>

            {/* Kinder (blush) */}
            <div
              style={{
                position: "absolute",
                left: "15%",
                top: "55%",
                width: "12px",
                height: "8px",
                background: "#FCA5A5",
                borderRadius: "50%",
                opacity: 0.6,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                right: "15%",
                top: "55%",
                width: "12px",
                height: "8px",
                background: "#FCA5A5",
                borderRadius: "50%",
                opacity: 0.6,
              }}
            ></div>
          </div>
        </div>

        {/* Magiske partikler omkring Sofie */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            right: "-8px",
            fontSize: "16px",
            animation: "sparkle-orbit 3s ease-in-out infinite",
            transformOrigin: "50px 50px",
          }}
        >
          ✨
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "-12px",
            fontSize: "12px",
            animation: "sparkle-orbit 4s ease-in-out infinite reverse",
            transformOrigin: "50px 50px",
            animationDelay: "1s",
          }}
        >
          ⭐
        </div>

        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "-16px",
            fontSize: "14px",
            animation: "sparkle-float 3s ease-in-out infinite",
            animationDelay: "2s",
          }}
        >
          💫
        </div>

        {/* Filosofi bog ikon */}
        <div
          style={{
            position: "absolute",
            bottom: "-16px",
            right: "-16px",
            fontSize: "18px",
            animation: "book-bounce 2s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
        >
          📚
        </div>
      </div>

      {/* Forbedrede CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes sofie-float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            33% { 
              transform: translateY(-8px) rotate(1deg); 
            }
            66% { 
              transform: translateY(-4px) rotate(-1deg); 
            }
          }
          
          @keyframes sparkle-orbit {
            0% { 
              transform: rotate(0deg) translateX(20px) rotate(0deg);
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
            100% { 
              transform: rotate(360deg) translateX(20px) rotate(-360deg);
              opacity: 0.7;
            }
          }
          
          @keyframes sparkle-float {
            0%, 100% { 
              transform: translateY(0px) scale(1);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-12px) scale(1.2);
              opacity: 1;
            }
          }
          
          @keyframes book-bounce {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            50% { 
              transform: translateY(-6px) rotate(10deg);
            }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
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
          
          @keyframes smile-wiggle {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-2deg); }
            75% { transform: scale(1.1) rotate(2deg); }
          }
        `,
        }}
      />
    </div>
  );
};

export default MainCharacterSofie;

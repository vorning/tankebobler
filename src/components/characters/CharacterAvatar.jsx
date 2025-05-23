import React from "react";

const CharacterAvatar = ({
  character = "filo",
  size = "medium",
  mood = "happy",
  className = "",
}) => {
  const sizes = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 },
    xl: { width: 120, height: 120 },
  };

  const characterColors = {
    filo: {
      primary: "#6366F1",
      secondary: "#8B5CF6",
      accent: "#F59E0B",
      skin: "#FDBCB4",
    },
    etika: {
      primary: "#059669",
      secondary: "#10B981",
      accent: "#34D399",
      skin: "#FBBF84",
    },
    historikus: {
      primary: "#D97706",
      secondary: "#F59E0B",
      accent: "#FBBF24",
      skin: "#F3C5A7",
    },
    logika: {
      primary: "#2563EB",
      secondary: "#3B82F6",
      accent: "#60A5FA",
      skin: "#FDE2E7",
    },
  };

  const colors = characterColors[character] || characterColors.filo;
  const { width, height } = sizes[size];

  // Tilføjet manglende getEyeAnimation funktion
  const getEyeAnimation = () => {
    return `
      .eye-${character}-${size} {
        transform-origin: center;
        animation: eyeBlink-${character}-${size} 4s ease-in-out infinite;
      }
      @keyframes eyeBlink-${character}-${size} {
        0%, 90%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.1); }
      }
    `;
  };

  // Gentle floating animation for the whole avatar
  const getFloatAnimation = () => {
    return `
      .character-avatar-${character}-${size} {
        animation: float-${character}-${size} 3s ease-in-out infinite;
      }
      @keyframes float-${character}-${size} {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-2px) scale(1.01); }
      }
      .character-avatar-${character}-${size}:hover {
        animation: characterHover-${character}-${size} 0.3s ease-out;
      }
      @keyframes characterHover-${character}-${size} {
        0% { transform: scale(1); }
        50% { transform: scale(1.08); }
        100% { transform: scale(1.03); }
      }
    `;
  };

  // Face expressions based on mood
  const getFacialFeatures = () => {
    const features = {
      happy: {
        eyeHeight: 3,
        eyeY: 14,
        mouthPath: "M12,18 Q16,21 20,18",
        mouthStroke: "#2C3E50",
        cheekColor: "#FF9999",
      },
      thinking: {
        eyeHeight: 2,
        eyeY: 14.5,
        mouthPath: "M14,18 Q16,17 18,18",
        mouthStroke: "#2C3E50",
        cheekColor: "none",
      },
      excited: {
        eyeHeight: 4,
        eyeY: 13,
        mouthPath: "M11,17 Q16,22 21,17",
        mouthStroke: "#2C3E50",
        cheekColor: "#FF7777",
      },
      surprised: {
        eyeHeight: 5,
        eyeY: 12,
        mouthPath: "M15,18 Q16,20 17,18",
        mouthStroke: "#2C3E50",
        cheekColor: "none",
      },
    };
    return features[mood] || features.happy;
  };

  const facial = getFacialFeatures();

  // Filo - Hauptcharakter (filosofisk guide)
  if (character === "filo") {
    return (
      <div className={`character-avatar-container ${className}`}>
        <style>
          {getEyeAnimation()}
          {getFloatAnimation()}
        </style>
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          className={`character-avatar character-filo character-avatar-${character}-${size}`}
        >
          {/* White background circle to stand out from purple background */}
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          />

          {/* Subtle inner glow */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke={colors.accent}
            strokeWidth="0.5"
            opacity="0.3"
            strokeDasharray="2,4"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 16 16;360 16 16"
              dur="25s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Main head */}
          <ellipse cx="16" cy="15" rx="9" ry="10" fill={colors.skin} />

          {/* Hair with gradient */}
          <path
            d="M7,12 Q8,6 16,7 Q24,6 25,12 Q24,8 20,8 Q16,6 12,8 Q8,8 7,12"
            fill={`url(#hairGradient-${size})`}
          />

          {/* Hair details */}
          <path
            d="M10,9 Q12,7 14,9"
            stroke={colors.secondary}
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M18,9 Q20,7 22,9"
            stroke={colors.secondary}
            strokeWidth="0.5"
            fill="none"
          />

          {/* Eyes with animation */}
          <ellipse
            cx="12.5"
            cy={facial.eyeY}
            rx="2"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <ellipse
            cx="19.5"
            cy={facial.eyeY}
            rx="2"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <circle cx="12.5" cy="14.5" r="1.2" fill="#2C3E50" />
          <circle cx="19.5" cy="14.5" r="1.2" fill="#2C3E50" />
          <circle cx="13" cy="14" r="0.3" fill="white" />
          <circle cx="20" cy="14" r="0.3" fill="white" />

          {/* Eyebrows */}
          <path
            d="M10,12 Q12.5,11 15,12"
            stroke="#8B4513"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M17,12 Q19.5,11 22,12"
            stroke="#8B4513"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />

          {/* Nose */}
          <ellipse
            cx="16"
            cy="16"
            rx="0.8"
            ry="1.2"
            fill="none"
            stroke={colors.skin}
            strokeWidth="0.5"
            opacity="0.7"
          />

          {/* Mouth */}
          <path
            d={facial.mouthPath}
            stroke={facial.mouthStroke}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Cheeks if happy/excited */}
          {facial.cheekColor !== "none" && (
            <>
              <circle
                cx="9"
                cy="17"
                r="1.5"
                fill={facial.cheekColor}
                opacity="0.6"
              />
              <circle
                cx="23"
                cy="17"
                r="1.5"
                fill={facial.cheekColor}
                opacity="0.6"
              />
            </>
          )}

          {/* Thought bubbles */}
          <circle cx="6" cy="8" r="1" fill={colors.accent} opacity="0.7">
            <animate
              attributeName="opacity"
              values="0.7;0.3;0.7"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="26" cy="8" r="1.5" fill={colors.accent} opacity="0.5">
            <animate
              attributeName="opacity"
              values="0.5;0.8;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="4" cy="24" r="0.8" fill={colors.accent} opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Gradients */}
          <defs>
            <linearGradient
              id={`filoGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient
              id={`hairGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="50%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Etika - Etisk guide
  if (character === "etika") {
    return (
      <div className={`character-avatar-container ${className}`}>
        <style>
          {getEyeAnimation()}
          {getFloatAnimation()}
        </style>
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          className={`character-avatar character-etika character-avatar-${character}-${size}`}
        >
          {/* White background to stand out */}
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          />

          {/* Main head */}
          <ellipse cx="16" cy="15" rx="9" ry="10" fill={colors.skin} />

          {/* Hair in braids */}
          <path
            d="M7,12 Q8,6 16,7 Q24,6 25,12 Q24,9 16,8 Q8,9 7,12"
            fill={`url(#etikaHairGradient-${size})`}
          />
          <circle cx="9" cy="13" r="2.5" fill={colors.primary} />
          <circle cx="23" cy="13" r="2.5" fill={colors.primary} />
          <circle cx="9" cy="13" r="1.5" fill={colors.secondary} />
          <circle cx="23" cy="13" r="1.5" fill={colors.secondary} />

          {/* Eyes */}
          <ellipse
            cx="12.5"
            cy={facial.eyeY}
            rx="2"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <ellipse
            cx="19.5"
            cy={facial.eyeY}
            rx="2"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <circle cx="12.5" cy="14.5" r="1.2" fill="#4A5568" />
          <circle cx="19.5" cy="14.5" r="1.2" fill="#4A5568" />
          <circle cx="13" cy="14" r="0.3" fill="white" />
          <circle cx="20" cy="14" r="0.3" fill="white" />

          {/* Long eyelashes */}
          <path d="M11,13 L10,12" stroke="#2C3E50" strokeWidth="0.5" />
          <path d="M12,12.5 L11.5,11.5" stroke="#2C3E50" strokeWidth="0.5" />
          <path d="M14,13 L14.5,12" stroke="#2C3E50" strokeWidth="0.5" />
          <path d="M18,13 L17.5,12" stroke="#2C3E50" strokeWidth="0.5" />
          <path d="M20,12.5 L20.5,11.5" stroke="#2C3E50" strokeWidth="0.5" />
          <path d="M21,13 L22,12" stroke="#2C3E50" strokeWidth="0.5" />

          {/* Nose */}
          <ellipse
            cx="16"
            cy="16"
            rx="0.7"
            ry="1"
            fill="none"
            stroke={colors.skin}
            strokeWidth="0.5"
            opacity="0.7"
          />

          {/* Mouth */}
          <path
            d={facial.mouthPath}
            stroke={facial.mouthStroke}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Cheeks */}
          {facial.cheekColor !== "none" && (
            <>
              <circle
                cx="9"
                cy="17"
                r="1.5"
                fill={facial.cheekColor}
                opacity="0.6"
              />
              <circle
                cx="23"
                cy="17"
                r="1.5"
                fill={facial.cheekColor}
                opacity="0.6"
              />
            </>
          )}

          {/* Hearts floating around */}
          <path
            d="M6,8 Q6,6 8,8 Q10,6 10,8 Q10,10 8,12 Q6,10 6,8"
            fill={colors.accent}
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;2,-2;0,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M24,24 Q24,22 25,24 Q26,22 26,24 Q26,25 25,26 Q24,25 24,24"
            fill={colors.accent}
            opacity="0.6"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;-1,1;0,0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          <defs>
            <linearGradient
              id={`etikaGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient
              id={`etikaHairGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Historikus - Historisk guide
  if (character === "historikus") {
    return (
      <div className={`character-avatar-container ${className}`}>
        <style>
          {getEyeAnimation()}
          {getFloatAnimation()}
        </style>
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          className={`character-avatar character-historikus character-avatar-${character}-${size}`}
        >
          {/* White background to stand out */}
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          />

          {/* Main head */}
          <ellipse cx="16" cy="15" rx="9" ry="10" fill={colors.skin} />

          {/* Hair with crown/hat */}
          <path
            d="M7,12 Q8,6 16,7 Q24,6 25,12 Q24,8 20,8 Q16,6 12,8 Q8,8 7,12"
            fill={`url(#historikusHairGradient-${size})`}
          />

          {/* Crown/headband */}
          <rect
            x="8"
            y="8"
            width="16"
            height="2.5"
            fill={colors.accent}
            rx="1.25"
          />
          <circle cx="12" cy="8.5" r="0.8" fill={colors.primary} />
          <circle cx="16" cy="7.5" r="1" fill={colors.primary} />
          <circle cx="20" cy="8.5" r="0.8" fill={colors.primary} />

          {/* Beard */}
          <path
            d="M12,20 Q14,22 16,21 Q18,22 20,20 Q19,24 16,24 Q13,24 12,20"
            fill={`url(#beardGradient-${size})`}
          />

          {/* Eyes */}
          <ellipse
            cx="12.5"
            cy={facial.eyeY}
            rx="2"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <ellipse
            cx="19.5"
            cy={facial.eyeY}
            rx="2"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <circle cx="12.5" cy="14.5" r="1.2" fill="#6B4423" />
          <circle cx="19.5" cy="14.5" r="1.2" fill="#6B4423" />
          <circle cx="13" cy="14" r="0.3" fill="white" />
          <circle cx="20" cy="14" r="0.3" fill="white" />

          {/* Wise eyebrows */}
          <path
            d="M10,12 Q12.5,10.5 15,12"
            stroke="#8B4513"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M17,12 Q19.5,10.5 22,12"
            stroke="#8B4513"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Mouth */}
          <path
            d={facial.mouthPath}
            stroke={facial.mouthStroke}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Scroll symbols */}
          <rect
            x="5"
            y="26"
            width="4"
            height="2"
            fill={colors.accent}
            rx="1"
            opacity="0.8"
          >
            <animate
              attributeName="opacity"
              values="0.8;0.4;0.8"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="23"
            y="26"
            width="4"
            height="2"
            fill={colors.accent}
            rx="1"
            opacity="0.6"
          >
            <animate
              attributeName="opacity"
              values="0.6;0.9;0.6"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </rect>

          <defs>
            <linearGradient
              id={`historikusGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient
              id={`historikusHairGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient
              id={`beardGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Logika - Logisk guide
  if (character === "logika") {
    return (
      <div className={`character-avatar-container ${className}`}>
        <style>
          {getEyeAnimation()}
          {getFloatAnimation()}
        </style>
        <svg
          width={width}
          height={height}
          viewBox="0 0 32 32"
          className={`character-avatar character-logika character-avatar-${character}-${size}`}
        >
          {/* White background to stand out */}
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          />

          {/* Main head */}
          <ellipse cx="16" cy="15" rx="9" ry="10" fill={colors.skin} />

          {/* Structured hair */}
          <path
            d="M7,12 Q8,6 16,7 Q24,6 25,12"
            fill={`url(#logikaHairGradient-${size})`}
          />
          <rect x="10" y="9" width="1.5" height="3" fill={colors.secondary} />
          <rect x="13" y="8" width="1.5" height="4" fill={colors.secondary} />
          <rect x="16" y="7" width="1.5" height="5" fill={colors.secondary} />
          <rect x="19" y="8" width="1.5" height="4" fill={colors.secondary} />

          {/* Glasses */}
          <circle
            cx="12.5"
            cy="14"
            r="3.5"
            stroke={colors.primary}
            strokeWidth="1.5"
            fill="rgba(255,255,255,0.1)"
          />
          <circle
            cx="19.5"
            cy="14"
            r="3.5"
            stroke={colors.primary}
            strokeWidth="1.5"
            fill="rgba(255,255,255,0.1)"
          />
          <line
            x1="16"
            y1="14"
            x2="16"
            y2="14"
            stroke={colors.primary}
            strokeWidth="1.5"
          />

          {/* Glasses bridge */}
          <path
            d="M16,14 Q16,13.5 16,14"
            stroke={colors.primary}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Eyes behind glasses */}
          <ellipse
            cx="12.5"
            cy={facial.eyeY}
            rx="1.8"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <ellipse
            cx="19.5"
            cy={facial.eyeY}
            rx="1.8"
            ry={facial.eyeHeight}
            fill="white"
            className={`eye-${character}-${size}`}
          />
          <circle cx="12.5" cy="14.5" r="1" fill="#2C3E50" />
          <circle cx="19.5" cy="14.5" r="1" fill="#2C3E50" />
          <circle cx="12.8" cy="14.2" r="0.3" fill="white" />
          <circle cx="19.8" cy="14.2" r="0.3" fill="white" />

          {/* Mouth */}
          <path
            d={facial.mouthPath}
            stroke={facial.mouthStroke}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Logic symbols orbiting */}
          <g>
            <text
              x="6"
              y="8"
              fontSize="4"
              fill={colors.accent}
              fontFamily="serif"
            >
              ∀
            </text>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 16 16;360 16 16"
              dur="8s"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <text
              x="26"
              y="12"
              fontSize="4"
              fill={colors.accent}
              fontFamily="serif"
            >
              ∃
            </text>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 16 16;-360 16 16"
              dur="10s"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <text
              x="4"
              y="26"
              fontSize="4"
              fill={colors.accent}
              fontFamily="serif"
            >
              ⟹
            </text>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 16 16;360 16 16"
              dur="12s"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <text
              x="26"
              y="28"
              fontSize="4"
              fill={colors.accent}
              fontFamily="serif"
            >
              ∴
            </text>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 16 16;-360 16 16"
              dur="6s"
              repeatCount="indefinite"
            />
          </g>

          <defs>
            <linearGradient
              id={`logikaGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient
              id={`logikaHairGradient-${size}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Fallback til Filo hvis ukendt karakter
  return null;
};

export default CharacterAvatar;

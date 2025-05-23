import React from "react";

const PersonalAvatar = ({
  avatar = "student1",
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

  const { width, height } = sizes[size];

  // Personal avatar styles - more relatable to students
  const avatarStyles = {
    student1: {
      name: "Alex",
      hairColor: "#8B4513",
      skinColor: "#FDBCB4",
      eyeColor: "#4A5568",
      shirtColor: "#3B82F6",
      accessories: "none",
    },
    student2: {
      name: "Emma",
      hairColor: "#FFD700",
      skinColor: "#F3C5A7",
      eyeColor: "#2D3748",
      shirtColor: "#EF4444",
      accessories: "glasses",
    },
    student3: {
      name: "David",
      hairColor: "#2C1810",
      skinColor: "#8D5524",
      eyeColor: "#1A202C",
      shirtColor: "#10B981",
      accessories: "none",
    },
    student4: {
      name: "Sophie",
      hairColor: "#C53030",
      skinColor: "#FDBCB4",
      eyeColor: "#2B6CB0",
      shirtColor: "#9F7AEA",
      accessories: "headband",
    },
    student5: {
      name: "Marcus",
      hairColor: "#1A202C",
      skinColor: "#D69E2E",
      eyeColor: "#2D3748",
      shirtColor: "#F56565",
      accessories: "cap",
    },
    student6: {
      name: "Luna",
      hairColor: "#6B46C1",
      skinColor: "#FBB6CE",
      eyeColor: "#553C9A",
      shirtColor: "#F59E0B",
      accessories: "earrings",
    },
    student7: {
      name: "Oliver",
      hairColor: "#D97706",
      skinColor: "#FDBCB4",
      eyeColor: "#065F46",
      shirtColor: "#1E40AF",
      accessories: "none",
    },
    student8: {
      name: "Zara",
      hairColor: "#0F172A",
      skinColor: "#92400E",
      eyeColor: "#1F2937",
      shirtColor: "#7C3AED",
      accessories: "necklace",
    },
  };

  const style = avatarStyles[avatar] || avatarStyles.student1;

  // Face expressions based on mood
  const getFacialFeatures = () => {
    const features = {
      happy: {
        eyeHeight: 3,
        eyeY: 14,
        mouthPath: "M12,18 Q16,21 20,18",
        eyebrowY: 12,
      },
      thinking: {
        eyeHeight: 2,
        eyeY: 14.5,
        mouthPath: "M14,18 Q16,17 18,18",
        eyebrowY: 11.5,
      },
      excited: {
        eyeHeight: 4,
        eyeY: 13,
        mouthPath: "M11,17 Q16,22 21,17",
        eyebrowY: 11,
      },
      focused: {
        eyeHeight: 2.5,
        eyeY: 14,
        mouthPath: "M14,18 L18,18",
        eyebrowY: 12,
      },
    };
    return features[mood] || features.happy;
  };

  const facial = getFacialFeatures();

  // Animation styles
  const getAnimationStyles = () => {
    return `
      .personal-avatar-${avatar}-${size} {
        animation: personalFloat-${avatar}-${size} 4s ease-in-out infinite;
      }
      @keyframes personalFloat-${avatar}-${size} {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-2px) scale(1.02); }
      }
      .personal-avatar-${avatar}-${size}:hover {
        animation: personalHover-${avatar}-${size} 0.3s ease-out;
      }
      @keyframes personalHover-${avatar}-${size} {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1.05); }
      }
    `;
  };

  return (
    <div className={`personal-avatar-container ${className}`}>
      <style>{getAnimationStyles()}</style>
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        className={`personal-avatar personal-avatar-${avatar}-${size}`}
      >
        {/* Background circle - subtle */}
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1"
        />

        {/* Main head */}
        <ellipse cx="16" cy="15.5" rx="8.5" ry="9" fill={style.skinColor} />

        {/* Hair - different styles based on avatar */}
        {avatar === "student1" && (
          <path
            d="M7.5,12 Q8,7 16,8 Q24,7 24.5,12 Q23,9 16,8.5 Q9,9 7.5,12"
            fill={style.hairColor}
          />
        )}

        {avatar === "student2" && (
          <>
            <path
              d="M7.5,12 Q8,7 16,8 Q24,7 24.5,12 Q23,9 16,8.5 Q9,9 7.5,12"
              fill={style.hairColor}
            />
            <path d="M9,11 Q11,9 13,11" fill={style.hairColor} />
            <path d="M19,11 Q21,9 23,11" fill={style.hairColor} />
          </>
        )}

        {avatar === "student3" && (
          <path
            d="M7.5,12 Q8,6 16,7.5 Q24,6 24.5,12 Q22,8 16,8 Q10,8 7.5,12"
            fill={style.hairColor}
          />
        )}

        {avatar === "student4" && (
          <>
            <path
              d="M7.5,12 Q8,7 16,8 Q24,7 24.5,12 Q23,9 16,8.5 Q9,9 7.5,12"
              fill={style.hairColor}
            />
            <circle cx="10" cy="12" r="2" fill={style.hairColor} />
            <circle cx="22" cy="12" r="2" fill={style.hairColor} />
          </>
        )}

        {avatar === "student5" && (
          <>
            <path
              d="M7.5,12 Q8,7 16,8 Q24,7 24.5,12 Q23,9 16,8.5 Q9,9 7.5,12"
              fill={style.hairColor}
            />
            <rect x="10" y="7" width="12" height="4" fill="#2D3748" rx="2" />
          </>
        )}

        {avatar === "student6" && (
          <>
            <path
              d="M7.5,12 Q8,7 16,8 Q24,7 24.5,12 Q23,9 16,8.5 Q9,9 7.5,12"
              fill={style.hairColor}
            />
            <path d="M8,10 Q10,8 12,10" fill={style.hairColor} />
            <path d="M20,10 Q22,8 24,10" fill={style.hairColor} />
          </>
        )}

        {avatar === "student7" && (
          <path
            d="M7.5,12 Q8,6.5 16,7.5 Q24,6.5 24.5,12 Q22,8.5 16,8 Q10,8.5 7.5,12"
            fill={style.hairColor}
          />
        )}

        {avatar === "student8" && (
          <>
            <path
              d="M7.5,12 Q8,7 16,8 Q24,7 24.5,12 Q23,9 16,8.5 Q9,9 7.5,12"
              fill={style.hairColor}
            />
            <path d="M7,13 Q8,11 10,13" fill={style.hairColor} />
            <path d="M22,13 Q24,11 25,13" fill={style.hairColor} />
          </>
        )}

        {/* Eyes */}
        <ellipse
          cx="12.5"
          cy={facial.eyeY}
          rx="2"
          ry={facial.eyeHeight}
          fill="white"
          className={`personal-eye-${avatar}-${size}`}
        />
        <ellipse
          cx="19.5"
          cy={facial.eyeY}
          rx="2"
          ry={facial.eyeHeight}
          fill="white"
          className={`personal-eye-${avatar}-${size}`}
        />
        <circle cx="12.5" cy="14.5" r="1.1" fill={style.eyeColor} />
        <circle cx="19.5" cy="14.5" r="1.1" fill={style.eyeColor} />
        <circle cx="12.8" cy="14.2" r="0.3" fill="white" />
        <circle cx="19.8" cy="14.2" r="0.3" fill="white" />

        {/* Eyebrows */}
        <path
          d={`M10,${facial.eyebrowY} Q12.5,${facial.eyebrowY - 1} 15,${
            facial.eyebrowY
          }`}
          stroke={style.hairColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M17,${facial.eyebrowY} Q19.5,${facial.eyebrowY - 1} 22,${
            facial.eyebrowY
          }`}
          stroke={style.hairColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Nose */}
        <ellipse
          cx="16"
          cy="16.5"
          rx="0.7"
          ry="1"
          fill="none"
          stroke={style.skinColor}
          strokeWidth="0.5"
          opacity="0.7"
        />

        {/* Mouth */}
        <path
          d={facial.mouthPath}
          stroke="#2D3748"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Shirt/clothing */}
        <path d="M8,24 Q16,26 24,24 L24,32 L8,32 Z" fill={style.shirtColor} />
        <path
          d="M8,24 Q16,25 24,24"
          stroke={style.shirtColor}
          strokeWidth="1"
          opacity="0.7"
        />

        {/* Accessories */}
        {style.accessories === "glasses" && (
          <>
            <circle
              cx="12.5"
              cy="14"
              r="3"
              stroke="#2D3748"
              strokeWidth="1.2"
              fill="none"
              opacity="0.8"
            />
            <circle
              cx="19.5"
              cy="14"
              r="3"
              stroke="#2D3748"
              strokeWidth="1.2"
              fill="none"
              opacity="0.8"
            />
            <line
              x1="15.5"
              y1="14"
              x2="16.5"
              y2="14"
              stroke="#2D3748"
              strokeWidth="1.2"
            />
          </>
        )}

        {style.accessories === "headband" && (
          <rect x="9" y="9" width="14" height="1.5" fill="#E53E3E" rx="0.75" />
        )}

        {style.accessories === "cap" && (
          <path d="M8,10 Q16,6 24,10 L26,8 Q16,4 6,8 Z" fill="#2D3748" />
        )}

        {style.accessories === "earrings" && (
          <>
            <circle cx="8" cy="16" r="1" fill="#F59E0B" />
            <circle cx="24" cy="16" r="1" fill="#F59E0B" />
          </>
        )}

        {style.accessories === "necklace" && (
          <circle cx="16" cy="22" r="1.5" fill="#F59E0B" />
        )}

        {/* Cheeks for happy mood */}
        {mood === "happy" && (
          <>
            <circle cx="9.5" cy="17" r="1.2" fill="#FFB3BA" opacity="0.6" />
            <circle cx="22.5" cy="17" r="1.2" fill="#FFB3BA" opacity="0.6" />
          </>
        )}
      </svg>
    </div>
  );
};

export default PersonalAvatar;

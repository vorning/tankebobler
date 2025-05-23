import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLearning } from "../context/LearningContext";
import CharacterAvatar from "../components/characters/CharacterAvatar";
import {
  Trophy,
  Star,
  Target,
  Zap,
  Brain,
  BookOpen,
  Award,
  Lock,
  Calendar,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import "./AchievementsPage.css";

const AchievementsPage = () => {
  const { user } = useUser();
  const { availablePaths, getPathProgress } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Trigger progress animation when component mounts
    setTimeout(() => setAnimateProgress(true), 200);
  }, []);

  // Definer alle mulige achievements
  const allAchievements = [
    // Begynder achievements
    {
      id: "first_lesson",
      name: "Første Skridt",
      description: "Gennemfør din første lektion",
      icon: BookOpen,
      category: "learning",
      xpReward: 25,
      rarity: "common",
      unlocked: user.completedLessons.length >= 1,
    },
    {
      id: "first_quiz",
      name: "Quiz Begynder",
      description: "Gennemfør din første quiz",
      icon: Brain,
      category: "quiz",
      xpReward: 30,
      rarity: "common",
      unlocked: user.completedLessons.length >= 1, // Simplified - assume first lesson has quiz
    },
    {
      id: "level_2",
      name: "Tænker i Vækst",
      description: "Nå Level 2",
      icon: TrendingUp,
      category: "progress",
      xpReward: 50,
      rarity: "common",
      unlocked: user.level >= 2,
    },

    // Læring achievements
    {
      id: "five_lessons",
      name: "Dedikeret Studerende",
      description: "Gennemfør 5 lektioner",
      icon: BookOpen,
      category: "learning",
      xpReward: 75,
      rarity: "uncommon",
      unlocked: user.completedLessons.length >= 5,
    },
    {
      id: "ten_lessons",
      name: "Viden Samler",
      description: "Gennemfør 10 lektioner",
      icon: Award,
      category: "learning",
      xpReward: 100,
      rarity: "rare",
      unlocked: user.completedLessons.length >= 10,
    },
    {
      id: "complete_path",
      name: "Sti Mester",
      description: "Gennemfør en hel læringssti",
      icon: Trophy,
      category: "learning",
      xpReward: 150,
      rarity: "epic",
      unlocked: availablePaths.some((path) => {
        const pathProgress = getPathProgress(path.id);
        return pathProgress === 100;
      }),
    },

    // Quiz achievements
    {
      id: "quiz_master",
      name: "Quiz Mester",
      description: "Få over 80% i en quiz",
      icon: Star,
      category: "quiz",
      xpReward: 50,
      rarity: "uncommon",
      unlocked: user.completedLessons.length >= 3, // Simplified logic
    },
    {
      id: "perfect_quiz",
      name: "Perfektionist",
      description: "Få 100% i en quiz",
      icon: Target,
      category: "quiz",
      xpReward: 100,
      rarity: "rare",
      unlocked: user.completedLessons.length >= 5, // Simplified
    },
    {
      id: "quiz_streak",
      name: "Quiz Stribe",
      description: "Gennemfør 5 quizzer i træk med over 75%",
      icon: Zap,
      category: "quiz",
      xpReward: 125,
      rarity: "epic",
      unlocked: user.completedLessons.length >= 8,
    },

    // Level achievements
    {
      id: "level_5",
      name: "Filosofisk Nybegynder",
      description: "Nå Level 5",
      icon: Brain,
      category: "progress",
      xpReward: 150,
      rarity: "uncommon",
      unlocked: user.level >= 5,
    },
    {
      id: "level_10",
      name: "Erfaren Tænker",
      description: "Nå Level 10",
      icon: Trophy,
      category: "progress",
      xpReward: 250,
      rarity: "rare",
      unlocked: user.level >= 10,
    },
    {
      id: "level_15",
      name: "Filosof i Udvikling",
      description: "Nå Level 15",
      icon: Award,
      category: "progress",
      xpReward: 400,
      rarity: "epic",
      unlocked: user.level >= 15,
    },

    // Specielle achievements
    {
      id: "curious_mind",
      name: "Nysgerrig Sjæl",
      description: "Stil 10 spørgsmål til karaktererne",
      icon: Brain,
      category: "special",
      xpReward: 75,
      rarity: "uncommon",
      unlocked: user.completedLessons.length >= 6, // Simplified
    },
    {
      id: "daily_learner",
      name: "Daglig Lærende",
      description: "Log ind 7 dage i træk",
      icon: Calendar,
      category: "special",
      xpReward: 100,
      rarity: "rare",
      unlocked: user.level >= 3, // Simplified
    },
    {
      id: "philosopher_king",
      name: "Filosofkonge",
      description: "Gennemfør alle tilgængelige læringsstier",
      icon: Trophy,
      category: "special",
      xpReward: 500,
      rarity: "legendary",
      unlocked: availablePaths.every((path) => {
        const pathProgress = getPathProgress(path.id);
        return pathProgress === 100;
      }),
    },
  ];

  const categories = [
    { id: "all", name: "Alle", icon: Trophy },
    { id: "learning", name: "Læring", icon: BookOpen },
    { id: "quiz", name: "Quizzer", icon: Brain },
    { id: "progress", name: "Fremgang", icon: TrendingUp },
    { id: "special", name: "Specielle", icon: Star },
  ];

  const rarityColors = {
    common: "#95A5A6",
    uncommon: "#2ECC71",
    rare: "#3498DB",
    epic: "#9B59B6",
    legendary: "#F39C12",
  };

  const rarityNames = {
    common: "Almindelig",
    uncommon: "Ualmindelig",
    rare: "Sjælden",
    epic: "Episk",
    legendary: "Legendarisk",
  };

  // Filtrer achievements baseret på kategori
  const filteredAchievements =
    selectedCategory === "all"
      ? allAchievements
      : allAchievements.filter(
          (achievement) => achievement.category === selectedCategory
        );

  const unlockedAchievements = filteredAchievements.filter((a) => a.unlocked);
  const lockedAchievements = filteredAchievements.filter((a) => !a.unlocked);

  // Beregn statistikker
  const totalAchievements = allAchievements.length;
  const totalUnlocked = allAchievements.filter((a) => a.unlocked).length;
  const completionPercentage = Math.round(
    (totalUnlocked / totalAchievements) * 100
  );
  const totalXPEarned = allAchievements
    .filter((a) => a.unlocked)
    .reduce((total, achievement) => total + (achievement.xpReward || 0), 0);

  return (
    <div className="achievements-page">
      {/* Header med statistikker */}
      <section className="achievements-header">
        <div className="header-content animate-slide-in-up">
          <div className="header-text">
            <h1>Dine Præstationer</h1>
            <p>
              Udforsk alle dine opnåelser og se hvad du kan låse op næste gang
            </p>
          </div>

          <div className="achievements-stats">
            <div className="stat-card animate-slide-in-left animate-delay-100">
              <div className="stat-icon">
                <Trophy size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{totalUnlocked}</div>
                <div className="stat-label">Opnået</div>
                <div className="stat-detail">af {totalAchievements} total</div>
              </div>
            </div>

            <div className="stat-card animate-slide-in-left animate-delay-200">
              <div className="stat-icon">
                <Target size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{completionPercentage}%</div>
                <div className="stat-label">Færdig</div>
                <div className="stat-detail">gennemførselsrate</div>
              </div>
            </div>

            <div className="stat-card animate-slide-in-left animate-delay-300">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{totalXPEarned}</div>
                <div className="stat-label">XP Optjent</div>
                <div className="stat-detail">fra achievements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar for total completion */}
        <div className="completion-progress">
          <div className="progress-text">
            <span>Samlet fremgang</span>
            <span>
              {totalUnlocked}/{totalAchievements}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${
                animateProgress ? "achievements-progress-animated" : ""
              }`}
              style={{
                width: animateProgress ? `${completionPercentage}%` : "0%",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Kategori filter */}
      <section className="category-filter">
        <div className="filter-tabs">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const categoryCount = allAchievements
              .filter((a) =>
                category.id === "all" ? true : a.category === category.id
              )
              .filter((a) => a.unlocked).length;

            return (
              <button
                key={category.id}
                className={`filter-tab ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent size={20} />
                <span>{category.name}</span>
                <div className="tab-count">{categoryCount}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Achievements grid */}
      <section className="achievements-grid-section">
        {/* Unlocked achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="achievements-group">
            <h2 className="group-title">
              <Trophy size={24} />
              Opnåede præstationer ({unlockedAchievements.length})
            </h2>

            <div className="achievements-grid">
              {unlockedAchievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className="achievement-card unlocked animate-zoom-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      borderColor: rarityColors[achievement.rarity],
                    }}
                  >
                    <div className="achievement-header">
                      <div
                        className="achievement-icon"
                        style={{ background: rarityColors[achievement.rarity] }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div
                        className="rarity-badge"
                        style={{ background: rarityColors[achievement.rarity] }}
                      >
                        {rarityNames[achievement.rarity]}
                      </div>
                    </div>

                    <div className="achievement-content">
                      <h3>{achievement.name}</h3>
                      <p>{achievement.description}</p>

                      <div className="achievement-reward">
                        <Star size={16} />
                        <span>+{achievement.xpReward} XP</span>
                      </div>
                    </div>

                    <div className="achievement-status unlocked-status">
                      <CheckCircle size={16} />
                      <span>Opnået!</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Locked achievements */}
        {lockedAchievements.length > 0 && (
          <div className="achievements-group">
            <h2 className="group-title">
              <Lock size={24} />
              Kommende udfordringer ({lockedAchievements.length})
            </h2>

            <div className="achievements-grid">
              {lockedAchievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className="achievement-card locked animate-zoom-in"
                    style={{
                      animationDelay: `${
                        (unlockedAchievements.length + index) * 0.1
                      }s`,
                    }}
                  >
                    <div className="achievement-header">
                      <div className="achievement-icon locked-icon">
                        <Lock size={24} />
                      </div>
                      <div
                        className="rarity-badge locked-rarity"
                        style={{ background: rarityColors[achievement.rarity] }}
                      >
                        {rarityNames[achievement.rarity]}
                      </div>
                    </div>

                    <div className="achievement-content">
                      <h3>{achievement.name}</h3>
                      <p>{achievement.description}</p>

                      <div className="achievement-reward locked-reward">
                        <Star size={16} />
                        <span>+{achievement.xpReward} XP</span>
                      </div>
                    </div>

                    <div className="achievement-status locked-status">
                      <Lock size={16} />
                      <span>Ikke opnået</span>
                    </div>

                    <div className="locked-overlay">
                      <Lock size={32} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Encouragement section */}
      <section className="encouragement-section">
        <div className="encouragement-card">
          <div className="encouragement-character">
            <CharacterAvatar character="filo" size="large" mood="excited" />
          </div>
          <div className="encouragement-content">
            <h3>Fortsæt det gode arbejde!</h3>
            <p>
              {totalUnlocked < 5
                ? "Du er godt i gang! Fortsæt med at gennemføre lektioner for at låse flere præstationer op."
                : totalUnlocked < 10
                ? "Fantastisk fremgang! Du er ved at blive en rigtig filosof."
                : "Utroligt arbejde! Du er en sand mester i filosofisk tænkning!"}
            </p>

            {lockedAchievements.length > 0 && (
              <div className="next-achievement">
                <h4>Næste mål:</h4>
                <div className="next-achievement-preview">
                  <div className="next-icon">
                    <Lock size={20} />
                  </div>
                  <div className="next-info">
                    <span className="next-name">
                      {lockedAchievements[0].name}
                    </span>
                    <span className="next-desc">
                      {lockedAchievements[0].description}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rarity guide */}
      <section className="rarity-guide">
        <h3>Sjældenhedsguide</h3>
        <div className="rarity-items">
          {Object.entries(rarityColors).map(([rarity, color]) => (
            <div key={rarity} className="rarity-item">
              <div className="rarity-color" style={{ background: color }}></div>
              <span>{rarityNames[rarity]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;

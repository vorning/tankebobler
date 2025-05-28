import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLearning } from "../context/LearningContext";
import CharacterAvatar from "../components/characters/CharacterAvatar";
import MainCharacterSofie from "../components/characters/MainCharacterSofie";
import {
  Brain,
  BookOpen,
  Star,
  Users,
  Trophy,
  Zap,
  Sparkles,
  Gamepad2,
  Target,
  Rocket,
} from "lucide-react";
import "./HomePage.css";

const HomePage = () => {
  const { user, updateUser } = useUser();
  const { availablePaths, getPathProgress } = useLearning();
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [animateProgress, setAnimateProgress] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(true);

  useEffect(() => {
    if (!user.created) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
      setTimeout(() => setAnimateProgress(true), 100);
    }
  }, [user.created]);

  const handleCreateProfile = (e) => {
    e.preventDefault();
    if (userName.trim() && userAge) {
      updateUser({
        name: userName.trim(),
        age: parseInt(userAge),
        created: true,
      });
      setShowWelcome(false);
    }
  };

  const getSofieGreeting = () => {
    const hour = new Date().getHours();
    const greetings = {
      morning: [
        "God morgen",
        "Morgenstund har guld i mund - og visdom!",
        "Klar til at udforske en ny dag sammen?",
      ],
      afternoon: [
        "God eftermiddag",
        "Håber du har tænkt dybe tanker i dag!",
        "Klar til nye filosofiske eventyr?",
      ],
      evening: [
        "God aften",
        "Tid til aftenens tankeflugt",
        "Lad os tænke over dagens mysterier",
      ],
    };

    if (hour < 12)
      return greetings.morning[
        Math.floor(Math.random() * greetings.morning.length)
      ];
    if (hour < 18)
      return greetings.afternoon[
        Math.floor(Math.random() * greetings.afternoon.length)
      ];
    return greetings.evening[
      Math.floor(Math.random() * greetings.evening.length)
    ];
  };

  const getXPToNextLevel = () => {
    return user.level * 100 - user.xp;
  };

  const getProgressPercentage = () => {
    const xpForNextLevel = user.level * 100;
    return Math.round((user.xp / xpForNextLevel) * 100);
  };

  // Velkommen modal for nye brugere
  if (showWelcome) {
    return (
      <div className="welcome-screen">
        <div className="welcome-container animate-fade-in">
          <div className="welcome-sparkles">
            <Sparkles size={32} className="sparkle-icon animate-sparkle" />
          </div>

          <div className="welcome-character">
            <MainCharacterSofie
              size="xl"
              mood="excited"
              interactive={false}
              showSpeechBubble={false}
            />
          </div>

          <div className="welcome-content">
            <h1 className="welcome-title">
              Velkommen til{" "}
              <span className="gradient-text rainbow">Tankebobler</span>!
              <span className="emoji-bounce">🎉</span>
            </h1>
            <p className="welcome-subtitle">
              Jeg er Sofie! Sammen skal vi udforske filosofiens magiske verden!
              Er du klar til eventyr? ✨
            </p>

            <form onSubmit={handleCreateProfile} className="welcome-form">
              <div className="form-group">
                <label htmlFor="name">Hvad skal jeg kalde dig?</label>
                <input
                  type="text"
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Dit seje navn..."
                  required
                  maxLength={20}
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Hvor gammel er du?</label>
                <select
                  id="age"
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value)}
                  required
                >
                  <option value="">Vælg din alder</option>
                  {Array.from({ length: 5 }, (_, i) => i + 10).map((age) => (
                    <option key={age} value={age}>
                      {age} år
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large btn-glow"
              >
                <Rocket size={20} />
                Start dit eventyr!
              </button>
            </form>
          </div>
        </div>

        <div className="floating-bubbles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-bubble"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero sektion med Sofie */}
      <section className="hero-section">
        <div className="hero-content animate-slide-in-up">
          <div className="hero-text">
            <h1 className="hero-title">
              {getSofieGreeting()},{" "}
              <span className="gradient-text sofie">
                {user.name || "Eventyrer"}
              </span>
              !<span className="wave-emoji">👋</span>
            </h1>
            <p className="hero-subtitle">
              Du har samlet {user.xp} tankekraft! Fortsæt sådan! 🌟
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-card animate-slide-in-left animate-delay-100 stat-sofie">
              <div className="stat-icon pulse">
                <Brain size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{user.level}</div>
                <div className="stat-label">Tænker Level</div>
              </div>
              <div className="stat-sparkle">✨</div>
            </div>

            <div className="stat-card animate-slide-in-left animate-delay-200 stat-sofie">
              <div className="stat-icon bounce">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{user.xp}</div>
                <div className="stat-label">Tankekraft</div>
              </div>
              <div className="stat-sparkle">⚡</div>
            </div>

            <div className="stat-card animate-slide-in-left animate-delay-300 stat-sofie">
              <div className="stat-icon rotate">
                <Trophy size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{user.achievements.length}</div>
                <div className="stat-label">Trofæer</div>
              </div>
              <div className="stat-sparkle">🏆</div>
            </div>
          </div>
        </div>

        <div className="hero-character animate-float">
          <MainCharacterSofie
            size="xl"
            mood="happy"
            interactive={true}
            showSpeechBubble={true}
          />
        </div>
      </section>

      {/* Filosofisk visdomscitat */}
      <section className="wisdom-quote animate-slide-in-up">
        <p>"Det eneste jeg ved, er at jeg intet ved"</p>
        <div className="author">- Sokrates</div>
      </section>

      {/* Daglig udfordring med Sofie tema */}
      {showDailyChallenge && (
        <section className="daily-challenge sofie-theme animate-slide-in-up">
          <div className="challenge-card gradient-border">
            <button
              className="close-challenge"
              onClick={() => setShowDailyChallenge(false)}
            >
              ×
            </button>
            <div className="challenge-icon">
              <Target size={32} />
            </div>
            <div className="challenge-content">
              <h3>Sofies Daglige Udfordring! 🎯</h3>
              <p>Gennemfør 2 lektioner og optjen dobbelt XP!</p>
              <div className="challenge-reward">
                <Star size={16} />
                <span>Belønning: 100 XP + Filosofi-Trofæ</span>
              </div>
            </div>
            <Link to="/laeringssti" className="btn btn-accent">
              <Gamepad2 size={16} />
              Tag udfordringen!
            </Link>
          </div>
        </section>
      )}

      {/* Progress sektion */}
      <section className="progress-section">
        <div className="card progress-card animate-slide-in-up animate-delay-200">
          <div className="card-header">
            <h2>Din filosofiske rejse</h2>
            <div className="level-badge bounce">
              <Brain size={16} />
              Level {user.level}
            </div>
          </div>

          <div className="progress-content">
            <div className="progress-text">
              <span>Næste level om</span>
              <span className="xp-highlight">{getXPToNextLevel()} XP</span>
            </div>
            <div className="progress-bar progress-bar-large">
              <div
                className={`progress-fill ${
                  animateProgress ? "progress-fill-animated" : ""
                }`}
                style={{
                  width: animateProgress ? `${getProgressPercentage()}%` : "0%",
                }}
              >
                <div className="progress-glow"></div>
              </div>
            </div>
            <div className="progress-tip">
              💡 Tip: Still flere spørgsmål for at få bonus XP!
            </div>
          </div>
        </div>
      </section>

      {/* Læringsstier sektion */}
      <section className="learning-paths-section">
        <div className="section-header">
          <h2 className="section-title">
            <Sparkles size={28} />
            Vælg dit filosofiske eventyr
            <Sparkles size={28} />
          </h2>
          <p>Hvilken tankesti vil du udforske sammen med Sofie?</p>
        </div>

        <div className="learning-paths-grid">
          {availablePaths.map((path, index) => {
            const progress = getPathProgress(path.id);
            const isCompleted = progress === 100;
            const canStart = path.requiredLevel <= user.level;

            return (
              <div
                key={path.id}
                className={`path-card path-${
                  path.id
                } animate-slide-in-up hover-lift ${!canStart ? "locked" : ""} ${
                  isCompleted ? "completed" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isCompleted && (
                  <div className="completion-badge-corner">
                    <Trophy size={20} />
                  </div>
                )}

                <div className="path-header">
                  <div className="path-icon" style={{ background: path.color }}>
                    {path.icon === "philosophy" && <Brain size={28} />}
                    {path.icon === "ethics" && <Users size={28} />}
                    {path.icon === "history" && <BookOpen size={28} />}
                  </div>
                  <div className="path-character hover-bounce">
                    <CharacterAvatar
                      character={path.character}
                      size="medium"
                      mood={isCompleted ? "excited" : "happy"}
                    />
                  </div>
                </div>

                <div className="path-content">
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>

                  {!canStart && (
                    <div className="locked-notice">
                      <span>🔒 Level {path.requiredLevel} krævet</span>
                    </div>
                  )}

                  {canStart && (
                    <div className="path-progress">
                      <div className="path-progress-text">
                        <span>Fremgang</span>
                        <span className="progress-percentage">{progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="path-actions">
                  {canStart && (
                    <Link
                      to={`/laeringssti?path=${path.id}`}
                      className={`btn ${
                        isCompleted ? "btn-secondary" : "btn-primary"
                      } btn-path`}
                    >
                      {progress === 0
                        ? "Start eventyr"
                        : isCompleted
                        ? "Spil igen"
                        : "Fortsæt"}
                      <Rocket size={16} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fun fact sektion med filosofisk twist */}
      <section className="fun-fact-section animate-slide-in-up">
        <div className="fun-fact-card">
          <div className="fun-fact-icon">
            <Brain size={40} />
          </div>
          <div className="fun-fact-content">
            <h3>Vidste du?</h3>
            <p>
              I "Sofies Verden" lærer vi at filosofi betyder "kærlighed til
              visdom" på græsk! 🏛️
            </p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="quick-actions">
        <div className="actions-grid">
          <Link to="/profil" className="action-card action-profile hover-grow">
            <div className="action-icon">
              <Users size={24} />
            </div>
            <div className="action-content">
              <h3>Min Profil</h3>
              <p>Se dine filosofiske stats</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>

          <Link
            to="/praestation"
            className="action-card action-achievements hover-grow"
          >
            <div className="action-icon">
              <Trophy size={24} />
            </div>
            <div className="action-content">
              <h3>Trofæer</h3>
              <p>Se dine visdomssejre</p>
            </div>
            <div className="action-arrow">→</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
  
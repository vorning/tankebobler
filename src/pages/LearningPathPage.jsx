import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLearning } from "../context/LearningContext";
import CharacterAvatar from "../components/characters/CharacterAvatar";
import {
  Brain,
  Users,
  BookOpen,
  Play,
  Lock,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Trophy,
  Sparkles,
  Zap,
  Target,
  Rocket,
  Heart,
  Gamepad2,
} from "lucide-react";
import "./LearningPathPage.css";

const LearningPathPage = () => {
  const { user } = useUser();
  const { availablePaths, startLearningPath, getPathProgress } = useLearning();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [showMotivation, setShowMotivation] = useState(true);

  const pathId = searchParams.get("path");

  useEffect(() => {
    if (pathId) {
      const path = availablePaths.find((p) => p.id === pathId);
      if (path) {
        setSelectedPath(path);
      }
    }
  }, [pathId, availablePaths]);

  const handleStartPath = (pathId) => {
    startLearningPath(pathId);
    const path = availablePaths.find((p) => p.id === pathId);
    if (path && path.lessons.length > 0) {
      navigate(`/lektion/${path.lessons[0].id}`);
    }
  };

  const getLessonIcon = (lesson) => {
    if (user.completedLessons.includes(lesson.id)) {
      return <CheckCircle size={20} className="lesson-completed" />;
    }
    return <Play size={20} className="lesson-start" />;
  };

  const isLessonUnlocked = (lesson, index, lessons) => {
    if (index === 0) return true;
    const previousLesson = lessons[index - 1];
    return user.completedLessons.includes(previousLesson.id);
  };

  const getPathIcon = (iconType) => {
    switch (iconType) {
      case "philosophy":
        return <Brain size={28} />;
      case "ethics":
        return <Users size={28} />;
      case "history":
        return <BookOpen size={28} />;
      default:
        return <Brain size={28} />;
    }
  };

  const getEstimatedTime = (lesson) => {
    const baseTime = 15;
    const quizTime = lesson.quiz ? 10 : 0;
    const activityTime = lesson.content?.sections
      ? lesson.content.sections.length * 5
      : 0;
    return baseTime + quizTime + activityTime;
  };

  const getMotivationalMessage = () => {
    const messages = [
      { text: "Du er fantastisk! Fortsæt sådan! 🌟", icon: Star },
      { text: "Hver lektion gør dig klogere! 🧠", icon: Brain },
      { text: "Du er en ægte tankehelt! 💪", icon: Zap },
      {
        text: "Vidste du at filosofi betyder 'kærlighed til visdom'? ❤️",
        icon: Heart,
      },
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Hvis specifik sti er valgt, vis detaljeret visning
  if (selectedPath) {
    const progress = getPathProgress(selectedPath.id);
    const completedCount = selectedPath.lessons.filter((lesson) =>
      user.completedLessons.includes(lesson.id)
    ).length;
    const canStartPath = selectedPath.requiredLevel <= user.level;
    const motivation = getMotivationalMessage();

    return (
      <div className="learning-path-detail">
        {/* Fun header with character */}
        <section className="path-header-section">
          <div className="path-header-card animate-slide-in-up">
            {/* Sparkles decoration */}
            <div className="sparkles-decoration">
              <Sparkles size={24} className="sparkle sparkle-1" />
              <Sparkles size={16} className="sparkle sparkle-2" />
              <Sparkles size={20} className="sparkle sparkle-3" />
            </div>

            <div className="path-header-content">
              <div className="path-main-info">
                <div
                  className="path-icon-large hover-rotate"
                  style={{ background: selectedPath.color }}
                >
                  {getPathIcon(selectedPath.icon)}
                </div>
                <div className="path-title-section">
                  <h1 className="gradient-text">{selectedPath.title}</h1>
                  <p>{selectedPath.description}</p>
                  <div className="path-meta">
                    <div className="meta-item">
                      <BookOpen size={16} />
                      <span>
                        {selectedPath.lessons.length} spændende lektioner
                      </span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>
                        ~{selectedPath.lessons.length * 20} min eventyr
                      </span>
                    </div>
                    <div className="meta-item">
                      <Star size={16} />
                      <span>
                        {selectedPath.lessons.length * 50} XP at optjene!
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="path-character-section">
                <div className="character-bubble">
                  <CharacterAvatar
                    character={selectedPath.character}
                    size="xl"
                    mood="excited"
                  />
                  <div className="character-speech-bubble">
                    <p>
                      Hej! Jeg er{" "}
                      <strong>
                        {selectedPath.character.charAt(0).toUpperCase() +
                          selectedPath.character.slice(1)}
                      </strong>
                      ! Jeg glæder mig til at guide dig gennem dette eventyr! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {canStartPath && (
              <div className="path-progress-section">
                <div className="progress-header">
                  <div className="progress-info">
                    <span>
                      <Trophy size={16} />
                      {completedCount}/{selectedPath.lessons.length} lektioner
                      klaret
                    </span>
                    <span className="progress-percentage">{progress}%</span>
                  </div>
                </div>
                <div className="progress-bar progress-bar-large">
                  <div
                    className="progress-fill animated"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="progress-glow"></div>
                  </div>
                </div>
                {progress === 100 && (
                  <div className="completion-celebration">
                    <Trophy size={20} />
                    <span>Du har gennemført denne sti! Godt gået! 🎊</span>
                  </div>
                )}
              </div>
            )}

            {!canStartPath && (
              <div className="locked-path-notice">
                <Lock size={24} />
                <div>
                  <h3>Denne sti er låst 🔒</h3>
                  <p>
                    Nå Level {selectedPath.requiredLevel} for at låse den op! Du
                    mangler kun {selectedPath.requiredLevel - user.level}{" "}
                    levels!
                  </p>
                </div>
                <button className="btn btn-secondary">
                  <Target size={16} />
                  Se andre stier
                </button>
              </div>
            )}
          </div>

          {/* Motivational message */}
          {showMotivation && canStartPath && progress < 100 && (
            <div className="motivation-card animate-slide-in-up animate-delay-200">
              <button
                className="close-motivation"
                onClick={() => setShowMotivation(false)}
              >
                ×
              </button>
              <div className="motivation-icon">
                <motivation.icon size={32} />
              </div>
              <p>{motivation.text}</p>
            </div>
          )}
        </section>

        {/* Lessons list with fun design */}
        <section className="lessons-section">
          <div className="section-header">
            <h2>
              <Sparkles size={24} />
              Lektioner i {selectedPath.title}
              <Sparkles size={24} />
            </h2>
            <p>Gennemfør lektionerne i rækkefølge for at låse nye op!</p>
          </div>

          <div className="lessons-list">
            {selectedPath.lessons.map((lesson, index) => {
              const isCompleted = user.completedLessons.includes(lesson.id);
              const isUnlocked =
                canStartPath &&
                isLessonUnlocked(lesson, index, selectedPath.lessons);
              const estimatedTime = getEstimatedTime(lesson);
              const isNext =
                !isCompleted &&
                isUnlocked &&
                (index === 0 ||
                  user.completedLessons.includes(
                    selectedPath.lessons[index - 1].id
                  ));

              return (
                <div
                  key={lesson.id}
                  className={`lesson-card ${isCompleted ? "completed" : ""} ${
                    !isUnlocked ? "locked" : ""
                  } ${isNext ? "next-lesson" : ""} animate-slide-in-left`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {isNext && (
                    <div className="next-lesson-badge">
                      <Zap size={16} />
                      NÆSTE!
                    </div>
                  )}

                  <div
                    className={`lesson-number ${
                      isCompleted ? "completed" : ""
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={24} />
                    ) : isUnlocked ? (
                      <span>{index + 1}</span>
                    ) : (
                      <Lock size={20} />
                    )}
                  </div>

                  <div className="lesson-content">
                    <div className="lesson-header">
                      <h3>{lesson.title}</h3>
                      <div className="lesson-status">
                        {isCompleted && (
                          <div className="lesson-xp-earned">
                            <Star size={16} />+{lesson.xpReward} XP
                          </div>
                        )}
                      </div>
                    </div>

                    <p>{lesson.description}</p>

                    <div className="lesson-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>~{estimatedTime} min</span>
                      </div>
                      {!isCompleted && (
                        <div className="meta-item">
                          <Star size={14} />
                          <span>{lesson.xpReward} XP</span>
                        </div>
                      )}
                      {lesson.quiz && (
                        <div className="meta-item">
                          <Gamepad2 size={14} />
                          <span>Quiz inkluderet!</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lesson-actions">
                    {isUnlocked ? (
                      <Link
                        to={`/lektion/${lesson.id}`}
                        className={`btn ${
                          isCompleted ? "btn-secondary" : "btn-primary"
                        } ${isNext ? "btn-glow" : ""}`}
                      >
                        {isCompleted ? (
                          <>
                            Spil igen
                            <Rocket size={16} />
                          </>
                        ) : (
                          <>
                            Start lektion
                            <ArrowRight size={16} />
                          </>
                        )}
                      </Link>
                    ) : (
                      <div className="locked-lesson">
                        <Lock size={16} />
                        <span>Lås op ved at klare lektion {index}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Fun progress summary */}
        {canStartPath && (
          <section className="path-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <Target size={40} />
              </div>
              <div className="summary-content">
                <h3>Din fremgang</h3>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <span className="stat-value">{completedCount}</span>
                    <span className="stat-label">Lektioner klaret</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-value">
                      {completedCount * 50}/{selectedPath.lessons.length * 50}
                    </span>
                    <span className="stat-label">XP optjent</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-value">{progress}%</span>
                    <span className="stat-label">Gennemført</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="path-navigation">
          <Link to="/laeringssti" className="btn btn-outline">
            ← Se alle stier
          </Link>

          {canStartPath && completedCount === 0 && (
            <button
              onClick={() => handleStartPath(selectedPath.id)}
              className="btn btn-primary btn-large btn-glow"
            >
              <Rocket size={20} />
              Start eventyr!
            </button>
          )}
        </section>
      </div>
    );
  }

  // Standard visning af alle stier
  return (
    <div className="learning-paths-page">
      {/* Fun header */}
      <section className="page-header">
        <div className="header-content animate-slide-in-up">
          <h1 className="page-title">
            <Sparkles size={36} />
            Vælg dit læringseventyr
            <Sparkles size={36} />
          </h1>
          <p>
            Udforsk spændende verdener af viden! Hver sti er fyldt med sjove
            lektioner, quizzer og aktiviteter der gør dig klogere! 🚀
          </p>
        </div>

        {/* Fun stats bar */}
        <div className="user-progress-bar animate-slide-in-up animate-delay-200">
          <div className="progress-stat">
            <Brain size={20} />
            <span>Level {user.level} Tænker</span>
          </div>
          <div className="progress-stat">
            <Star size={20} />
            <span>{user.xp} Tankekraft</span>
          </div>
          <div className="progress-stat">
            <Trophy size={20} />
            <span>{user.achievements.length} Trofæer</span>
          </div>
        </div>
      </section>

      {/* Paths overview with enhanced design */}
      <section className="paths-overview">
        <div className="paths-grid">
          {availablePaths.map((path, index) => {
            const progress = getPathProgress(path.id);
            const isCompleted = progress === 100;
            const canStart = path.requiredLevel <= user.level;
            const completedLessons = path.lessons.filter((lesson) =>
              user.completedLessons.includes(lesson.id)
            ).length;

            return (
              <div
                key={path.id}
                className={`path-overview-card animate-slide-in-up hover-lift ${
                  !canStart ? "locked" : ""
                } ${isCompleted ? "completed" : ""}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: canStart ? path.color : "#E5E7EB",
                }}
              >
                {isCompleted && (
                  <div className="completion-ribbon">
                    <Trophy size={20} />
                    Gennemført!
                  </div>
                )}

                <div className="path-card-header">
                  <div
                    className="path-icon-container hover-rotate"
                    style={{ background: canStart ? path.color : "#9CA3AF" }}
                  >
                    {getPathIcon(path.icon)}
                  </div>
                  <div className="path-character-mini hover-bounce">
                    <CharacterAvatar
                      character={path.character}
                      size="medium"
                      mood={isCompleted ? "excited" : "happy"}
                    />
                  </div>
                  {!canStart && <Lock className="lock-overlay" size={32} />}
                </div>

                <div className="path-card-content">
                  <h3 className="path-title">{path.title}</h3>
                  <p className="path-description">{path.description}</p>

                  <div className="path-stats">
                    <div className="stat">
                      <BookOpen size={16} />
                      <span>{path.lessons.length} lektioner</span>
                    </div>
                    <div className="stat">
                      <Star size={16} />
                      <span>{path.lessons.length * 50} XP</span>
                    </div>
                    <div className="stat">
                      <Clock size={16} />
                      <span>~{path.lessons.length * 20} min</span>
                    </div>
                  </div>

                  {canStart ? (
                    <>
                      <div className="path-progress">
                        <div className="progress-text">
                          <span>
                            {completedLessons}/{path.lessons.length} lektioner
                          </span>
                          <span className="progress-percentage">
                            {progress}%
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                          >
                            {progress > 0 && (
                              <div className="progress-glow"></div>
                            )}
                          </div>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="completion-badge">
                          <CheckCircle size={16} />
                          Godt klaret! Du mestrer {path.title}!
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="locked-notice">
                      <Lock size={16} />
                      <span>Nå Level {path.requiredLevel} for at låse op</span>
                      <div className="unlock-progress">
                        Kun {path.requiredLevel - user.level} levels mere!
                      </div>
                    </div>
                  )}
                </div>

                <div className="path-card-actions">
                  {canStart ? (
                    <Link
                      to={`/laeringssti?path=${path.id}`}
                      className={`btn ${
                        isCompleted ? "btn-secondary" : "btn-primary"
                      } btn-full ${progress === 0 ? "btn-glow" : ""}`}
                    >
                      {progress === 0 ? (
                        <>
                          Start eventyr
                          <Rocket size={16} />
                        </>
                      ) : isCompleted ? (
                        <>
                          Spil igen
                          <Trophy size={16} />
                        </>
                      ) : (
                        <>
                          Fortsæt rejse
                          <ArrowRight size={16} />
                        </>
                      )}
                    </Link>
                  ) : (
                    <div className="locked-button">
                      <Lock size={16} />
                      <span>Låst indtil Level {path.requiredLevel}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fun tips section */}
      <section className="learning-tips">
        <div className="tips-card">
          <div className="tips-header">
            <h2>💡 Sådan bliver du en mester-tænker!</h2>
          </div>
          <div className="tips-grid">
            <div className="tip">
              <div className="tip-icon">🧠</div>
              <h4>Tag pauser</h4>
              <p>Din hjerne elsker små pauser mellem lektioner!</p>
            </div>
            <div className="tip">
              <div className="tip-icon">❓</div>
              <h4>Stil spørgsmål</h4>
              <p>Nysgerrighed er din superkraft!</p>
            </div>
            <div className="tip">
              <div className="tip-icon">🎮</div>
              <h4>Øv med quizzer</h4>
              <p>Jo mere du øver, jo bedre husker du!</p>
            </div>
            <div className="tip">
              <div className="tip-icon">🎉</div>
              <h4>Hav det sjovt</h4>
              <p>Læring skal være et eventyr!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPathPage;

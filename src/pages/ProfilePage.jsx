import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useLearning } from "../context/LearningContext";
import CharacterAvatar from "../components/characters/CharacterAvatar";
import PersonalAvatar from "../components/characters/PersonalAvatar";
import {
  User,
  Edit2,
  Save,
  X,
  Brain,
  Star,
  Trophy,
  BookOpen,
  Clock,
  Target,
  Calendar,
  Award,
} from "lucide-react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const { availablePaths, getPathProgress } = useLearning();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name || "",
    age: user.age || "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(
    user.avatar || "student1"
  );
  const [animateProgress, setAnimateProgress] = useState(false);

  const personalAvatars = [
    { id: "student1", name: "Alex" },
    { id: "student2", name: "Emma" },
    { id: "student3", name: "David" },
    { id: "student4", name: "Sophie" },
    { id: "student5", name: "Marcus" },
    { id: "student6", name: "Luna" },
    { id: "student7", name: "Oliver" },
    { id: "student8", name: "Zara" },
  ];

  useEffect(() => {
    // Trigger progress animations when component mounts
    setTimeout(() => setAnimateProgress(true), 200);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      age: user.age,
    });
    setSelectedAvatar(user.avatar || "student1");
  };

  const handleSave = () => {
    if (editData.name.trim()) {
      updateUser({
        name: editData.name.trim(),
        age: parseInt(editData.age) || user.age,
        avatar: selectedAvatar,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      age: user.age,
    });
    setSelectedAvatar(user.avatar || "student1");
  };

  const getXPToNextLevel = () => {
    return user.level * 100 - user.xp;
  };

  const getProgressPercentage = () => {
    const xpForNextLevel = user.level * 100; // XP needed to reach next level

    // Since XP resets after level up, user.xp represents progress within current level
    return Math.round((user.xp / xpForNextLevel) * 100);
  };

  const getCompletedLessonsCount = () => {
    return user.completedLessons?.length || 0;
  };

  const getTotalLessonsCount = () => {
    return availablePaths.reduce((total, path) => {
      if (path.requiredLevel <= user.level) {
        return total + path.lessons.length;
      }
      return total;
    }, 0);
  };

  const getJoinDate = () => {
    // Simuler en join-dato baseret på om brugeren er oprettet
    const today = new Date();
    const joinDate = new Date(
      today.getTime() - user.level * 7 * 24 * 60 * 60 * 1000
    );
    return joinDate.toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysLearning = () => {
    return Math.max(1, user.level * 7);
  };

  const getAverageScore = () => {
    // Simuler en gennemsnitlig score baseret på gennemførte lektioner
    if (getCompletedLessonsCount() === 0) return 0;
    return Math.round(75 + user.level * 3 + Math.random() * 15);
  };

  return (
    <div className="profile-page">
      {/* Header sektion */}
      <section className="profile-header">
        <div className="profile-card animate-slide-in-up">
          <div className="profile-main">
            <div className="profile-avatar-section">
              {isEditing ? (
                <div className="avatar-selector">
                  <h4>Vælg din avatar:</h4>
                  <div className="avatar-options">
                    {personalAvatars.map((avatarOption) => (
                      <div
                        key={avatarOption.id}
                        className={`avatar-option ${
                          selectedAvatar === avatarOption.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedAvatar(avatarOption.id)}
                      >
                        <PersonalAvatar
                          avatar={avatarOption.id}
                          size="medium"
                        />
                        <span className="character-name">
                          {avatarOption.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="current-avatar">
                  <PersonalAvatar
                    avatar={user.avatar || "student1"}
                    size="xl"
                    mood="happy"
                  />
                </div>
              )}
            </div>

            <div className="profile-info">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label htmlFor="edit-name">Navn:</label>
                    <input
                      type="text"
                      id="edit-name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      placeholder="Dit navn"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-age">Alder:</label>
                    <select
                      id="edit-age"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({ ...editData, age: e.target.value })
                      }
                    >
                      {Array.from({ length: 5 }, (_, i) => i + 10).map(
                        (age) => (
                          <option key={age} value={age}>
                            {age} år
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="edit-actions">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save size={16} />
                      Gem
                    </button>
                    <button onClick={handleCancel} className="btn btn-outline">
                      <X size={16} />
                      Annuller
                    </button>
                  </div>
                </div>
              ) : (
                <div className="display-info">
                  <div className="name-section">
                    <h1>{user.name}</h1>
                    <button onClick={handleEdit} className="edit-btn">
                      <Edit2 size={16} />
                    </button>
                  </div>
                  <div className="user-meta">
                    <span className="age">{user.age} år gammel</span>
                    <span className="join-date">
                      Medlem siden {getJoinDate()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-badges">
              <div className="badge level-badge">
                <Brain size={20} />
                <div className="badge-content">
                  <span className="badge-number">{user.level}</span>
                  <span className="badge-label">Tænker Level</span>
                </div>
              </div>
              <div className="badge xp-badge">
                <Star size={20} />
                <div className="badge-content">
                  <span className="badge-number">{user.xp}</span>
                  <span className="badge-label">Tankekraft XP</span>
                </div>
              </div>
              <div className="badge achievement-badge">
                <Trophy size={20} />
                <div className="badge-content">
                  <span className="badge-number">
                    {user.achievements.length}
                  </span>
                  <span className="badge-label">Præstationer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="profile-progress">
            <div className="progress-info">
              <span>Fremgang til Level {user.level + 1}</span>
              <span>{getXPToNextLevel()} XP tilbage</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${
                  animateProgress ? "profile-progress-animated" : ""
                }`}
                style={{
                  width: animateProgress ? `${getProgressPercentage()}%` : "0%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistikker sektion */}
      <section className="profile-stats">
        <div className="stats-grid">
          <div className="stat-card animate-slide-in-left animate-delay-100">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{getCompletedLessonsCount()}</div>
              <div className="stat-label">Gennemførte lektioner</div>
              <div className="stat-detail">
                af {getTotalLessonsCount()} tilgængelige
              </div>
            </div>
          </div>

          <div className="stat-card animate-slide-in-left animate-delay-200">
            <div className="stat-icon">
              <Target size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{getAverageScore()}%</div>
              <div className="stat-label">Gennemsnitlig score</div>
              <div className="stat-detail">i quizzer og opgaver</div>
            </div>
          </div>

          <div className="stat-card animate-slide-in-left animate-delay-300">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{getDaysLearning()}</div>
              <div className="stat-label">Dage med læring</div>
              <div className="stat-detail">siden du startede</div>
            </div>
          </div>

          <div className="stat-card animate-slide-in-left animate-delay-400">
            <div className="stat-icon">
              <Award size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {Math.round(
                  (getCompletedLessonsCount() /
                    Math.max(1, getTotalLessonsCount())) *
                    100
                )}
                %
              </div>
              <div className="stat-label">Gennemførselsrate</div>
              <div className="stat-detail">af påbegyndte lektioner</div>
            </div>
          </div>
        </div>
      </section>

      {/* Læringsstier fremgang */}
      <section className="learning-progress">
        <div className="section-header">
          <h2>Din fremgang i læringsstier</h2>
          <p>Se hvor langt du er kommet i hver læringssti</p>
        </div>

        <div className="progress-paths">
          {availablePaths.map((path, index) => {
            const progress = getPathProgress(path.id);
            const isUnlocked = path.requiredLevel <= user.level;
            const completedLessons = path.lessons.filter((lesson) =>
              user.completedLessons.includes(lesson.id)
            ).length;

            return (
              <div
                key={path.id}
                className={`progress-path-card animate-slide-in-up ${
                  !isUnlocked ? "locked" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="path-header">
                  <div className="path-icon" style={{ background: path.color }}>
                    {path.icon === "philosophy" && <Brain size={24} />}
                    {path.icon === "ethics" && <User size={24} />}
                    {path.icon === "history" && <BookOpen size={24} />}
                  </div>
                  <div className="path-character">
                    <CharacterAvatar character={path.character} size="medium" />
                  </div>
                </div>

                <div className="path-info">
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>

                  {isUnlocked ? (
                    <div className="path-progress-details">
                      <div className="progress-text">
                        <span>
                          {completedLessons} af {path.lessons.length} lektioner
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${
                            animateProgress ? "path-progress-animated" : ""
                          }`}
                          style={{
                            width: animateProgress ? `${progress}%` : "0%",
                            animationDelay: `${index * 0.2 + 0.5}s`,
                          }}
                        ></div>
                      </div>
                      {progress === 100 && (
                        <div className="completion-badge">
                          <Trophy size={16} />
                          Gennemført!
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="locked-info">
                      <span>Låses op på Level {path.requiredLevel}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seneste præstationer */}
      {user.achievements.length > 0 && (
        <section className="recent-achievements">
          <div className="section-header">
            <h2>Seneste præstationer</h2>
            <p>Dine nyeste opnåelser og milepæle</p>
          </div>

          <div className="achievements-showcase">
            {user.achievements
              .slice(-6)
              .reverse()
              .map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="achievement-showcase-card animate-zoom-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="achievement-icon">
                    <Trophy size={24} />
                  </div>
                  <div className="achievement-details">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    <div className="achievement-xp">
                      <Star size={14} />
                      <span>+{achievement.xpReward || 25} XP</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {user.achievements.length === 0 && (
            <div className="no-achievements">
              <Trophy size={48} />
              <h3>Ingen præstationer endnu</h3>
              <p>
                Gennemfør lektioner og quizzer for at optjene dine første
                præstationer!
              </p>
            </div>
          )}
        </section>
      )}

      {/* Mål og udfordringer */}
      <section className="goals-challenges">
        <div className="section-header">
          <h2>Dine mål</h2>
          <p>Hold dig motiveret med personlige udfordringer</p>
        </div>

        <div className="goals-grid">
          <div className="goal-card">
            <div className="goal-icon">
              <Target size={24} />
            </div>
            <div className="goal-content">
              <h3>Næste Level</h3>
              <p>
                Optjen {getXPToNextLevel()} XP mere for at nå Level{" "}
                {user.level + 1}
              </p>
              <div className="goal-progress">
                <div className="goal-progress-bar">
                  <div
                    className={`goal-progress-fill ${
                      animateProgress ? "goal-progress-animated" : ""
                    }`}
                    style={{
                      width: animateProgress
                        ? `${getProgressPercentage()}%`
                        : "0%",
                      animationDelay: "1s",
                    }}
                  ></div>
                </div>
                <span>{getProgressPercentage()}%</span>
              </div>
            </div>
          </div>

          <div className="goal-card">
            <div className="goal-icon">
              <BookOpen size={24} />
            </div>
            <div className="goal-content">
              <h3>Månedlig udfordring</h3>
              <p>Gennemfør 5 lektioner denne måned</p>
              <div className="goal-progress">
                <div className="goal-progress-bar">
                  <div
                    className={`goal-progress-fill ${
                      animateProgress ? "goal-progress-animated" : ""
                    }`}
                    style={{
                      width: animateProgress
                        ? `${Math.min(
                            100,
                            (getCompletedLessonsCount() % 5) * 20
                          )}%`
                        : "0%",
                      animationDelay: "1.2s",
                    }}
                  ></div>
                </div>
                <span>{getCompletedLessonsCount() % 5}/5</span>
              </div>
            </div>
          </div>

          <div className="goal-card">
            <div className="goal-icon">
              <Award size={24} />
            </div>
            <div className="goal-content">
              <h3>Quiz Mester</h3>
              <p>Opnå 90%+ i 3 quizzer i træk</p>
              <div className="goal-progress">
                <div className="goal-progress-bar">
                  <div
                    className={`goal-progress-fill ${
                      animateProgress ? "goal-progress-animated" : ""
                    }`}
                    style={{
                      width: animateProgress
                        ? `${Math.min(100, Math.random() * 60)}%`
                        : "0%",
                      animationDelay: "1.4s",
                    }}
                  ></div>
                </div>
                <span>1/3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;

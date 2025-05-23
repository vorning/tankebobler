import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLearning } from "../context/LearningContext";
import CharacterAvatar from "../components/characters/CharacterAvatar";
import Quiz from "../components/learning/Quiz";
import learningPaths from "../data/learningPaths";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Star,
  Clock,
  Trophy,
  Brain,
} from "lucide-react";
import "./LessonPage.css";

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addXP } = useUser();
  const { finishLesson } = useLearning();
  const [lesson, setLesson] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Find lektion og sti
    for (const path of learningPaths) {
      const foundLesson = path.lessons.find((l) => l.id === id);
      if (foundLesson) {
        setLesson(foundLesson);
        setCurrentPath(path);
        setLessonCompleted(user.completedLessons.includes(foundLesson.id));
        break;
      }
    }
  }, [id, user.completedLessons]);

  useEffect(() => {
    // Simuler læsefremskridt
    const timer = setInterval(() => {
      setReadingProgress((prev) => {
        if (prev < 100 && !showQuiz) {
          return prev + 1;
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [showQuiz]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setShowQuiz(false);

    if (!lessonCompleted) {
      finishLesson(lesson.id, result);
      addXP(lesson.xpReward);
      setLessonCompleted(true);
    }
  };

  const handleNextLesson = () => {
    if (currentPath) {
      const currentIndex = currentPath.lessons.findIndex(
        (l) => l.id === lesson.id
      );
      if (currentIndex < currentPath.lessons.length - 1) {
        const nextLesson = currentPath.lessons[currentIndex + 1];
        navigate(`/lektion/${nextLesson.id}`);
      } else {
        navigate(`/laeringssti?path=${currentPath.id}`);
      }
    }
  };

  const handlePreviousLesson = () => {
    if (currentPath) {
      const currentIndex = currentPath.lessons.findIndex(
        (l) => l.id === lesson.id
      );
      if (currentIndex > 0) {
        const prevLesson = currentPath.lessons[currentIndex - 1];
        navigate(`/lektion/${prevLesson.id}`);
      } else {
        navigate(`/laeringssti?path=${currentPath.id}`);
      }
    }
  };

  if (!lesson || !currentPath) {
    return (
      <div className="lesson-loading">
        <div className="spinner"></div>
        <p>Indlæser lektion...</p>
      </div>
    );
  }

  const currentLessonIndex = currentPath.lessons.findIndex(
    (l) => l.id === lesson.id
  );
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === currentPath.lessons.length - 1;

  if (showQuiz && lesson.quiz) {
    return (
      <div className="lesson-quiz-page">
        <Quiz
          quiz={lesson.quiz}
          character={currentPath.character}
          onComplete={handleQuizComplete}
          lessonTitle={lesson.title}
        />
      </div>
    );
  }

  return (
    <div className="lesson-page">
      {/* Header */}
      <section className="lesson-header">
        <div className="lesson-nav">
          <button
            onClick={() => navigate(`/laeringssti?path=${currentPath.id}`)}
            className="btn btn-outline"
          >
            <ArrowLeft size={16} />
            Tilbage til sti
          </button>

          <div className="lesson-progress-info">
            <span>
              Lektion {currentLessonIndex + 1} af {currentPath.lessons.length}
            </span>
            <div className="mini-progress-bar">
              <div
                className="mini-progress-fill"
                style={{
                  width: `${
                    ((currentLessonIndex + 1) / currentPath.lessons.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="lesson-title-section animate-slide-in-up">
          <div className="lesson-title-content">
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>

            <div className="lesson-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>~20 min</span>
              </div>
              <div className="meta-item">
                <Star size={16} />
                <span>{lesson.xpReward} XP</span>
              </div>
              {lessonCompleted && (
                <div className="meta-item completed">
                  <CheckCircle size={16} />
                  <span>Gennemført</span>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-character">
            <CharacterAvatar
              character={currentPath.character}
              size="large"
              mood="happy"
            />
          </div>
        </div>

        {/* Reading progress */}
        <div className="reading-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">{readingProgress}% læst</span>
        </div>
      </section>

      {/* Content */}
      <section className="lesson-content">
        <div className="content-container animate-slide-in-up animate-delay-200">
          {lesson.contentType === "story" ? (
            <div
              className="story-content"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          ) : lesson.contentType === "interactive" &&
            lesson.content.sections ? (
            <div className="interactive-content">
              {lesson.content.sections.map((section, index) => (
                <div
                  key={index}
                  className="content-section animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3>{section.title}</h3>
                  <div
                    className="section-text"
                    dangerouslySetInnerHTML={{ __html: section.text }}
                  />

                  {section.activity && (
                    <div className="activity-box">
                      <h4>Aktivitet: {section.activity.instruction}</h4>
                      {section.activity.type === "choice" && (
                        <div className="choice-activity">
                          {section.activity.options.map((option, optIndex) => (
                            <div key={optIndex} className="choice-option">
                              <button className="choice-btn">
                                {option.text}
                              </button>
                              <p className="choice-reasoning">
                                {option.reasoning}
                              </p>
                            </div>
                          ))}
                          <div className="activity-discussion">
                            <p>
                              <strong>Diskussion:</strong>{" "}
                              {section.activity.discussion}
                            </p>
                          </div>
                        </div>
                      )}

                      {section.activity.type === "thought_experiment" && (
                        <div className="thought-experiment">
                          <div
                            className="experiment-content"
                            dangerouslySetInnerHTML={{
                              __html: section.activity.content,
                            }}
                          />
                          <div className="reflection-questions">
                            <h5>Tænk over:</h5>
                            <ul>
                              {section.activity.questions.map(
                                (question, qIndex) => (
                                  <li key={qIndex}>{question}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="basic-content">
              <p>Indhold ikke tilgængeligt</p>
            </div>
          )}

          {/* Character speech */}
          <div className="character-speech animate-slide-in-up animate-delay-400">
            <div className="speech-bubble">
              <p>
                {readingProgress < 50
                  ? "Tag din tid til at læse og forstå indholdet. Der er ingen grund til at skynde sig!"
                  : readingProgress < 100
                  ? "Du klarer det godt! Fortsæt med at læse - vi er næsten færdige."
                  : lesson.quiz
                  ? "Fantastisk! Nu er du klar til at teste din viden med en quiz. Tror du, du kan klare det?"
                  : "Flot! Du har gennemført denne lektion. Klar til den næste udfordring?"}
              </p>
            </div>
            <CharacterAvatar
              character={currentPath.character}
              size="medium"
              mood={readingProgress === 100 ? "excited" : "happy"}
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="lesson-actions">
        <div className="actions-container">
          <div className="nav-actions">
            <button
              onClick={handlePreviousLesson}
              className="btn btn-outline"
              disabled={isFirstLesson}
            >
              <ArrowLeft size={16} />
              Forrige lektion
            </button>

            {!isLastLesson && (
              <button onClick={handleNextLesson} className="btn btn-outline">
                Næste lektion
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          <div className="primary-actions">
            {lesson.quiz && !quizResult && readingProgress >= 80 && (
              <button
                onClick={handleStartQuiz}
                className="btn btn-primary btn-large"
              >
                <Trophy size={20} />
                Start Quiz
              </button>
            )}

            {quizResult && (
              <div className="quiz-completed">
                <div className="result-summary">
                  <Trophy size={24} />
                  <div>
                    <h3>Quiz gennemført!</h3>
                    <p>
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}{" "}
                      rigtige svar
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!lesson.quiz && readingProgress >= 100 && !lessonCompleted && (
              <button
                onClick={() => {
                  finishLesson(lesson.id);
                  addXP(lesson.xpReward);
                  setLessonCompleted(true);
                }}
                className="btn btn-primary btn-large"
              >
                <CheckCircle size={20} />
                Markér som gennemført
              </button>
            )}

            {lessonCompleted && (
              <div className="lesson-completed-badge">
                <CheckCircle size={20} />
                <span>Lektion gennemført!</span>
                <div className="xp-earned">
                  <Star size={16} />
                  <span>+{lesson.xpReward} XP</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonPage;

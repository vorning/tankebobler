import { useState, useEffect } from "react";
import CharacterAvatar from "../characters/CharacterAvatar";
import { CheckCircle, X, Trophy, Star, ArrowRight } from "lucide-react";
import "./Quiz.css";

const Quiz = ({ quiz, character, onComplete, lessonTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timer for hver spørgsmål (valgfrit)
  useEffect(() => {
    if (!showResult && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showResult, quizCompleted, timeLeft]);

  // Auto-submit hvis tiden løber ud
  useEffect(() => {
    if (timeLeft === 0 && selectedAnswer === null) {
      handleAnswerSubmit(-1); // -1 betyder ingen svar valgt
    }
  }, [timeLeft, selectedAnswer]);

  const handleAnswerSelect = (index) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleAnswerSubmit = (answerIndex = selectedAnswer) => {
    const question = quiz.questions[currentQuestion];
    const isCorrect = answerIndex === question.correctIndex;

    const newAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer: answerIndex,
      correctAnswer: question.correctIndex,
      isCorrect,
      timeUsed: 30 - timeLeft,
    };

    setAnswers([...answers, newAnswer]);
    setShowFeedback(true);

    // Vis feedback i 2 sekunder før næste spørgsmål
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
        setShowResult(true);
      }
    }, 2500);
  };

  const calculateResult = () => {
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    const totalQuestions = quiz.questions.length;
    const percentageCorrect = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

    return {
      correctAnswers,
      totalQuestions,
      percentageCorrect,
      answers,
    };
  };

  const getEncouragementMessage = (percentage) => {
    if (percentage >= 90) return "Fantastisk! Du er en sand tænker! 🌟";
    if (percentage >= 75)
      return "Rigtig godt klaret! Du forstår stoffet godt! 👏";
    if (percentage >= 60) return "Godt arbejde! Du er på rette vej! 💪";
    if (percentage >= 40)
      return "Ikke så galt! Prøv at læse lektionen igen. 📚";
    return "Det er okay - læring tager tid. Fortsæt med at øve dig! 🤗";
  };

  const getCharacterMood = () => {
    if (showFeedback) {
      const lastAnswer = answers[answers.length - 1];
      return lastAnswer?.isCorrect ? "happy" : "thinking";
    }
    return "happy";
  };

  if (showResult) {
    const result = calculateResult();

    return (
      <div className="quiz-results">
        <div className="results-container animate-zoom-in">
          <div className="results-header">
            <div className="results-character">
              <CharacterAvatar
                character={character}
                size="xl"
                mood={result.percentageCorrect >= 75 ? "excited" : "happy"}
              />
            </div>
            <h2>Quiz Resultat</h2>
            <p className="lesson-title">{lessonTitle}</p>
          </div>

          <div className="results-summary">
            <div className="score-circle">
              <div className="score-number">{result.percentageCorrect}%</div>
              <div className="score-fraction">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
            </div>

            <div className="encouragement-message">
              <p>{getEncouragementMessage(result.percentageCorrect)}</p>
            </div>
          </div>

          <div className="results-breakdown">
            <h3>Gennemgang af svar:</h3>
            <div className="questions-review">
              {quiz.questions.map((question, index) => {
                const userAnswer = result.answers[index];
                return (
                  <div key={index} className="question-review">
                    <div className="question-header">
                      <span className="question-number">
                        Spørgsmål {index + 1}
                      </span>
                      {userAnswer.isCorrect ? (
                        <CheckCircle size={20} className="correct-icon" />
                      ) : (
                        <X size={20} className="incorrect-icon" />
                      )}
                    </div>
                    <p className="question-text">{question.question}</p>

                    <div className="answer-comparison">
                      {userAnswer.selectedAnswer !== -1 ? (
                        <div
                          className={`user-answer ${
                            userAnswer.isCorrect ? "correct" : "incorrect"
                          }`}
                        >
                          <span>Dit svar:</span>
                          <span>
                            {question.options[userAnswer.selectedAnswer]}
                          </span>
                        </div>
                      ) : (
                        <div className="user-answer no-answer">
                          <span>Dit svar:</span>
                          <span>Ingen svar valgt</span>
                        </div>
                      )}

                      {!userAnswer.isCorrect && (
                        <div className="correct-answer">
                          <span>Korrekte svar:</span>
                          <span>{question.options[question.correctIndex]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="results-actions">
            <button
              onClick={() => onComplete(result)}
              className="btn btn-primary btn-large"
            >
              <Trophy size={20} />
              Fortsæt til næste
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="quiz-container">
      {/* Quiz header */}
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Spørgsmål {currentQuestion + 1} af {quiz.questions.length}
          </span>
        </div>

        <div className="quiz-timer">
          <div className={`timer-circle ${timeLeft <= 10 ? "warning" : ""}`}>
            {timeLeft}
          </div>
        </div>
      </div>

      {/* Character guide */}
      <div className="quiz-character">
        <CharacterAvatar
          character={character}
          size="large"
          mood={getCharacterMood()}
        />
        <div className="character-speech">
          {showFeedback ? (
            <p>
              {answers[currentQuestion]?.isCorrect
                ? "Perfekt! Du har forstået det! 🎉"
                : "Ikke helt rigtigt, men bliv ved med at tænke! 🤔"}
            </p>
          ) : (
            <p>
              {currentQuestion === 0
                ? "Lad os se hvor godt du har forstået lektionen!"
                : "Flot! Lad os fortsætte med næste spørgsmål."}
            </p>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="quiz-question animate-slide-in-up">
        <h2>{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option, index) => {
            let className = "quiz-option";

            if (showFeedback) {
              if (index === question.correctIndex) {
                className += " correct";
              } else if (
                index === selectedAnswer &&
                index !== question.correctIndex
              ) {
                className += " incorrect";
              }
            } else if (selectedAnswer === index) {
              className += " selected";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
                {showFeedback && index === question.correctIndex && (
                  <CheckCircle size={20} className="option-icon" />
                )}
                {showFeedback &&
                  index === selectedAnswer &&
                  index !== question.correctIndex && (
                    <X size={20} className="option-icon" />
                  )}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && !showFeedback && (
          <div className="quiz-submit">
            <button
              onClick={() => handleAnswerSubmit()}
              className="btn btn-primary"
            >
              Bekræft svar
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Quiz info */}
      <div className="quiz-info">
        <h3>{quiz.title}</h3>
        <p>Tag din tid og tænk dig godt om før du svarer</p>
      </div>
    </div>
  );
};

export default Quiz;

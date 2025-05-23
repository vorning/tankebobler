import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
import learningPaths from "../data/learningPaths";

const LearningContext = createContext();

export const useLearning = () => useContext(LearningContext);

export const LearningProvider = ({ children }) => {
  const { user, completeLesson, addAchievement } = useUser();
  const [currentPath, setCurrentPath] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [availablePaths, setAvailablePaths] = useState([]);

  // Indlæs tilgængelige læringsstier baseret på brugerens level
  useEffect(() => {
    const paths = learningPaths.filter(
      (path) => path.requiredLevel <= user.level
    );
    setAvailablePaths(paths);
  }, [user.level]);

  // Start en læringssti
  const startLearningPath = (pathId) => {
    const path = learningPaths.find((p) => p.id === pathId);
    if (path && path.requiredLevel <= user.level) {
      setCurrentPath(path);

      // Start med første ikke-gennemførte lektion eller første lektion
      const firstIncompleteLesson =
        path.lessons.find(
          (lesson) => !user.completedLessons.includes(lesson.id)
        ) || path.lessons[0];

      setCurrentLesson(firstIncompleteLesson);
    }
  };

  // Start en specifik lektion
  const startLesson = (lessonId) => {
    if (!currentPath) return;

    const lesson = currentPath.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
    }
  };

  // Afslut en lektion og gå til næste
  const finishLesson = (lessonId, quizResult) => {
    // Marker lektion som gennemført
    completeLesson(lessonId);

    // Tjek om hele stien er gennemført
    if (currentPath) {
      const allLessonsComplete = currentPath.lessons.every((lesson) =>
        user.completedLessons.includes(lesson.id)
      );

      if (allLessonsComplete) {
        // Giv achievement for gennemført sti
        addAchievement({
          id: `path_${currentPath.id}`,
          name: `Fuldført: ${currentPath.title}`,
          description: `Du har gennemført alle lektioner i ${currentPath.title}`,
          xpReward: 100,
        });
      }

      // Find og start næste lektion hvis den findes
      const currentIndex = currentPath.lessons.findIndex(
        (l) => l.id === lessonId
      );
      if (currentIndex < currentPath.lessons.length - 1) {
        setCurrentLesson(currentPath.lessons[currentIndex + 1]);
      }
    }

    // Giv achievement baseret på quiz-resultatet hvis det er godt
    if (quizResult && quizResult.percentageCorrect >= 80) {
      addAchievement({
        id: `quiz_master_${lessonId}`,
        name: "Quiz Mester",
        description: "Over 80% korrekte svar i en quiz!",
        xpReward: 30,
      });
    }
  };

  // Beregn procentvis fremskridt på nuværende læringssti
  const getPathProgress = (pathId) => {
    const path = learningPaths.find((p) => p.id === pathId);
    if (!path) return 0;

    const completedCount = path.lessons.filter((lesson) =>
      user.completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completedCount / path.lessons.length) * 100);
  };

  return (
    <LearningContext.Provider
      value={{
        availablePaths,
        currentPath,
        currentLesson,
        startLearningPath,
        startLesson,
        finishLesson,
        getPathProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export default LearningContext;

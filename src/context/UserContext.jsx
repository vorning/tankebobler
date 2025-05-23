import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Hent brugerdata fra localStorage hvis det findes
    const savedUser = localStorage.getItem("tankebobler_user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "",
          age: null,
          avatar: "default",
          level: 1,
          xp: 0,
          achievements: [],
          completedLessons: [],
          created: false,
        };
  });

  // Gem brugerdata til localStorage når det ændres
  useEffect(() => {
    localStorage.setItem("tankebobler_user", JSON.stringify(user));
  }, [user]);

  // Funktion til at oprette eller opdatere brugerprofil
  const updateUser = (data) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      created: true,
    }));
  };

  // Funktion til at tilføje XP og håndtere level-up
  const addXP = (amount) => {
    const newXP = user.xp + amount;
    const xpForNextLevel = user.level * 100;

    if (newXP >= xpForNextLevel) {
      // Level up!
      setUser((prev) => ({
        ...prev,
        level: prev.level + 1,
        xp: newXP - xpForNextLevel,
      }));
      return true; // Returner true for at indikere level-up
    } else {
      setUser((prev) => ({
        ...prev,
        xp: newXP,
      }));
      return false;
    }
  };

  // Funktion til at markere en lektion som gennemført
  const completeLesson = (lessonId) => {
    if (!user.completedLessons.includes(lessonId)) {
      setUser((prev) => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      }));
      // Giv XP for gennemført lektion
      addXP(50);
    }
  };

  // Funktion til at tilføje achievement
  const addAchievement = (achievement) => {
    if (!user.achievements.some((a) => a.id === achievement.id)) {
      setUser((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievement],
      }));
      // Giv XP for achievement
      addXP(achievement.xpReward || 25);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        addXP,
        completeLesson,
        addAchievement,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

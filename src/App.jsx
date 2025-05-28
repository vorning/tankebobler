// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/global.css";

// Contexts
import { UserProvider } from "./context/UserContext";
import { LearningProvider } from "./context/LearningContext";
import { SoundProvider } from "./context/SoundContext";

// Pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LearningPathPage from "./pages/LearningPathPage";
import LessonPage from "./pages/LessonPage";
import AchievementsPage from "./pages/AchievementsPage";
import WelcomePage from "./pages/WelcomePage";

// Layout
import Navigation from "./components/layout/Navigation";
import CharacterAssistant from "./components/characters/CharacterAssistant";
import { Brain } from "lucide-react";
import { useUser } from "./context/UserContext";

function AppRoutes() {
  const { user } = useUser();

  // 👇 Hvis bruger ikke er oprettet, omdiriger til /velkommen
  if (!user.created) {
    return (
      <Routes>
        <Route path="/velkommen" element={<WelcomePage />} />
        <Route path="*" element={<Navigate to="/velkommen" replace />} />
      </Routes>
    );
  }

  // 👇 Hvis bruger er oprettet, vis det normale app-layout
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/laeringssti" element={<LearningPathPage />} />
          <Route path="/lektion/:id" element={<LessonPage />} />
          <Route path="/praestation" element={<AchievementsPage />} />
          <Route path="/velkommen" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <CharacterAssistant />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="brand-icon">
          <Brain size={30} />
        </div>
        <div className="loading-animation">
          <div className="thinking-bubble"></div>
          <div className="thinking-bubble"></div>
          <div className="thinking-bubble"></div>
        </div>
        <p className="loading-text">Gør klar til tankeeventyr...</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <SoundProvider>
        <UserProvider>
          <LearningProvider>
            <AppRoutes />
          </LearningProvider>
        </UserProvider>
      </SoundProvider>
    </Router>
  );
}

export default App;

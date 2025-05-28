import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/global.css";

// Contexts
import { UserProvider, useUser } from "./context/UserContext";
import { LearningProvider } from "./context/LearningContext";
import { SoundProvider } from "./context/SoundContext";

// Pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LearningPathPage from "./pages/LearningPathPage";
import LessonPage from "./pages/LessonPage";
import AchievementsPage from "./pages/AchievementsPage";
import WelcomePage from "./pages/WelcomePage";

// Layout Components
import Navigation from "./components/layout/Navigation";
import CharacterAssistant from "./components/characters/CharacterAssistant";
import { Brain } from "lucide-react";

// Routes wrapper der kan bruge context til at kontrollere routing
function AppRoutes() {
  const { user } = useUser();

  return (
    <Routes>
      <Route
        path="/"
        element={user.created ? <HomePage /> : <Navigate to="/velkomst" />}
      />
      <Route path="/velkomst" element={<WelcomePage />} />
      <Route path="/profil" element={<ProfilePage />} />
      <Route path="/laeringssti" element={<LearningPathPage />} />
      <Route path="/lektion/:id" element={<LessonPage />} />
      <Route path="/praestation" element={<AchievementsPage />} />
      {/* Catch-all route for at håndtere ukendte stier */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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
            <div className="app-container">
              <Navigation />
              <main className="main-content">
                <AppRoutes />
              </main>
              <CharacterAssistant />
            </div>
          </LearningProvider>
        </UserProvider>
      </SoundProvider>
    </Router>
  );
}

export default App;

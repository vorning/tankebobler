import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import MainCharacterSofie from "../components/characters/MainCharacterSofie";
import { Sparkles, Rocket } from "lucide-react";

const WelcomePage = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");

  const handleCreateProfile = (e) => {
    e.preventDefault();
    if (userName.trim() && userAge) {
      console.log("Creating user profile:", {
        name: userName.trim(),
        age: parseInt(userAge),
      });

      updateUser({
        name: userName.trim(),
        age: parseInt(userAge),
        created: true, // Dette er vigtigt!
        level: 1,
        xp: 0,
        achievements: [],
        avatar: "default",
      });

      // Navigate efter en kort delay for at sikre state opdatering
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  };

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
            Jeg er Sofie! Sammen skal vi udforske filosofiens magiske verden! Er
            du klar til eventyr? ✨
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
};

export default WelcomePage;

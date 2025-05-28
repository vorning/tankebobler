// src/pages/WelcomePage.jsx
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WelcomePage = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.created) {
      navigate("/"); // hvis brugeren allerede findes, send til forsiden
    }
  }, [user, navigate]);

  const handleCreate = () => {
    updateUser({
      name: "Eksempel",
      age: 12,
      avatar: "default",
    });
    navigate("/"); // send videre efter oprettelse
  };

  return (
    <div className="welcome-page">
      <h1>Velkommen til Tankebobler!</h1>
      <p>Lad os starte med at lære dig at kende.</p>
      <button onClick={handleCreate}>Opret Profil</button>
    </div>
  );
};

export default WelcomePage;

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useLearning } from "../../context/LearningContext";
import CharacterAvatar from "./CharacterAvatar";
import "./CharacterAssistant.css";


const CharacterAssistant = () => {
  const { user } = useUser();
  const { currentLesson } = useLearning();
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [character, setCharacter] = useState("filo");
  const [isThinking, setIsThinking] = useState(false);

  // Beskeder baseret på kontekst
  const messages = {
    welcome: [
      "Hej! Jeg er Filo, din filosofiske guide! 🤔",
      "Velkommen til tankernes verden! Lad os udforske sammen! ✨",
      "Klar til at dykke ned i de store spørgsmål? 🌟",
    ],
    firstTime: [
      "Wow, det er første gang vi mødes! 😊",
      "Jeg er så spændt på at lære dig at kende!",
      "Skal vi begynde med at udforske filosofiens verden sammen?",
    ],
    levelUp: [
      "Fantastisk! Du er steget i level! 🎉",
      "Din tankekraft vokser! Jeg er så stolt! 💪",
      "Du bliver klogere og klogere! Fortsæt sådan! ⭐",
    ],
    encouragement: [
      "Du klarer det fantastisk! 💪",
      "Fortsæt med at tænke dybt! 🧠",
      "Husk, der er ingen dumme spørgsmål! 💭",
      "Du er på vej til at blive en rigtig tænker! 🌟",
    ],
    lessonStart: [
      "Lad os dykke ned i denne spændende lektion! 📚",
      "Jeg er her for at hjælpe dig hele vejen! 🤝",
      "Hold øje med de vigtigste pointer! 👀",
    ],
    quiz: [
      "Tid til at teste din viden! Du kan sagtens klare det! 💪",
      "Tænk dig godt om - jeg tror på dig! 🤔",
      "Husk, det handler om at lære, ikke om at være perfekt! 😊",
    ],
    break: [
      "Tag en lille pause hvis du har brug for det! 😌",
      "Din hjerne har brug for tid til at processere det nye! 🧠",
      "Kom tilbage når du er klar til mere! 👋",
    ],
  };

  // Vis karakter ved specifikke begivenheder
  useEffect(() => {
    if (!user.created) {
      showMessage("firstTime");
    } else {
      showMessage("welcome");
    }
  }, []);

  // Reagér på level up
  useEffect(() => {
    if (user.level > 1) {
      showMessage("levelUp", 3000);
    }
  }, [user.level]);

  // Reagér på nye lektioner
  useEffect(() => {
    if (currentLesson) {
      setTimeout(() => {
        showMessage("lessonStart", 4000);
      }, 1000);
    }
  }, [currentLesson]);

  const showMessage = (messageType, duration = 5000) => {
    const messageList = messages[messageType] || messages.encouragement;
    const randomMessage =
      messageList[Math.floor(Math.random() * messageList.length)];

    setIsThinking(true);
    setIsVisible(true);

    setTimeout(() => {
      setCurrentMessage(randomMessage);
      setIsThinking(false);
    }, 1000);

    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  const handleCharacterClick = () => {
    const messageTypes = ["encouragement", "break"];
    const randomType =
      messageTypes[Math.floor(Math.random() * messageTypes.length)];
    showMessage(randomType);
  };

  const getCharacterForLesson = () => {
    if (!currentLesson) return "filo";

    // Vælg karakter baseret på lektionstype
    if (currentLesson.id.includes("etik")) return "etika";
    if (currentLesson.id.includes("historie")) return "historikus";
    if (currentLesson.id.includes("logik")) return "logika";
    return "filo";
  };

  useEffect(() => {
    setCharacter(getCharacterForLesson());
  }, [currentLesson]);

  return (
    <div className={`character-assistant ${isVisible ? "visible" : "hidden"}`}>
      {isVisible && (
        <div className="character-speech-bubble animate-slide-in-up">
          <div className="speech-content">
            {isThinking ? (
              <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <p>{currentMessage}</p>
            )}
          </div>
          <div className="speech-arrow"></div>
        </div>
      )}

      <div
        className={`character-container ${
          isThinking ? "animate-thinking" : "animate-float"
        }`}
        onClick={handleCharacterClick}
      >
        <CharacterAvatar character={character} size="large" />

        {/* Notification dot for vigtige beskeder */}
        {!isVisible && user.level > 1 && (
          <div className="notification-dot animate-pulse"></div>
        )}
      </div>

      {/* Floating bubbles omkring karakteren */}
      <div className="character-bubbles">
        <div className="floating-bubble small"></div>
        <div className="floating-bubble medium"></div>
        <div className="floating-bubble large"></div>
      </div>
    </div>
  );
};

export default CharacterAssistant;

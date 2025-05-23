import { createContext, useContext, useState, useEffect } from "react";

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const sounds = {
    click: "/sounds/click.mp3",
    success: "/sounds/success.mp3",
    levelUp: "/sounds/level-up.mp3",
    wrong: "/sounds/wrong.mp3",
    coin: "/sounds/coin.mp3",
  };

  const playSound = (soundName) => {
    if (!soundEnabled) return;

    try {
      const audio = new Audio(sounds[soundName]);
      audio.volume = 0.5;
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

import { motion } from "framer-motion";
import "./startGame.css";
import { FC } from "react";

interface StartGameProps {
  onStart: () => void;
}

const StartGame: FC<StartGameProps> = ({ onStart }) => {
  return (
    <div className="start-game-container">
      <motion.h1
        className="start-game-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to the Chicken Game
      </motion.h1>
      <motion.button
        className="play-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
      >
        Play
      </motion.button>
    </div>
  );
};

export default StartGame;

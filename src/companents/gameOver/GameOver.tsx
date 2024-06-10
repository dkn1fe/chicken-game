import { FC } from "react";
import { motion } from "framer-motion";
import eggImg from "../../assets/egg.png";
import coinImg from "../../assets/coin.png";
import "./gameOver.css";

interface GameOverProps {
  score: number;
  gameOver: () => void;
}

export const GameOver: FC<GameOverProps> = ({ score, gameOver }) => {
  return (
    <>
      <div className="game-over">
        <div className="game-spec">
          <div className="egg-spinner">
            <motion.img
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              src={eggImg}
            />
          </div>
          <div className="game-text">
            <h3 className="over-text">Game Over</h3>
            <div className="score-wrapper">
              <h3 className="score">Your score: {score}</h3>
              <img src={coinImg} />
            </div>
            <div className="btn">
              <button className="button" onClick={gameOver}>
                Try again
              </button>
            </div>
          </div>

          <div className="egg-spinner">
            <motion.img
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              src={eggImg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

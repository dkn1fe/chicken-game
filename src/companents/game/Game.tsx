import { useState, useRef, useEffect } from "react";
import { Coins } from "../coins/Coins";
import { Lives } from "../lives/Lives";
import bagImg from "../../assets/grab.png";
import eggImg from "../../assets/egg.png";
import { v4 as uuidv4 } from "uuid";
import "./game.css";
import { GameOver } from "../gameOver/GameOver";
import { MobileArrow } from "./mobileArrow";

export const Game = () => {
  const windowHeight = window.screen.availHeight;
  const windowWidth = window.screen.availWidth;
  const bag = useRef(null);
  const eggElements = useRef([]);
  const [speedLimits, setSpeedLimits] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [controlBag, setControlBag] = useState(Math.floor(windowWidth / 2));
  const [count, setCount] = useState<number>(0);
  const [eggElem, setEggElems] = useState([]);
  const intervals = useRef([]);
  const [speedEgg, setSpeedEgg] = useState<number>(50);
  const [isLive, setIsLive] = useState([
    {
      id: 1,
      img: eggImg,
    },
    {
      id: 2,
      img: eggImg,
    },
    {
      id: 3,
      img: eggImg,
    },
  ]);

  useEffect(() => {
    if (count >= 10) {
      setSpeedEgg((speedEgg) => speedEgg - 10);
    } else if (count >= 20) {
      setSpeedEgg((speedEgg) => speedEgg - 10);
    }
  }, [count]);

  const resetGame = () => {
    setCount(0);
    setSpeedEgg(50);
    setIsLive([
      { id: 1, img: eggImg },
      { id: 2, img: eggImg },
      { id: 3, img: eggImg },
    ]);
    setEggElems([]);
    setSpeedLimits({});
    //@ts-ignore
    intervals.current.forEach((interval) => clearInterval(interval.intervalId));
    intervals.current = [];
    setIsGameOver(false);
    //@ts-ignore
    bag.current?.focus();
    createNewElement();
  };

  const createNewElement = () => {
    let newPosition = Math.floor(Math.random() * (window.innerWidth - 150 + 1));
    if (newPosition < 0) {
      newPosition += 150;
    }

    let newElement = {
      id: uuidv4(),
      img: eggImg,
      randomPosition: newPosition,
    };
    //@ts-ignore
    setEggElems((eggElem) => [...eggElem, newElement]);
    setSpeedLimits((speedLimits) => ({
      ...speedLimits,
      [newElement.id]: 0,
    }));
    const intervalId = setInterval(() => {
      updateSpeedLimit(newElement.id);
    }, speedEgg);
    //@ts-ignore
    intervals?.current.push({ id: newElement.id, intervalId });
  };

  useEffect(() => {
    if (controlBag >= windowWidth - 150) {
      setControlBag(windowWidth - 150);
    } else if (controlBag < 0) {
      setControlBag(0);
    }
  }, [controlBag]);

  const checkCollision = () => {
    if (!eggElements.current || !bag.current) return;
    //@ts-ignore
    const blockRect = bag.current.getBoundingClientRect();

    eggElements.current.forEach((el, i) => {
      if (!el) return;
      //@ts-ignore
      const elementRect = el.getBoundingClientRect();
      if (
        elementRect.bottom >= blockRect.top + 40 &&
        elementRect.top <= blockRect.bottom + 80 &&
        elementRect.right >= blockRect.left + 40 &&
        elementRect.left <= blockRect.right + 40
      ) {
        //@ts-ignore
        deleteImg(eggElem[i]?.id);
        setCount((count) => count + 1);
      }
    });
  };

  useEffect(() => {
    if (eggElem.length > 3) {
      return;
    }
    if (!isGameOver) {
      createNewElement();
      const timerId = setTimeout(() => {
        runAgain();
      }, Math.random() * 5000 + 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  const runAgain = () => {
    if (eggElem.length > 3) {
      return;
    }
    if (!isGameOver) {
      createNewElement();
      const time = Math.floor(Math.random() * 10000);
      const timerId = setTimeout(runAgain, time);
      return () => clearTimeout(timerId);
    }
  };

  useEffect(() => {
    //@ts-ignore
    bag.current?.focus();
  }, [speedLimits]);

  useEffect(() => {
    const elementToDelete = Object.entries(speedLimits).filter(
      //@ts-ignore
      ([id, height]) => height >= windowHeight - 50
    );
    elementToDelete.forEach(([id], i) => {
      deleteImg(id);
      onChangeLive(i);
    });
  }, [speedLimits]);

  useEffect(() => {
    if (isLive.length === 0) {
      setIsGameOver(true);
      intervals.current.forEach((intervals) => clearInterval(intervals));
    }
  }, [isLive]);

  useEffect(() => {
    checkCollision();
  }, [speedLimits, controlBag]);

  const onChangeLive = (id: number) => {
    setIsLive((isLive) => isLive.filter((item) => item.id !== id + 1));
  };

  const deleteImg = (id: string) => {
    if (id) {
      setEggElems((eggElem) => eggElem?.filter((item: any) => item.id !== id));
    } //@ts-ignore
    const intervalItem = intervals.current.find((item) => item.id === id);
    if (intervalItem) {
      //@ts-ignore
      clearInterval(intervalItem.intervalId);
      //@ts-ignore
      intervals.current = intervals.current.filter((item) => item.id !== id);
    }
  };

  const updateSpeedLimit = (id: string) => {
    setSpeedLimits((speedLimits) => ({
      ...speedLimits,
      //@ts-ignore
      [id]: speedLimits[id] + 5,
    }));
  };

  const handleChangeLeftOrRight = (event: { key: string }) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      setControlBag((controlBag) => controlBag - 10);
    } else if (event.key === "ArrowRight" || event.key === "d") {
      setControlBag((controlBag) => controlBag + 10);
    }
  };

  const onChangeRightArrow = () => {
    setControlBag((controlBag) => controlBag + 10);
  };

  const onChangeLeftArrow = () => {
    setControlBag((controlBag) => controlBag - 10);
  };

  return (
    <>
      {!isGameOver && (
        <div className="game-field">
          <div className="specification">
            <Lives live={isLive} />
            <Coins coin={count} />
          </div>
          <div className="egg">
            {eggElem.map((item, i) => (
              <img
                //@ts-ignore
                key={item.id}
                className="egg-photo"
                //@ts-ignore
                ref={(el) => (eggElements.current[i] = el)}
                //@ts-ignore
                src={item.img}
                alt="Example"
                style={{
                  //@ts-ignore
                  top: `${speedLimits[item.id]}px`,
                  //@ts-ignore
                  left: `${item.randomPosition}px`,
                }}
              />
            ))}
          </div>
          <div
            onKeyDown={handleChangeLeftOrRight}
            autoFocus
            tabIndex={0}
            style={{ left: `${controlBag}px` }}
            ref={bag}
            className="bag"
          >
            <img className="bag-img" src={bagImg} />
          </div>
          <div className="mobile-arrow">
            <MobileArrow left={onChangeLeftArrow} right={onChangeRightArrow} />
          </div>
        </div>
      )}
      {isGameOver && <GameOver gameOver={resetGame} score={count} />}
    </>
  );
};

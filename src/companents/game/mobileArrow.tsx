import { FC } from "react";
import "./mobileArrow.css";

interface MobileArrowProps {
  left: () => void;
  right: () => void;
  touchRight: () => void;
  touchLeft: () => void;
  stopHold: () => void;
}

export const MobileArrow: FC<MobileArrowProps> = ({
  left,
  right,
  touchLeft,
  touchRight,
  stopHold,
}) => {
  return (
    <>
    <div className="container">
      <div className="arrow">
        <button
          onClick={left}
          className="left"
          onMouseDown={touchLeft}
          onMouseUp={stopHold}
          onTouchStart={touchLeft}
          onTouchEnd={stopHold}
        >
          ←
        </button>
        <button
          onClick={right}
          className="right"
          onMouseDown={touchRight}
          onMouseUp={stopHold}
          onTouchStart={touchRight}
          onTouchEnd={stopHold}
        >
          →
        </button>
      </div>
    </div>

    </>
  );
};

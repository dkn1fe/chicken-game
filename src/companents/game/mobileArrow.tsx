import { FC } from "react";
import "./mobileArrow.css";

interface MobileArrowProps {
  left: () => void;
  right: () => void;
}

export const MobileArrow: FC<MobileArrowProps> = ({ left, right }) => {
  return (
    <>
      <div className="arrow">
        <div className="left">
        <h3 onClick={left}>←</h3>
        </div>
        <div className="right">
        <h3 onClick={right}>→</h3>
        </div>
      </div>
    </>
  );
};

import { relative } from "path";
import React, { FC, useState } from "react";
import * as Styled from "./cell.styles";

interface IProps {
  value: string | number;
  isOpen: boolean;
  isExploded: boolean;
  onClick: () => void;
}

const valuesConfig: Record<any, any> = {
  0: "",
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  BOMB: "💣",
};

const Cell: FC<IProps> = ({ value, isOpen, onClick, isExploded }) => {
  const [isMarked, setIsMarked] = useState(false);
  const handleClick = (e: any) => {
    if (!isOpen && e.shiftKey) {
      setIsMarked(!isMarked);
    } else if (!isOpen) {
      onClick();
      return;
    }
  };

  return (
    <Styled.Container
      isOpen={isOpen}
      onClick={handleClick}
      isExploded={isExploded}
      value={value as number}
    >
      {isExploded ? "☠️" : valuesConfig[value]}
      <Styled.Cover isOpen={isOpen}>
        {!isOpen && isMarked ? "🚩" : ""}
      </Styled.Cover>
    </Styled.Container>
  );
};

export default Cell;

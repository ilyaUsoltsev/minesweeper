import { relative } from "path";
import React, { FC, useState } from "react";
import * as Styled from "./cell.styles";

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

interface IProps {
  isGameOver: boolean;
  value: string | number;
  isOpen: boolean;
  isExploded: boolean;
  onClick: () => void;
}

const Cell: FC<IProps> = ({
  value,
  isOpen,
  onClick,
  isExploded,
  isGameOver,
}) => {
  const [isMarked, setIsMarked] = useState(false);

  const handleClick = (e: any) => {
    if (!isOpen && e.shiftKey) {
      setIsMarked(!isMarked);
    } else if (!isOpen && !isMarked) {
      onClick();
      return;
    }
  };

  const getGameOverValue = (value: string | number) => {
    if (isExploded) return "☠️";
    if (isMarked && value === "BOMB") return "✅";
    if (isMarked && value !== "BOMB") return "❌";
    return valuesConfig[value];
  };

  return (
    <Styled.Container
      isOpen={isOpen}
      onClick={handleClick}
      isExploded={isExploded}
      value={value as number}
    >
      {isGameOver ? getGameOverValue(value) : valuesConfig[value]}
      <Styled.Cover isOpen={isOpen || (isGameOver && isMarked)}>
        {!isOpen && isMarked && !isGameOver ? "🚩" : ""}
      </Styled.Cover>
    </Styled.Container>
  );
};

export default Cell;

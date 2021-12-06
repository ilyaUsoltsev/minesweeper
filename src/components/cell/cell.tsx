import React, { FC } from "react";
import * as Styled from "./cell.styles";
import { cellValuesConfig } from "./constants";

interface IProps {
  isGameOver: boolean;
  value: string | number;
  isOpen: boolean;
  isMarked: boolean;
  isExploded: boolean;
  onClick: (e: any) => void;
}

const Cell: FC<IProps> = ({
  value,
  isOpen,
  onClick,
  isExploded,
  isGameOver,
  isMarked,
}) => {
  const getGameOverValue = (value: string | number) => {
    if (isExploded) return "☠️";
    if (isMarked && value === "BOMB") return "✅";
    if (isMarked && value !== "BOMB") return "❌";
    return cellValuesConfig[value];
  };

  return (
    <Styled.Container
      isOpen={isOpen || (isGameOver && isMarked)}
      onClick={onClick}
      isExploded={isExploded}
      value={value as number}
    >
      {isGameOver ? getGameOverValue(value) : cellValuesConfig[value]}
      <Styled.Cover isOpen={isOpen || (isGameOver && isMarked)}>
        {!isOpen && isMarked && !isGameOver ? "🚩" : ""}
      </Styled.Cover>
    </Styled.Container>
  );
};

export default Cell;

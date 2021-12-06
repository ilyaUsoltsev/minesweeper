import React, { useEffect, useRef, useState } from "react";
import * as Styled from "./app.styles";
import Cell from "./components/cell/cell";
import { BOMBS_TOTAL, SIZE } from "./constants";
import { getBombPositions } from "./utils/getBombPositions";
import { getCellValue } from "./utils/getCellValue";
import { showBombs } from "./utils/showBombs";
import { openZeroCells } from "./utils/openEmptyCells";
import { getAdjacentCells } from "./utils/getAdjacentCells";

const getMatrix = () =>
  new Array(SIZE).fill(
    new Array(SIZE).fill(undefined).map((el) => ({ id: Math.random() }))
  );

function App() {
  const [matrix, setMatrix] = useState(getMatrix);
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [bombPositions, setBombPositions] = useState<string[]>([]);
  const [explodedBomb, setExplodedBomb] = useState<string>();
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const isGameStarted = useRef(false);

  useEffect(() => {
    if (
      SIZE * SIZE - Object.keys(opened).length === BOMBS_TOTAL &&
      !isGameOver
    ) {
      setIsGameWon(true);
    }
  }, [opened, isGameOver]);

  const startNewGame = () => {
    isGameStarted.current = false;
    setOpened({});
    setBombPositions([]);
    setIsGameOver(false);
    setExplodedBomb(undefined);
    setMatrix(getMatrix);
    setMarked({});
    setIsGameWon(false);
  };

  const onDoubleClickCell = (cell: string) => {
    if (isGameOver || isGameWon) return;
    const cellValue = getCellValue(cell, bombPositions);
    const adjacentClosedCells = getAdjacentCells(cell).filter(
      (cell) => !opened[cell]
    );
    const adjacentMarkedCount = adjacentClosedCells.filter(
      (cell) => marked[cell]
    ).length;
    if (adjacentMarkedCount < cellValue) return;
    const adjacentNotMarkedCells = adjacentClosedCells.filter(
      (cell) => !marked[cell]
    );
    console.log(adjacentNotMarkedCells, "adjacentNotMarkedCells");
    for (const notMarkedCell of adjacentNotMarkedCells) {
      console.log(notMarkedCell, "notMarkedCell");
      const notMarkedCellValue = getCellValue(notMarkedCell, bombPositions);
      if (notMarkedCellValue === "BOMB") {
        setOpened((prev) => ({ ...prev, ...showBombs(bombPositions) }));
        setExplodedBomb(notMarkedCell);
        setIsGameOver(true);
        return;
      }

      if (notMarkedCellValue === 0) {
        setOpened((prev) => ({
          ...prev,
          ...openZeroCells(notMarkedCell, bombPositions),
        }));
      } else {
        setOpened((prev) => ({ ...prev, [notMarkedCell]: true }));
      }
    }
  };

  const onClickCell = (e: any, cell: string) => {
    if (isGameOver || isGameWon) return;
    if (!Boolean(opened[cell]) && e.shiftKey) {
      setMarked({ ...marked, [cell]: !marked[cell] });
    } else if (!Boolean(opened[cell]) && !marked[cell]) {
      let cellValue: number | "BOMB";
      let bombs: string[] = [];
      if (!isGameStarted.current) {
        isGameStarted.current = true;
        bombs = getBombPositions(cell);
        setBombPositions(bombs);
        cellValue = getCellValue(cell, bombs);
      } else {
        cellValue = getCellValue(cell, bombPositions);
      }

      if (cellValue === "BOMB") {
        setOpened({ ...opened, ...showBombs(bombPositions) });
        setExplodedBomb(cell);
        setIsGameOver(true);
        return;
      }

      if (cellValue === 0) {
        setOpened({
          ...opened,
          ...openZeroCells(cell, bombPositions.length ? bombPositions : bombs),
        });
      } else {
        setOpened({ ...opened, [cell]: true });
      }
    }
  };

  const getButtonEmoji = () => {
    if (isGameWon) return "😎";
    if (isGameOver) return "😵";
    return "😀";
  };

  return (
    <Styled.Container>
      {!isGameOver && !isGameWon && <h1>{BOMBS_TOTAL} bombs are hidden</h1>}
      {isGameWon && <h1>Well done!</h1>}
      {isGameOver && <h1>GAME OVER</h1>}
      <Styled.Controls>
        <Styled.GameButton onClick={startNewGame}>
          {getButtonEmoji()}
        </Styled.GameButton>
      </Styled.Controls>
      <Styled.Layout>
        {matrix.map((row, rowNumber) => {
          return row.map((col: any, colNumber: any) => (
            <Cell
              doubleClick={() => onDoubleClickCell(`${rowNumber}-${colNumber}`)}
              isMarked={marked[`${rowNumber}-${colNumber}`]}
              isGameOver={isGameOver}
              onClick={(e: any) => onClickCell(e, `${rowNumber}-${colNumber}`)}
              isExploded={explodedBomb === `${rowNumber}-${colNumber}`}
              isOpen={Boolean(opened[`${rowNumber}-${colNumber}`])}
              key={col.id}
              value={getCellValue(`${rowNumber}-${colNumber}`, bombPositions)}
            />
          ));
        })}
      </Styled.Layout>
    </Styled.Container>
  );
}

export default App;

import React, { useEffect, useRef, useState } from "react";
import * as Styled from "./app.styles";
import Cell from "./components/cell/cell";
import { BOMBS_TOTAL, SIZE } from "./constants";
import { getBombPositions } from "./utils/getBombPositions";
import { getCellValue } from "./utils/getCellValue";
import { showBombs } from "./utils/showBombs";
import { openZeroCells } from "./utils/openEmptyCells";

const matrix = new Array(SIZE).fill(
  new Array(SIZE).fill(undefined).map((el) => ({ id: Math.random() }))
);

function App() {
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [bombPositions, setBombPositions] = useState<string[]>([]);
  const [explodedBomb, setExplodedBomb] = useState<string>();
  const isGameStarted = useRef(false);

  useEffect(() => {
    if (SIZE * SIZE - Object.keys(opened).length === BOMBS_TOTAL) {
      alert("SUCCESS!!!");
    }
  }, [opened]);

  const onClickCell = (cell: string) => {
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
      console.log("bomb");
      setOpened({ ...opened, ...showBombs(bombPositions) });
      setExplodedBomb(cell);
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
  };

  return (
    <Styled.Container>
      <Styled.Layout>
        {matrix.map((row, rowNumber) => {
          return row.map((col: any, colNumber: any) => (
            <Cell
              onClick={() => onClickCell(`${rowNumber}${colNumber}`)}
              isExploded={explodedBomb === `${rowNumber}${colNumber}`}
              isOpen={Boolean(opened[`${rowNumber}${colNumber}`])}
              key={col.id}
              value={getCellValue(`${rowNumber}${colNumber}`, bombPositions)}
            />
          ));
        })}
      </Styled.Layout>
    </Styled.Container>
  );
}

export default App;

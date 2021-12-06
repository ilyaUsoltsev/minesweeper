import { SIZE } from "../constants";
import { getRowAndCol } from "./getRowAndCol";

export const getAdjacentCells = (cell: string) => {
  const result: string[] = [];
  const { rowNumber, colNumber } = getRowAndCol(cell);
  for (
    let i = Math.max(0, rowNumber - 1);
    i <= Math.min(SIZE - 1, rowNumber + 1);
    i++
  ) {
    for (
      let j = Math.max(0, colNumber - 1);
      j <= Math.min(SIZE - 1, colNumber + 1);
      j++
    ) {
      const cellValue = i.toString() + "-" + j.toString();
      if (cellValue !== cell) result.push(cellValue);
    }
  }
  return result;
};

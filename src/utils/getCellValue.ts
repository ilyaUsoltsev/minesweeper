import { getRowAndCol } from "./getRowAndCol";
import { SIZE } from "../constants";

export const getCellValue = (
  cell: string,
  bombPositions: string[]
): number | "BOMB" => {
  const { rowNumber, colNumber } = getRowAndCol(cell);
  let result = 0;
  if (bombPositions.includes(cell)) return "BOMB";
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
      const valueToCheck = i.toString() + "-" + j.toString();
      if (bombPositions.includes(valueToCheck)) {
        result++;
      }
    }
  }
  return result;
};

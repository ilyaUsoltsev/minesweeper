import { SIZE } from "../constants";
import { getCellValue } from "./getCellValue";
import { getRowAndCol } from "./getRowAndCol";
import { isValidZero } from "./isValidZero";

export const openZeroCells = (
  cell: string,
  bombPositions: string[],
  config?: Record<string, boolean>
) => {
  const checkedZeros: Record<string, boolean> = {};

  function getResult(
    cell: string,
    bombPositions: string[],
    config?: Record<string, boolean>
  ) {
    const { rowNumber, colNumber } = getRowAndCol(cell);
    let result: Record<string, boolean> = {};
    checkedZeros[cell] = true;
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
        result[valueToCheck] = true;

        if (
          getCellValue(valueToCheck, bombPositions) === 0 &&
          !Boolean(checkedZeros[valueToCheck]) &&
          !isValidZero(cell, valueToCheck)
        ) {
          result[valueToCheck] = false;
        }

        if (
          getCellValue(valueToCheck, bombPositions) === 0 &&
          !Boolean(checkedZeros[valueToCheck]) &&
          isValidZero(cell, valueToCheck)
        ) {
          result = {
            ...result,
            ...getResult(valueToCheck, bombPositions, result),
          };
        }
      }
    }
    return result;
  }
  return getResult(cell, bombPositions);
};

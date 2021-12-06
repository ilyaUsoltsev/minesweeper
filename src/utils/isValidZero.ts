import { getRowAndCol } from "./getRowAndCol";

export const isValidZero = (cell: string, valueToCheck: string) => {
  const { rowNumber, colNumber } = getRowAndCol(cell);
  const allowedValues = [
    `${rowNumber}-${colNumber}`,
    `${rowNumber + 1}-${colNumber}`,
    `${rowNumber - 1}-${colNumber}`,
    `${rowNumber}-${colNumber + 1}`,
    `${rowNumber}-${colNumber - 1}`,
  ];
  return allowedValues.includes(valueToCheck);
};

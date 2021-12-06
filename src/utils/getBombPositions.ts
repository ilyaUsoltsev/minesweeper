import { BOMBS_TOTAL, SIZE } from "./../constants/index";
export const getBombPositions = (firstCell: string) => {
  const result: string[] = [];
  while (result.length < BOMBS_TOTAL) {
    const randomCol = Math.floor(Math.random() * SIZE);
    const randomRow = Math.floor(Math.random() * SIZE);
    const value = randomRow.toString() + randomCol.toString();
    if (!result.includes(value) && value !== firstCell) {
      result.push(value);
    }
  }

  return result;
};

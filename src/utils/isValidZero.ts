export const isValidZero = (cell: string, valueToCheck: string) => {
  const [row, col] = cell.split("");
  const rowNumber = Number(row);
  const colNumber = Number(col);
  const allowedValues = [
    `${rowNumber}${colNumber}`,
    `${rowNumber + 1}${colNumber}`,
    `${rowNumber - 1}${colNumber}`,
    `${rowNumber}${colNumber + 1}`,
    `${rowNumber}${colNumber - 1}`,
  ];
  return allowedValues.includes(valueToCheck);
};

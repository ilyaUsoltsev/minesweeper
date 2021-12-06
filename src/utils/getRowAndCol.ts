export const getRowAndCol = (
  cell: string
): { rowNumber: number; colNumber: number } => {
  const [row, col] = cell.split("-");
  const rowNumber = Number(row);
  const colNumber = Number(col);
  return { rowNumber, colNumber };
};

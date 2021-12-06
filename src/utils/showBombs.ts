export const showBombs = (bombs: string[]) => {
  const result: Record<string, boolean> = {};

  for (const cell of bombs) {
    result[cell] = true;
  }

  return result;
};

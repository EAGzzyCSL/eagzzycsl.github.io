export const calDPI = (
  widthPx: number,
  heightPx: number,
  diagonalInch: number,
): number =>
  Math.round((widthPx ** 2 + heightPx ** 2) ** (1 / 2) / diagonalInch)

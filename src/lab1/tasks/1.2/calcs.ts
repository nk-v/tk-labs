import * as math from "mathjs";
import { execOnFoundRow, RowProceed, xorRows } from "../../utils";

export const rref = (matrix: math.Matrix) => {
  const [height, length] = matrix.size();
  const mtx = matrix.toArray();

  let row = 1;
  for (let col = 1; col < length && row < height; ++col) {
    if (mtx[row][col]) {
      const xorRowsWithData = (rowPrev: number) => xorRows(mtx, row, rowPrev);
      execOnFoundRow({ mtx, row, col }, xorRowsWithData, RowProceed.PREV);
      ++row;
    }
  }

  return math.matrix(mtx);
};

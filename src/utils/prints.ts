import * as math from "mathjs";

export const showMatrix = (matrix: math.Matrix, label?: string) => {
  console.log();
  label && console.log(label + ":");
  console.table(matrix.toArray());
};

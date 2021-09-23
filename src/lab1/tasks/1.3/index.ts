import * as math from "mathjs";
import { showMatrix } from "../../utils";
import { ref } from "../1.1/calcs";
import { rref } from "../1.2/calcs";

export type BinaryMatrix = (0 | 1)[][];

export class LinearCode {
  n: number;
  k: number;

  G: math.Matrix;
  H: math.Matrix;

  constructor(S: math.Matrix) {
    showMatrix(S, "Input:\nS =");
    // // Формируем порождающую матрицу в ступенчатом виде
    this.G = ref(S);
    const [height, length] = this.G.size();
    showMatrix(this.G, "Step 1, Result:\nG =");

    this.G = rref(this.G);
    showMatrix(this.G, "Step 2, Result:\nG =");

    let leading = this.G.toArray().map((row) => row.findIndex((x) => x === 1));
    console.log("lead = ", leading);
    // n - число столбцов
    this.n = length;
    // k - число строк без учёта полностью нулевых
    this.k = height;
    console.log({ n: this.n, k: this.k });

    const X = removeColumns(this.G.toArray() as BinaryMatrix, leading);
    showMatrix(math.matrix(X), "X =");

    // Единичная матрица
    const I = getI(this.n - this.k);

    leading.forEach((rowIndex, i) => I.splice(rowIndex, 0, X[i]));
    this.H = math.matrix(I);
    showMatrix(this.H, "Result");
  }
}

const removeColumns = (mtx: BinaryMatrix, indexes: number[]) => {
  return mtx.map((row) => row.filter((_, index) => !indexes.includes(index)));
};

const getI = (length: number) => {
  return Array.from({ length }, (_, ind) =>
    Array.from({ length }, (_, k) => (ind === k ? 1 : 0))
  );
};

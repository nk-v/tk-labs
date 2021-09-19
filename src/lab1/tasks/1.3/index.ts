import * as math from "mathjs";
import { showMatrix } from "../../utils";
import {ref} from "../1.1/calcs";
import {rref} from "../1.2/calcs";

const S = math.matrix([
    [1,0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0 ,0, 0, 1, 1, 1, 0, 1, 0, 1],
    [0 ,0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1 ,0, 1, 0, 1, 1, 1, 0, 0, 0],
    [0 ,0, 0, 0, 1, 0, 0, 1, 1, 1],
])

type BinaryMatrix = (0 | 1)[][];

class LinearCode {
    n: number;
    k: number;

    constructor(matrix: math.Matrix) {
        // // Формируем порождающую матрицу в ступенчатом виде
        const rMatrix = ref(matrix);
        const [height, length] = rMatrix.size();
        const mtx = rMatrix.toArray() as BinaryMatrix;
        showMatrix(rMatrix, "Step 1");

        let leading = mtx.map(row => row.findIndex(x => x===1)).filter(x => x >= 0);
        console.log("lead =", leading);
        // n - число столбцов
        this.n = length;
        // k - число строк без учёта полностью нулевых
        this.k = leading.length;
        console.log({n: this.n, k: this.k});

        const G_R = rref(math.matrix(mtx));
        const mtx_G_R = G_R.toArray() as BinaryMatrix;
        showMatrix(G_R, "Step 2");

        const X = removeColumns(mtx_G_R, leading);
        showMatrix(math.matrix(X), "Shorter");

        // Единичная матрица
        const I = getI(this.n - this.k);

        leading.forEach((rowIndex,i) => I.splice(rowIndex, 0, X[i]));
        showMatrix(math.matrix(I), "Res");
    }
}

const removeColumns = (mtx: BinaryMatrix, indexes: number[]) => {
    return mtx.map(row => (
        row.filter((_, index) => !indexes.includes(index))
    ));
}

const getI = (length: number) => {
    return Array.from({ length }, (_, ind) => 
        Array.from({ length }, (_, k) => ind === k ? 1 : 0)
    );
}

new LinearCode(S);

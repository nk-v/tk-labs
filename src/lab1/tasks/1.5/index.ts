import * as math from "mathjs";
import { allWords } from "../1.4-first/calcs";

export const getWeight = (row: number[]) => row.reduce((acc, curr) => acc + curr, 0)

/**
 * Нахождение кодового расстояния
 * @param matrix Матрица кодовых слов
 * @returns dist
 */
export const codeDistance = (matrix: math.Matrix) : number => {
    const mtx = matrix.toArray() as number[][];
    const weights = mtx.map(getWeight);
    
    return Math.min(...weights.filter(x => x > 0));
}

export const getT = (dist: number) => dist - 1;

export const getRandomError = (t: number, n: number) => {
    if (t >= n) {
        return Array.from({length: n}, (_ => 1));
    }

    const v = Array.from({length: n}, (_ => 0));
    const emptyIndexes = Array.from({length: n}, ((_, ind) => ind));

    for (let i = 0; i < t; i++) {
        const rnd = Math.floor((Math.random() * emptyIndexes.length)) % emptyIndexes.length;
        v[emptyIndexes[rnd]] = 1;

        emptyIndexes.splice(rnd, 1);
    }

    return v;
}

export const getAllErrors  = (t: number, n: number) =>
    allWords(n).filter(row => getWeight(row) === t);

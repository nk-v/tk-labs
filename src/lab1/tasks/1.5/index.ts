/**
 * Нахождение кодового расстояния
 * @param matrix Матрица кодовых слов
 * @returns dist
 */
export const codeDistance = (matrix: math.Matrix) : number => {
    const mtx = matrix.toArray() as number[][];
    const weights = mtx.map((row) => row.reduce((acc, curr) => acc + curr, 0));
    
    return Math.min(...weights.filter(x => x > 0));
}

export const getT = (dist: number) => dist - 1;

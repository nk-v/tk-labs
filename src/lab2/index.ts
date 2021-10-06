import { getAllErrors } from "../lab1/tasks/1.5";
import { bitMultiply } from "../lab1/tasks/1.4-first/calcs";
import { bitXor } from "mathjs";

const getI = (length: number) =>
  Array.from({ length }, (_, ind) =>
    Array.from({ length }, (_, k) => (ind === k ? 1 : 0))
  );

const getRandomRow = (length: number) =>
  Array.from({ length }, () => (Math.random() <= 0.5 ? 0 : 1));

const findRowIndex = (M, x) =>
  M.findIndex((row) => {
    let equal = true;
    for (let i = 0; i < row.length && equal; i++) {
      equal = row[i] === x[i];
    }
    return equal;
  });

const solve = (n: number, k: number, d: number, maxErr: number) => {
  const _X = [];
  for (let i = 0; i < k; i++) {
    let newRow = "";
    do {
      let row = getRandomRow(n - k);
      let numberOfUnits = row.reduce((sum, curr) => sum + curr, 0);

      while (numberOfUnits++ < d - 1) {
        row[row.findIndex((val) => val === 0)] = 1;
      }
      newRow = row.join("");
    } while (_X.includes(newRow));
    _X.push(newRow);
  }

  const X = _X.map((row: string) => row.split("").map((char) => Number(char)));
  X.forEach((row) => {
    let numberOfUnits = row.reduce((sum, curr) => sum + curr, 0);

    while (numberOfUnits++ < d - 1) {
      row[row.findIndex((val) => val === 0)] = 1;
    }
  });

  const I = getI(k);
  const G = I.map((row, ind) => [...row, ...X[ind]]);
  const H = [...X, ...getI(n - k)];

  console.table(I);
  console.table(X);
  console.table(G);
  console.table(H);

  for (let err = 1; err <= maxErr; err++) {
    const errors = getAllErrors(err, n);
    console.log("errors");
    console.table(errors);

    // Генерируем слово длины k
    const word = getRandomRow(k);
    // Сформировать кодовое слово длины n из слова длины k.
    const encodedWord = bitMultiply(word, G);

    const randomError = errors[Math.floor(Math.random() * errors.length)];
    // Подмешиваем ошибку в исходное слово
    let wrongWord = bitXor(encodedWord, randomError);

    let step = 0;
    const TOTAL_STEPS = err;
    while (++step <= TOTAL_STEPS) {
      console.log("Step", step);
      const syndrome = bitMultiply(wrongWord, H);
      console.table({ word, encodedWord, randomError, wrongWord, syndrome });

      const foundStringIndex = findRowIndex(H, syndrome);
      console.log({ foundStringIndex });

      if (foundStringIndex < 0) {
        console.log("Не нашёл ошибку");
        console.table({ encodedWord, wrongWord });

        return;
      }

      const vec = Array.from({ length: n }, () => 0);
      vec[foundStringIndex] = 1;

      const checkWord = bitXor(wrongWord, vec);

      console.table({ encodedWord, checkWord });
      wrongWord = checkWord;
      console.log();
    }
  }
};

// part1(7, 4, 3, 2);
solve(20, 10, 5, 2);

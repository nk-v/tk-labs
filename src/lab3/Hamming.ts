import { allWords } from "../lab1/tasks/1.4-first/calcs";

const getI = (length: number): (0 | 1)[][] =>
  Array.from({ length }, (_, ind) =>
    Array.from({ length }, (_, k) => (ind === k ? 1 : 0))
  );

export class HammingCode {
  n: number;
  k: number;

  G: (0 | 1)[][] = [];
  H: (0 | 1)[][] = [];

  constructor(r: number) {
    this.n = Math.pow(2, r) - 1;
    this.k = Math.pow(2, r) - r - 1;

    const wordsR = allWords(r);
    const I_r = [];
    let i = 0;
    while (i < wordsR.length) {
      if (wordsR[i].filter((x) => x == 1).length == 1) {
        I_r.push(wordsR[i]);
        wordsR.splice(i, 1);
      } else {
        ++i;
      }
    }
    const X = wordsR.reverse();
    this.H = X.concat(I_r.reverse());

    const I_k = getI(this.k);
    this.G = X.map((row, index) => I_k[index].concat(row));
  }
}

export class ExtendedHammingCode extends HammingCode {
  constructor(r: number) {
    super(r);
    this.H.push([...Array(this.H[0].length).fill(0)]);
    this.H.forEach((row) => row.push(1));

    this.G.forEach((row) =>
      row.push(row.filter((x) => x == 1).length % 2 == 0 ? 0 : 1)
    );
  }
}

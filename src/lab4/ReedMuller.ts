import { multiply, pow } from "mathjs";
import { getI, H_m_i } from "./utils";

export class ReedMuller {
  G;
  m;

  constructor(r: number, m: number) {
    this.G = this.generateG(r, m);
    this.m = m;
  }

  private generateG(r: number, m: number) {
    const codeLength = pow(2, m) as number;
    if (r === 0) {
      return [[...Array(codeLength)].fill(1)];
    } else if (r === m) {
      return [
        ...this.generateG(m - 1, m),
        [...Array(codeLength)].map((_, index) =>
          index === codeLength - 1 ? 1 : 0
        ),
      ];
    } else {
      return [
        ...this.generateG(r, m - 1).map((row) => [...row, ...row]),
        ...this.generateG(r - 1, m - 1).map((row) => [
          ...[...Array(codeLength - row.length)].fill(0),
          ...row,
        ]),
      ];
    }
  }

  public fastDecode(w: number[]) {
    let _w = w.map((x) => (x === 0 ? -1 : x));
    for (let i = 1; i <= this.m; i++) {
      _w = multiply(_w, H_m_i(this.m, i));
    }
    let j = 0;
    _w.forEach((x, ind) => {
      if (Math.abs(x) > Math.abs(_w[j])) {
        j = ind;
      }
    });

    const res = dec2bin(j);
    while (res.length < this.m) {
      res.unshift(0);
    }
    res.reverse();

    if (_w[j] > 0) {
      return [1, ...res];
    } else {
      return [0, ...res];
    }
  }
}

const dec2bin = (dec) => (dec >>> 0).toString(2).split("").map(Number);

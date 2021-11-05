import { pow } from "mathjs";
import { getI } from "../lab2";

const H = [
  [1, 1],
  [1, -1],
];

const I_2_m = (m: number) => getI(pow(2, m) as number);

export class ReedMuller {
  G;

  constructor(r: number, m: number) {
    this.G = this.generateG(r, m);
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
}

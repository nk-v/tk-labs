import { bitXor } from "mathjs";
import { bitMultiply } from "../lab1/tasks/1.4-first/calcs";
import { getI, getWeight } from "./utils";

const B: number[][] = [
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1],
  [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

export class Golay {
  G: number[][];
  H: number[][];

  constructor() {
    this.G = getI(12).map((row, index) => row.concat(B[index]));
    this.H = getI(12).concat(B);
  }

  getErrFromSyndrome(syndrome: number[]) {
    if (getWeight(syndrome) <= 3) {
      return [syndrome, [...Array(syndrome.length)].fill(0)];
    } else {
      for (let i = 0; i < B.length; i++) {
        const sXorbi = bitXor(syndrome, B[i]);
        if (getWeight(sXorbi) <= 2) {
          return [
            sXorbi,
            [...Array(syndrome.length)].map((_, index) =>
              index === i ? 1 : 0
            ),
          ];
        }
      }

      const sB = bitMultiply(syndrome, B);
      if (getWeight(sB) <= 3) {
        return [[...Array(syndrome.length)].fill(0), sB];
      } else {
        for (let i = 0; i < B.length; i++) {
          const sBXorbi = bitXor(sB, B[i]);
          if (getWeight(sBXorbi) <= 2) {
            return [
              [...Array(syndrome.length)].map((_, index) =>
                index === i ? 1 : 0
              ),
              sBXorbi,
            ];
          }
        }
      }
      return undefined;
    }
  }
}

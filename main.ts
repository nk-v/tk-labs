import * as math from "mathjs";
import { showMatrix, ref, rref } from "./utils";

const a = math.matrix([
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 0, 1, 0, 0],
]);

showMatrix(a, "Input A");
showMatrix(ref(a), "Output REF(A)");
showMatrix(rref(ref(a)), "Output RREF(REF(A))");

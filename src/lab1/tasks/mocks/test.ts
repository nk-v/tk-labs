import { showMatrix } from "../../utils";
import { ref } from "../1.1/calcs";
import { rref } from "../1.2/calcs";
import { a } from "./data";

/**
 * Test REF / 1.1
 */
showMatrix(a, "Input A");
showMatrix(ref(a), "Output REF(A)");

/**
 * Test RREF / 1.2
 */
showMatrix(rref(ref(a)), "Output RREF(REF(A))");

import { codesFromXorAllWords } from "../1.4-first/calcs";
import {codeDistance, getT} from "./index";
import { G } from "./mocks";

const d = codeDistance(codesFromXorAllWords(G));
const t = getT(d);

console.log({d, t});

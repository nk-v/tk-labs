import { bitXor } from "mathjs";
import { bitMultiply } from "../lab1/tasks/1.4-first/calcs";
import { Golay } from "./Golay";
import { ReedMuller } from "./ReedMuller";
import { getRandomError, getRandomRow } from "./utils";

const logGolay = () => {
  const { G, H, getErrFromSyndrome } = new Golay();

  const err = getRandomError(3, 24);

  const syndrome = bitMultiply(err, H);

  const errFromSyndrome = getErrFromSyndrome(syndrome);

  console.table(
    errFromSyndrome
      ? {
          err,
          syndrome,
          part1: errFromSyndrome[0],
          part2: errFromSyndrome[1],
          "full error from syndrome": [
            ...errFromSyndrome[0],
            ...errFromSyndrome[1],
          ],
        }
      : {
          err,
          syndrome,
          "Not found": "Try again",
        }
  );
};

const logRM = () => {
  const { G } = new ReedMuller(2, 2);
  console.table(G);
};

logRM();

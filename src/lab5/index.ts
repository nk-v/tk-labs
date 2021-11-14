import math = require("mathjs");

const generateVectors = (m: number) => {
  const maxNum = Math.pow(2, m);
  const res: number[][] = [];
  for (let i = 0; i < maxNum; i++) {
    const cur = i.toString(2).split("").map(Number).reverse();
    while (cur.length < m) {
      cur.push(0);
    }
    res.push(cur);
  }
  return res;
};

const f = (I: number[]) => (x: number[]) => Number(I.every((i) => x[i] === 0));

const generateBitmasks = (r: number, m: number) => {
  const maxNum = Math.pow(2, m);
  const masks: number[][][] = Array.from({ length: r + 1 }, () => []);
  for (let i = 0; i < maxNum; i++) {
    const mask = i.toString(2).split("").map(Number); // Elon
    while (mask.length < m) {
      mask.unshift(0);
    }
    const trueCount = mask.reduce((acc, cur) => acc + cur, 0);
    if (trueCount <= r) {
      masks[trueCount].push(mask);
    }
  }
  return masks;
};

const maskToI = (mask: number[]) => {
  const newI: number[] = [];
  mask.forEach((x, ind) => {
    if (x === 1) {
      newI.push(ind);
    }
  });
  return newI;
};

const G = (r: number, m: number) => {
  const xArr = generateVectors(m);
  const iArr = generateBitmasks(r, m).map((row) => row.map(maskToI));

  const res = [];
  iArr.forEach((x) => {
    const currArr = x.map((I) => {
      let curF = f(I);
      return xArr.map(curF).reverse().join("");
    });
    res.push(...currArr.sort().map((x) => x.split("").reverse().map(Number)));
  });

  return res;
};

const G_extended = (r: number, m: number) => {
  const xArr = generateVectors(m);
  const iArr = generateBitmasks(r, m).map((row) => row.map(maskToI));

  const res = [];
  iArr.forEach((x) => {
    const currArr = x.map((I) => {
      let curF = f(I);
      return { v: xArr.map(curF).reverse().join(""), I };
    });
    res.push(
      ...currArr
        .sort((a, b) => Number(b.v < a.v) - Number(a.v < b.v))
        .map((x) => x.I.join(""))
    );
  });

  return res;
};

const reverseBit = (x: number) => (x + 1) % 2;
const reverseBitVector = (v: number[]) => v.map(reverseBit);

const major = (r: number, m: number, word: number[]) => {
  const words = generateVectors(m);
  const masks = generateBitmasks(r, m);

  let wordCopy = [...word];
  const res = [];
  let len = 0;
  for (let i = r; i >= 0; i--) {
    const arr = [];
    masks[i].forEach((mask) => {
      len++;
      const I = maskToI(mask);
      const reversedMask = reverseBitVector(mask);
      const IC = maskToI(reversedMask);

      const fI = f(I);
      const H = words.filter((word) => fI(word) === 1);
      const fIC = f(IC);
      const v_t = H.map((h) => words.map((w) => fIC(math.bitXor(w, h))));
      const wWithT = v_t.map((v) =>
        v.reduce((acc, cur, currInd) => (acc + cur * wordCopy[currInd]) % 2, 0)
      );
      const decision =
        wWithT.reduce((acc, cur) => acc + cur, 0) * 2 > wWithT.length ? 1 : 0;
      if (decision === 1) {
        arr.push(words.map((x) => fI(x)));
        res.push(I.join(""));
      }
    });
    arr.forEach((x) => (wordCopy = math.bitXor(wordCopy, x)));
  }
  const answer = Array.from({ length: len }, () => 0);
  const IOrder = G_extended(r, m);
  res.forEach((x) => (answer[IOrder.findIndex((v) => v === x)] = 1));
  return answer;
};

const bitMultiply = (a, b) =>
  math.multiply(a, b).map((value) => math.mod(value, 2));

// Вызовы функций

const r = 2;
const m = 4;
const w = [0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0];

const G24 = G(r, m);
const u = major(r, m, w);
const v = bitMultiply(u, G24);

console.table({ w, u, v });

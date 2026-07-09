const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }

  return a;
};

const placesToInteger = (n: number, epsilon = 1e-10): number => {
  let k = 0;
  let x = n;

  while (Math.abs(x - Math.round(x)) > epsilon) {
    x *= 10;
    k++;
  }

  return k;
};

const integerScale = (...nums: number[]): number => {
  const k = Math.max(...nums.map(n => placesToInteger(n)));
  return 10 ** k;
};

export const simplifyRatio = (a: number, b: number): [number, number] => {
  const mult = integerScale(a, b);
  const aInt = Math.round(a * mult);
  const bInt = Math.round(b * mult);
  const d = gcd(aInt, bInt);

  return [aInt / d, bInt / d];
};

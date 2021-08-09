function x(numA) {
  let sum = 0;
  return function (numB) {
    sum = numA + numB;
    return numA + numB + 10;
  };
}

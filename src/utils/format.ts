export const format = (str: string, numbers: number[]) => {
  return str.replace(/%(\d*)d/g, (_, len) => {
    return String(numbers.shift() || 0).padStart(Number(len), '0');
  });
};

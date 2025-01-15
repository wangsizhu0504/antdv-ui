export function round(number: number, digits = 0, base = 10 ** digits): number {
  return Math.round(base * number) / base;
}

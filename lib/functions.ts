export function isLogAxis(ns: number[], max: number): boolean {
  return Math.max(...ns.filter((n) => n !== Infinity)) > 5 * max;
}

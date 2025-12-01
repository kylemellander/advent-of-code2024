import input from "./input.txt?raw"
import { findPaths } from "./shared"

export function part1(data: string = input) {
  const potentialPaths = findPaths(data)

  return potentialPaths.reduce(
    (min, { score }) => Math.min(min, score),
    Infinity
  )
}

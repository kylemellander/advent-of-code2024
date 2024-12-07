import input from "./input.txt?raw"
import { part1DataPoints } from "./shared"

export function part1(data = input) {
  const { positionsVisited } = part1DataPoints(data)
  return Object.keys(positionsVisited).length
}

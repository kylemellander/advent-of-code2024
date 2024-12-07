import input from "./input.txt?raw"
import { part1DataPointsBitwise } from "./shared"

export function part1(data = input) {
  const { positionsVisited } = part1DataPointsBitwise(data)
  return Object.keys(positionsVisited).length
}

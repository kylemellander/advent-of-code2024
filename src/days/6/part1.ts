import input from "./input.txt?raw"
import { part1Data } from "./shared"

export function part1(data = input) {
  const { positionsVisited } = part1Data(data)
  return Object.keys(positionsVisited).length
}

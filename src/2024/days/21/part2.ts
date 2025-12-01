import input from "./input.txt?raw"
import { findKeyPresses } from "./part1"

export function part2(data: string = input) {
  const targets = data.trim().split("\n")

  const robotsControlling = 25

  let score = 0
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i]

    const keyPresses = findKeyPresses(target, robotsControlling)
    const numeric = parseInt(target.replace(/[^\d]/g, ""))

    score += keyPresses * numeric
  }

  return score
}

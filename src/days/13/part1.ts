import input from "./input.txt?raw"
import { solve } from "./part2"

export function part1(data = input) {
  const clawMachines = data
    .split("\n\n")
    .filter(Boolean)
    .map(buildClawMachine)
    .filter((i) => i !== undefined)

  return solve(clawMachines)
}

function buildClawMachine(data: string) {
  const match = data.match(
    /A:\sX\+(\d+),\sY\+(\d+)\n.*B:\sX\+(\d+),\sY\+(\d+)\n.*X=(\d+),\sY=(\d+)/
  )

  if (!match) throw "bad data"
  const [_, aX, aY, bX, bY, x, y] = match.map(Number)
  return { aX, aY, bX, bY, x, y }
}

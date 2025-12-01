import input from "./input.txt?raw"

export function part2(data = input) {
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
  return { aX, aY, bX, bY, x: x + 10000000000000, y: y + 10000000000000 }
}

export function solve(
  clawMachines: {
    aX: number
    aY: number
    bX: number
    bY: number
    x: number
    y: number
  }[]
) {
  return clawMachines.reduce((acc, { aX, aY, bX, bY, x, y }) => {
    // aX * a + bX * b = x
    // aY * a + bY * b = y
    // a = (y - bY * b) / aY
    // substitute a in the first equation
    // (aX * (y - bY * b) / (aY)) + bX * b = x
    // and then solve for b
    // aX * y - bY * aX * b + bX * b * aY = x * aY
    // b(bX * aY - bY * aX) = x * aY - aX * y
    // b = (x * aY - aX * y) / (bX * aY - bY * aX)
    const b = (x * aY - aX * y) / (bX * aY - bY * aX)
    const a = (y - bY * b) / aY

    const isValid = a % 1 === 0 && b % 1 === 0
    if (isValid) return acc + a * 3 + b

    return acc
  }, 0)
}

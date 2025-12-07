import input from "./input.txt?raw"

export function part1(data: string = input) {
  const rawLines = data.split("\n").filter(Boolean)
  const modifiers = rawLines.pop()!.split(" ").filter(Boolean)
  const lines = rawLines.map((line) =>
    line.split(" ").filter(Boolean).map(Number)
  )
  let sum = 0
  for (let i = 0; i < modifiers.length; i++) {
    const mod = modifiers[i]
    const col = lines.map((line) => line[i])
    if (mod === "+") {
      sum += col.reduce((a, b) => a + b, 0)
      // console.log(mod, col, sum)
    } else if (mod === "*") {
      sum += col.reduce((a, b) => a * b, 1)
      // console.log(mod, col, sum)
    } else if (mod === "^") {
      sum += col.reduce((a, b) => a ^ b, 0)
    } else if (mod === "#") {
      sum += col.reduce((a, b) => a + b, 0)
    }
  }

  return sum
}

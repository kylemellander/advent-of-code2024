import input from "./input.txt?raw"

type Operator = "+" | "*"
const OPERATORS: Operator[] = ["+", "*"]
const OPERATOR_START: Record<Operator, number> = { "+": 0, "*": 1 }

export function part2(data: string = input) {
  const rawLines = data.split("\n").filter(Boolean)
  const cols: { mod: Operator; value: number }[] = []
  const length = Math.max(...rawLines.map((line) => line.length))
  const modifiers: string = rawLines.pop()!
  for (let i = 0; i < length; i++) {
    const mod = modifiers[i] as Operator

    const col = []
    for (let j = 0; j < rawLines.length; j++) {
      let string = ""
      const line = rawLines[j]
      if (line[i] !== " " && line[i] !== undefined) {
        string += line[i]
        col.push(string.trim())
      }
    }
    cols.push({ mod, value: parseInt(col.join("")) })
  }

  let total = 0
  let currentMod: Operator = "+"
  let currentTotal = 0
  for (let i = 0; i <= cols.length; i++) {
    const { mod, value } = cols[i] || { mod: "+", value: 0 }
    const isNewModifier = OPERATORS.includes(mod)
    if (isNewModifier) {
      total += currentTotal
      currentMod = mod as "+" | "*"
      currentTotal = OPERATOR_START[mod]
    }
    if (Number.isNaN(value)) continue
    if (currentMod === "+") {
      currentTotal += value
    } else if (currentMod === "*") {
      currentTotal *= value
    }
  }

  return total
}

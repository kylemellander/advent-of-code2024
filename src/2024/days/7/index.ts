import input from "./input.txt?raw"

type Equation = { result: number; numbers: number[] }
type Operator = (a: number, b: number, isLast: boolean) => number

/*
In order to optimize the solution, instead of doing the math forward, which
creates many different possibilities, increasing the amount of calculations
done in our n+3 nested loops.

If we start with the result and find out if it is not divisible/splitable
into the numbers, then we can eliminate many possibilities.
*/

export function part1(data = input) {
  const equations = buildEquations(data)
  const allowedOperators = [addReversed, multiplyReversed]
  const validEquations = findValidEquationsReversed(equations, allowedOperators)
  return scoreEquations(validEquations)
}

export function part2(data = input) {
  const equations = buildEquations(data)
  const allowedOperators = [addReversed, multiplyReversed, concatReversed]
  const validEquations = findValidEquationsReversed(equations, allowedOperators)
  return scoreEquations(validEquations)
}

function buildEquations(data: string) {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  return lines.map((line) => {
    const [resultStr, numbersStr] = line.split(": ")
    const result = parseInt(resultStr)
    const numbers = numbersStr.split(" ").map((n) => parseInt(n))
    return { result, numbers }
  })
}

function findValidEquationsReversed(
  equations: Equation[],
  allowedOperators: Operator[]
) {
  return equations.filter(({ result, numbers }) => {
    let values = [result]
    for (let i = numbers.length - 1; i >= 0; i--) {
      const number = numbers[i]
      const newValues: number[] = []
      for (const value of values) {
        for (const operator of allowedOperators) {
          const newValue = operator(value, number, i === 0)
          if (newValue >= 0) newValues.push(newValue)
        }
      }
      values = newValues
    }

    return values.length > 0
  })
}

function scoreEquations(equations: Equation[]) {
  let score = 0
  for (const { result } of equations) score += result
  return score
}

function addReversed(a: number, b: number, isLast: boolean) {
  const result = a - b
  if (result < 0) return -1
  if (isLast && result !== 0) return -1
  return result
}

function multiplyReversed(a: number, b: number, isLast: boolean) {
  if (isLast && a !== b) return -1
  if (a % b !== 0) return -1

  return a / b
}

function concatReversed(a: number, b: number, isLast: boolean) {
  if (isLast && a !== b) return -1
  const digits = countDigits(b)
  const value = (a - b) / Math.pow(10, digits)
  if (Number.isInteger(value)) return value
  return -1
}

function countDigits(num: number): number {
  if (num === 0) return 1
  return Math.floor(Math.log10(Math.abs(num))) + 1
}

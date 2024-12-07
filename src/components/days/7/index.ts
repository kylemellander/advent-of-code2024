import input from "./input.txt?raw"

type Equation = { result: number; numbers: number[] }
type Operator = (a: number, b: number) => number

export function part1(data = input) {
  const equations = buildEquations(data)
  const allowedOperators = [add, multiply]
  const validEquations = findValidEquations(equations, allowedOperators)
  return scoreEquations(validEquations)
}

export function part2(data = input) {
  const equations = buildEquations(data)
  const allowedOperators = [add, multiply, concat]
  const validEquations = findValidEquations(equations, allowedOperators)
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

function findValidEquations(
  equations: Equation[],
  allowedOperators: Operator[]
) {
  return equations.filter(({ result, numbers }) => {
    let previousValues = [1]
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i]
      const newValues: number[] = []
      for (const previousValue of previousValues) {
        for (const operator of allowedOperators) {
          const newValue = operator(previousValue, number)
          if (newValue <= result) newValues.push(newValue)
        }
      }
      previousValues = newValues
    }

    return previousValues.includes(result)
  })
}

function scoreEquations(equations: Equation[]) {
  let score = 0
  for (const { result } of equations) score += result
  return score
}

function add(a: number, b: number) {
  return a + b
}

function multiply(a: number, b: number) {
  return a * b
}

function concat(a: number, b: number) {
  const aMult = roundUpToPowerOfTen(b)
  return a * aMult + b
}

function roundUpToPowerOfTen(num: number) {
  if (num <= 0) return 0
  const log10 = Math.log10(num)
  const power = Math.ceil(log10)
  const potentialResult = Math.pow(10, power)
  return potentialResult === num ? num * 10 : potentialResult
}

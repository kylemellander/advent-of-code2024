import input from "./input.txt?raw"
import { processGates } from "../24/part1"

export function part2(data: string = input) {
  const [gatesRaw, instructionsRaw] = data.trim().split("\n\n")
  const gates = gatesRaw.split("\n").reduce(
    (acc, gate) => {
      const [name, valueStr] = gate.split(": ")
      acc[name] = parseInt(valueStr)
      return acc
    },
    {} as Record<string, number>
  )
  const instructions = instructionsRaw.split("\n").reduce(
    (acc, instruction) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_unused, a, operator, b, result] = instruction.match(
        /(...)\s(...?)\s(...)\s->\s(...)/
      )!

      acc[a] ||= []
      acc[a].push({ operator, b, result })
      return acc
    },
    {} as Record<string, { operator: string; b: string; result: string }[]>
  )
  const xValues = findValue(gates, "x")
  const yValues = findValue(gates, "y")
  const targetScore = xValues + yValues
  const processedGates = processGates(gates, instructions)
  const zValues = findValue(processedGates, "z")
  const difference = targetScore - zValues
  const differenceBinary = difference.toString(2)
  const zValuesStr = findValueStr(processedGates, "z")
  console.log(differenceBinary, zValuesStr)

  return 0
}

function findValue(gates: Record<string, number>, key: string) {
  return parseInt(findValueStr(gates, key), 2)
}

function findValueStr(gates: Record<string, number>, key: string) {
  const values = Object.keys(gates).reduce(
    (acc, gateName) => {
      if (gateName.startsWith(key)) acc[gateName] = gates[gateName]
      return acc
    },
    {} as Record<string, number>
  )
  const keysOrdered = Object.keys(values).sort((a, b) => b.localeCompare(a))
  const resultBinary = keysOrdered.reduce((acc, v) => `${acc}${values[v]}`, "")

  return resultBinary
}

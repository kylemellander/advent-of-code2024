import input from "./input.txt?raw"

export function part1(data: string = input) {
  const [gatesRaw, instructionsRaw] = data.trim().split("\n\n")
  const gates = gatesRaw.split("\n").reduce((acc, gate) => {
    const [name, valueStr] = gate.split(": ")
    acc[name] = parseInt(valueStr)
    return acc
  }, {} as Record<string, number>)
  const instructions = instructionsRaw
    .split("\n")
    .reduce((acc, instruction) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_unused, a, operator, b, result] = instruction.match(
        /(...)\s(...?)\s(...)\s->\s(...)/
      )!

      acc[a] ||= []
      acc[a].push({ operator, b, result })
      return acc
    }, {} as Record<string, { operator: string; b: string; result: string }[]>)

  const updatedGates = processGates(gates, instructions)

  return findValue(updatedGates, "z")
}

export function processGates(
  originalGates: Record<string, number>,
  instructions: Record<
    string,
    { operator: string; b: string; result: string }[]
  >
) {
  const queue = Object.keys(originalGates)
  const gates = { ...originalGates }

  while (queue.length > 0) {
    const gateName = queue.shift()!

    if (gateName.startsWith("z")) continue

    const gateInstructions = instructions[gateName]
    if (!gateInstructions) continue

    const gateValue = gates[gateName]

    const readded = false
    for (let i = 0; i < gateInstructions.length; i++) {
      const instruction = gateInstructions[i]
      const bName = instruction.b
      const bValue = gates[bName]
      if (bValue === undefined && !readded) {
        if (queue.includes(gateName)) continue
        queue.push(gateName)
        continue
      }

      const name = instruction.result
      const value =
        instruction.operator === "AND"
          ? gateValue & bValue
          : instruction.operator === "OR"
          ? gateValue | bValue
          : gateValue ^ bValue
      queue.push(name)
      gates[name] = value
    }
  }

  return gates
}

function findValue(gates: Record<string, number>, key: string) {
  const values = Object.keys(gates).reduce((acc, gateName) => {
    if (gateName.startsWith(key)) acc[gateName] = gates[gateName]
    return acc
  }, {} as Record<string, number>)
  const keysOrdered = Object.keys(values).sort((a, b) => b.localeCompare(a))
  const resultBinary = keysOrdered.reduce((acc, v) => `${acc}${values[v]}`, "")

  return parseInt(resultBinary, 2)
}

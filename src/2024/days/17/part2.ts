import input from "./input.txt?raw"

export function part2(data = input) {
  // return findInitialA()
  const match = data
    .replace(/\n/g, "")
    .match(
      /(\d+)Register\sB:\s(\d+)Register\sC:\s(\d+)Program:\s([0123456789,]+)/
    )

  const initialRegisterA = BigInt(match![1])
  let registerA = initialRegisterA
  let registerB = BigInt(match![2])
  let registerC = BigInt(match![3])
  const program = match![4].split(",").map(BigInt)
  let pointer = 0
  const output: bigint[] = []

  const instructions: ((o: bigint) => void)[] = [
    (o: bigint) => (registerA = registerA >> combo(o)),
    (o: bigint) => (registerB = registerB ^ o),
    (o: bigint) => (registerB = combo(o) & 7n),
    (o: bigint) => registerA !== 0n && (pointer = Number(o) - 2),
    () => (registerB = registerB ^ registerC),
    (o: bigint) => output.push(combo(o) & 7n),
    (o: bigint) => (registerB = registerA >> combo(o)),
    (o: bigint) => (registerC = registerA >> combo(o)),
  ]

  function combo(operand: bigint): bigint {
    if (operand <= 3n) return operand
    if (operand === 4n) return registerA
    if (operand === 5n) return registerB
    if (operand === 6n) return registerC
    throw "should not be reached"
  }

  function resetAndRunProgram() {
    output.length = 0
    pointer = 0
    registerB = 0n
    registerC = 0n
    while (program[pointer] != null) {
      const opcode = program[pointer]
      instructions[Number(opcode)](program[pointer + 1])
      pointer += 2
    }
  }

  function findNThatResultsInProgramValue(
    target = 0n,
    i = program.length - 1
  ): bigint {
    if (i < 0) return target

    for (let n = target * 8n; n < target * 8n + 8n; n++) {
      registerA = n
      resetAndRunProgram()
      if (output[0] === program[i]) {
        const result = findNThatResultsInProgramValue(n, i - 1)
        if (result >= 0n) return result
      }
    }
    return -1n
  }

  return findNThatResultsInProgramValue()
}

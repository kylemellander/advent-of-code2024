import input from "./input.txt?raw"

export function part1(data: string = input) {
  const match = data
    .replace(/\n/g, "")
    .match(
      /(\d+)Register\sB:\s(\d+)Register\sC:\s(\d+)Program:\s([0123456789,]+)/
    )
  let registerA = parseInt(match![1])
  let registerB = parseInt(match![2])
  let registerC = parseInt(match![3])
  const program = match![4].split(",").map(Number)
  let pointer = 0
  const output: number[] = []

  const bumpPointer = () => {
    pointer += 2
  }
  const instructions: ((operand: number) => void)[] = [
    (o: number) => {
      registerA = Math.floor(registerA / Math.pow(2, combo(o)))
      bumpPointer()
    },
    (o: number) => {
      registerB = registerB ^ o
      bumpPointer()
    },
    (o: number) => {
      registerB = combo(o) % 8
      bumpPointer()
    },
    (o: number) => {
      if (registerA === 0) bumpPointer()
      else pointer = o
    },
    () => {
      registerB = registerB ^ registerC
      bumpPointer()
    },
    (o: number) => {
      output.push(combo(o) % 8)
      bumpPointer()
    },
    (o: number) => {
      registerB = Math.floor(registerA / Math.pow(2, combo(o)))
      bumpPointer()
    },
    (o: number) => {
      registerC = Math.floor(registerA / Math.pow(2, combo(o)))
      bumpPointer()
    },
  ]

  function combo(operand: number) {
    if (operand <= 3) return operand
    if (operand === 4) return registerA
    if (operand === 5) return registerB
    if (operand === 6) return registerC
    throw "should not be reached"
  }

  while (pointer < program.length) {
    const [opcode, operand] = program.slice(pointer, pointer + 2)
    // console.log({ registerA, registerB, registerC, output })
    // console.log({ pointer, opcode, operand })
    instructions[opcode](operand)
  }

  return output.join(",")
}

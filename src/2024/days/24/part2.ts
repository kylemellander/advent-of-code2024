import input from "./input.txt?raw"

export function part2(data: string = input) {
  const instructionsRaw = data.trim().split("\n\n")[1]
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
  const highestZ = Number(
    Object.values(instructions)
      .flatMap((i) => i)
      .map((i) => i.result)
      .filter((gateName) => gateName.startsWith("z"))
      .sort((a, b) => b.localeCompare(a))[0]
      .replace("z", "")
  )

  const result = findSwaps({ instructions, highestZ })
  return result.sort((a, b) => a.localeCompare(b)).join(",")
}

function findSwaps({
  instructions: instructionsInput,
  highestZ,
}: {
  instructions: Record<
    string,
    { operator: string; b: string; result: string }[]
  >
  highestZ: number
}) {
  const instructions = { ...instructionsInput }
  const result: string[] = []
  let cachedAnd = null

  for (let i = 0; i < highestZ; i++) {
    const n = i.toString().padStart(2, "0")
    const xorMatch = findMatching(instructions, "XOR", `x${n}`, `y${n}`)
    const andMatch = findMatching(instructions, "AND", `x${n}`, `y${n}`)
    let cachedOr
    let possibleZSwap

    if (cachedAnd) {
      let andXorMatch = findMatching(
        instructions,
        "AND",
        cachedAnd.result,
        xorMatch?.result
      )

      if (!andXorMatch && xorMatch && andMatch) {
        const xorResult = xorMatch?.result
        const andResult = andMatch?.result
        xorMatch.result = andResult
        andMatch.result = xorResult
        result.push(xorResult, andResult)
        andXorMatch = findMatching(
          instructions,
          "AND",
          cachedAnd.result,
          xorMatch?.result
        )
      }

      possibleZSwap = findMatching(
        instructions,
        "XOR",
        cachedAnd.result,
        xorMatch?.result
      )

      if (xorMatch?.result?.startsWith("z") && possibleZSwap) {
        const xorResult = xorMatch.result
        const zResult = possibleZSwap.result
        xorMatch.result = zResult
        possibleZSwap.result = xorResult
        result.push(xorResult, zResult)
      }

      if (andMatch?.result?.startsWith("z") && possibleZSwap) {
        const andResult = andMatch.result
        const zResult = possibleZSwap.result
        andMatch.result = zResult
        possibleZSwap.result = andResult
        result.push(andResult, zResult)
      }

      if (andXorMatch?.result?.startsWith("z") && possibleZSwap) {
        const andXorResult = andXorMatch.result
        const zResult = possibleZSwap.result
        andXorMatch.result = zResult
        possibleZSwap.result = andXorResult
        result.push(andXorResult, zResult)
      }

      cachedOr = findMatching(
        instructions,
        "OR",
        andXorMatch?.result,
        andMatch?.result
      )
    }

    if (
      cachedOr?.result?.startsWith("z") &&
      cachedOr?.result !== `z${highestZ}` &&
      cachedOr &&
      possibleZSwap
    ) {
      const orResult = cachedOr?.result
      const zResult = possibleZSwap?.result
      cachedOr.result = zResult
      possibleZSwap.result = orResult
      result.push(orResult, zResult)
    }

    if (cachedAnd) {
      cachedAnd = cachedOr
    } else {
      cachedAnd = andMatch
    }
  }

  return result
}

function findMatching(
  instructions: Record<
    string,
    { operator: string; b: string; result: string }[]
  >,
  operator: string,
  key?: string,
  b?: string
) {
  return (
    instructions[key!]?.find((i) => i.operator === operator && i.b === b) ||
    instructions[b!]?.find((i) => i.operator === operator && i.b === key)
  )
}

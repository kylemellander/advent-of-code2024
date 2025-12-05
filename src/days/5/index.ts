import input from "./input.txt?raw"

export function part1(data: string = input) {
  const [rawRanges, rawIngredientIds] = data.split("\n\n").filter(Boolean)
  const ranges = combineRanges(rawRanges)
  const ingredientIds = rawIngredientIds.split("\n").filter(Boolean).map(Number)

  const ids = []
  for (const id of ingredientIds) {
    for (const [start, end] of ranges) {
      if (id >= start && id <= end) {
        ids.push(id)
        break
      }
    }
  }
  return ids.length
}

export function part2(data: string = input) {
  const [rawRanges] = data.split("\n\n").filter(Boolean)
  const combinedRanges = combineRanges(rawRanges)

  return combinedRanges.reduce(
    (sum, [start, end]) => sum + (end - start + 1),
    0
  )
}

function combineRanges(rawRanges: string): number[][] {
  const ranges = rawRanges
    .split("\n")
    .map((s) => s.trim().split("-").map(Number))
    .sort((a, b) => a[0] - b[0])
  const combined: number[][] = []
  for (const range of ranges) {
    const lastRange = combined[combined.length - 1]
    if (!lastRange || range[0] > lastRange[1] + 1) {
      combined.push(range)
    } else {
      lastRange[1] = Math.max(lastRange[1], range[1])
    }
  }
  return combined
}

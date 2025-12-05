import input from "./input.txt?raw"
export { Visual } from "./Visual"

export function part1(data: string = input) {
  const lines = data.split("\n").filter(Boolean)
  const width = lines[0].length
  const grid = lines.join("")
  const borderOffsetsKeys = ["ul", "u", "ur", "l", "r", "dl", "d", "dr"]

  const gridAccessibles: number[] = []
  for (let i = 0; i < grid.length; i++) {
    const cell = grid[i]
    if (cell !== "@") continue
    let surroundingCount = 0
    let j = 0

    while (surroundingCount < 4 && j < borderOffsetsKeys.length) {
      const coord = findOffsetCoord({
        index: i,
        direction: borderOffsetsKeys[j],
        width,
      })
      if (grid[coord as keyof typeof grid] === "@") {
        surroundingCount++
      }
      j++
    }

    if (surroundingCount < 4) {
      gridAccessibles.push(i)
    }
  }

  return gridAccessibles.length
}

export function part2(data: string = input) {
  const lines = data
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""))
  const width = lines[0].length
  const grid = lines.flatMap((line) => line)
  const borderOffsets = getBorderOffsets(width)
  const borderOffsetsKeys = Object.keys(
    borderOffsets
  ) as (keyof typeof borderOffsets)[]
  const findOffset = (
    i: number,
    grid: string[],
    direction: keyof typeof borderOffsets
  ) => {
    if (direction.includes("l") && i % width === 0) return undefined
    if (direction.includes("r") && i % width === width - 1) return undefined
    return grid[borderOffsets[direction] + i]
  }
  while (true) {
    let tpRemoved = false
    for (let i = 0; i < grid.length; i++) {
      const cell = grid[i]
      if (cell !== "@") continue
      let surroundingCount = 0
      let j = 0

      while (surroundingCount < 4 && j < borderOffsetsKeys.length) {
        const coord = findOffset(i, grid, borderOffsetsKeys[j])
        if (coord === "@") {
          surroundingCount++
        }
        j++
      }
      if (surroundingCount < 4) {
        grid[i] = "*"
        tpRemoved = true
      }
    }
    if (!tpRemoved) break
  }

  return grid.join("").match(/\*/g)?.length ?? 0
}

function getBorderOffsets(width: number) {
  return {
    ul: -1 * width - 1,
    u: -1 * width,
    ur: -1 * width + 1,
    l: -1,
    r: 1,
    dl: width - 1,
    d: width,
    dr: width + 1,
  }
}

export function findOffsetCoord({
  index,
  direction,
  width,
  directions = {
    ul: -1 * width - 1,
    u: -1 * width,
    ur: -1 * width + 1,
    l: -1,
    r: 1,
    dl: width - 1,
    d: width,
    dr: width + 1,
  },
}: {
  index: number
  direction: string
  directions?: Record<string, number>
  width: number
}) {
  if (direction.includes("l") && index % width === 0) return undefined
  if (direction.includes("r") && index % width === width - 1) return undefined
  return directions[direction] + index
}

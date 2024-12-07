import input from "./input.txt?raw"

export function part1() {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""))

  let result = 0
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      result += getWordCount(grid, x, y)
    }
  }

  return result
}

function getWordCount(grid: string[][], x: number, y: number) {
  const cell = grid[x][y]
  if (cell !== "X") return 0
  let result = 0
  if (findMAS(grid, x, y, -1, -1)) result += 1
  if (findMAS(grid, x, y, -1, 0)) result += 1
  if (findMAS(grid, x, y, 0, -1)) result += 1
  if (findMAS(grid, x, y, 1, -1)) result += 1
  if (findMAS(grid, x, y, 1, 0)) result += 1
  if (findMAS(grid, x, y, 1, 1)) result += 1
  if (findMAS(grid, x, y, 0, 1)) result += 1
  if (findMAS(grid, x, y, -1, 1)) result += 1

  return result
}

function findMAS(
  grid: string[][],
  x: number,
  y: number,
  xMod: number,
  yMod: number
) {
  return (
    grid[x + 3 * xMod] &&
    grid[x + xMod][y + yMod] === "M" &&
    grid[x + 2 * xMod][y + 2 * yMod] === "A" &&
    grid[x + 3 * xMod][y + 3 * yMod] === "S"
  )
}

export function part2() {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""))

  let result = 0
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      result += getWordCountPart2(grid, x, y)
    }
  }

  return result
}

function getWordCountPart2(grid: string[][], x: number, y: number) {
  const cell = grid[x][y]
  if (cell !== "A") return 0
  if (!grid[x - 1] || !grid[x + 1]) return 0

  if (isBackSlashMAS(grid, x, y) && isForwardSlashMAS(grid, x, y)) {
    return 1
  }
  return 0
}

function isBackSlashMAS(grid: string[][], x: number, y: number) {
  return (
    (grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
    (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M")
  )
}

function isForwardSlashMAS(grid: string[][], x: number, y: number) {
  return (
    (grid[x + 1][y - 1] === "M" && grid[x - 1][y + 1] === "S") ||
    (grid[x + 1][y - 1] === "S" && grid[x - 1][y + 1] === "M")
  )
}

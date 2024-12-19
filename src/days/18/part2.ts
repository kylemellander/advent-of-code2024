import input from "./input.txt?raw"
import { findPaths } from "./part1"

export function part2(
  data: string = input,
  {
    height = 71,
    width = 71,
    bytes = 1024,
  }: { height?: number; width?: number; bytes?: number } = {}
) {
  const coords = data
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(",").map(Number))
    .map(([x, y]) => x + y * width)
  const limitedCoords = coords.slice(0, bytes)
  const extraCoords = coords.slice(bytes)
  const coordSet = new Set(limitedCoords)

  for (let i = 0; i <= extraCoords.length; i++) {
    const coord = extraCoords[i]
    coordSet.add(coord)

    const { shortestPathScore } = findPaths(
      coordSet,
      width,
      height,
      0,
      height * width - 1
    )

    if (shortestPathScore === Infinity) {
      return `${coord % width},${Math.floor(coord / width)}`
    }
  }
}

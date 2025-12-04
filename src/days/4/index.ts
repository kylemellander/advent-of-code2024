import input from "./input.txt?raw"
import { adjacentCoords } from "./shared"
export { Visual } from "./Visual"

export function part1(data: string = input) {
  const lines = data.split("\n").filter(Boolean)
  const height = lines.length
  const width = lines[0].length
  const accessibles: [number, number][] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = lines[y][x]
      if (cell !== "@") continue
      let surroundingCount = 0
      let i = 0
      while (surroundingCount < 4 && i < adjacentCoords.length) {
        const [offsetX, offsetY] = adjacentCoords[i]
        if (lines[y + offsetY]?.[x + offsetX] === "@") surroundingCount++

        i++
      }

      if (surroundingCount < 4) {
        accessibles.push([x, y])
      }
    }
  }
  return accessibles.length
}

export function part2(data: string = input) {
  const lines = data
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""))
  const height = lines.length
  const width = lines[0].length
  const accessibles: [number, number][] = []
  while (true) {
    let tpRemoved = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = lines[y][x]
        if (cell !== "@") continue
        let surroundingCount = 0
        let i = 0
        while (surroundingCount < 4 && i < adjacentCoords.length) {
          const [offsetX, offsetY] = adjacentCoords[i]
          if (lines[y + offsetY]?.[x + offsetX] === "@") {
            surroundingCount++
          }
          i++
        }
        if (surroundingCount < 4) {
          accessibles.push([x, y])
          lines[y][x] = "."
          tpRemoved = true

          break
        }
      }
    }
    if (!tpRemoved) break
  }
  return accessibles.length
}

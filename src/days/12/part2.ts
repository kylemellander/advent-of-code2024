import { joinGroupsOfN } from "../8"
import input from "./input.txt?raw"

export function part2(data = input, shouldDraw = false) {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  const width = lines[0].length
  const height = lines.length
  const length = height * width
  const offsets = [-width, 1, width, -1]
  const map = lines.join("")

  const usedIndexes = new Set<number>()

  let cost = 0

  for (let i = 0; i < length; i++) {
    if (usedIndexes.has(i)) continue
    const plot = [i]
    usedIndexes.add(i)

    for (let j = 0; j < plot.length; j++) {
      getNeighbors(plot[j]).forEach((neighbor) => {
        if (usedIndexes.has(neighbor)) return
        usedIndexes.add(neighbor)
        plot.push(neighbor)
      })
    }

    const area = plot.length
    const sides = determineSides(plot.sort((a, b) => a - b))

    cost += area * sides
  }

  return cost

  function getNeighbors(index: number) {
    const value = map[index]
    return getNeighborIndexes(index).filter((i) => map[i] === value)
  }

  function getNeighborIndexes(index: number) {
    return offsets.map((offset) => {
      const i = index + offset
      if (
        offsets.indexOf(offset) % 2 === 1 &&
        Math.floor(i / width) !== Math.floor(index / width)
      )
        return -1
      return i
    })
  }

  function getNewIndex(index: number) {
    const newWidth = width * 2 + 1
    const y = 2 * Math.floor(index / width) + 1
    const x = 2 * (index % width) + 1
    return y * newWidth + x
  }

  function determineSides(plot: number[]) {
    const expandedPlotIntersects: number[] = []
    const expandedPlots = new Set<number>()
    const baseOffsets = [-(width * 2 + 1), 1, width * 2 + 1, -1]
    const eightOffsets = [
      baseOffsets[3] + baseOffsets[0],
      baseOffsets[0],
      baseOffsets[0] + baseOffsets[1],
      baseOffsets[1],
      baseOffsets[1] + baseOffsets[2],
      baseOffsets[2],
      baseOffsets[2] + baseOffsets[3],
      baseOffsets[3],
    ]
    for (let i = 0; i < plot.length; i++) {
      const index = plot[i]
      const newIndex = getNewIndex(index)
      expandedPlots.add(newIndex)
      for (let j = 0; j < eightOffsets.length; j++) {
        if (!expandedPlotIntersects.includes(newIndex + eightOffsets[j])) {
          expandedPlotIntersects.push(newIndex + eightOffsets[j])
        }
      }
    }
    let sides = 0
    const sortedIntersects = expandedPlotIntersects.sort((a, b) => a - b)
    sortedIntersects.forEach((i) => {
      const corners = [
        expandedPlots.has(i + eightOffsets[0]),
        expandedPlots.has(i + eightOffsets[2]),
        expandedPlots.has(i + eightOffsets[4]),
        expandedPlots.has(i + eightOffsets[6]),
      ]

      const cornerHits = corners.filter((c) => c).length
      if (cornerHits === 1) sides += 1
      if (cornerHits === 3) sides += 1
      if (cornerHits === 2 && corners[0] && corners[2]) sides += 2
      if (cornerHits === 2 && corners[1] && corners[3]) sides += 2
    })

    if (shouldDraw)
      draw({ width, height, sortedIntersects, expandedPlots, plot })

    return sides
  }
}

function draw({
  width,
  height,
  sortedIntersects,
  expandedPlots,
  plot,
}: {
  sortedIntersects: number[]
  expandedPlots: Set<number>
  plot: number[]
  width: number
  height: number
}) {
  let draw = ""
  for (let i = 0; i < (width * 2 + 1) * (height * 2 + 1); i++) {
    if (sortedIntersects.includes(i) && expandedPlots.has(i)) {
      console.log(i)
      draw += "T"
    } else if (sortedIntersects.includes(i)) {
      draw += "*"
    } else if (expandedPlots.has(i)) {
      draw += "x"
    } else {
      draw += "."
    }
  }

  console.log("\n\n\n", plot)
  console.log(joinGroupsOfN(draw.split(""), width * 2 + 1).join("\n"))
}

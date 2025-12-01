import { joinGroupsOfN } from "../8"
import { getNeighbors, setupMap } from "./shared"
import input from "./input.txt?raw"

export function part2(data = input, shouldDraw = false) {
  const { length, offsets, map, width, height } = setupMap(data)
  const usedIndexes = new Set<number>()
  let cost = 0

  for (let i = 0; i < length; i++) {
    if (usedIndexes.has(i)) continue
    const plot = [i]
    usedIndexes.add(i)

    for (let j = 0; j < plot.length; j++) {
      getNeighbors({ index: plot[j], map, width, offsets }).forEach(
        (neighbor) => {
          if (usedIndexes.has(neighbor)) return
          usedIndexes.add(neighbor)
          plot.push(neighbor)
        }
      )
    }

    const area = plot.length
    const sides = determineSides({ plot, width, height })

    cost += area * sides
  }

  return cost

  function determineSides({
    plot,
    width: oldWidth,
    height: oldHeight,
  }: {
    plot: number[]
    width: number
    height: number
  }) {
    const { intersects, offsets, expandedPlot, width, height } = expandPlot({
      plot,
      width: oldWidth,
      height: oldHeight,
    })
    let sides = 0
    const sortedIntersects = intersects.sort((a, b) => a - b)
    sortedIntersects.forEach((i) => {
      const corners = [
        expandedPlot.has(i + offsets[0]),
        expandedPlot.has(i + offsets[2]),
        expandedPlot.has(i + offsets[4]),
        expandedPlot.has(i + offsets[6]),
      ]

      const cornerHits = corners.filter((c) => c).length
      if (cornerHits === 1) sides += 1
      if (cornerHits === 3) sides += 1
      if (cornerHits === 2 && corners[0] && corners[2]) sides += 2
      if (cornerHits === 2 && corners[1] && corners[3]) sides += 2
    })

    if (shouldDraw)
      draw({ width, height, sortedIntersects, expandedPlot, plot })

    return sides
  }
}

function expandPlot({
  plot,
  width,
  height,
}: {
  plot: number[]
  width: number
  height: number
}) {
  const expandedPlotIntersects: number[] = []
  const expandedPlots = new Set<number>()
  const newWidth = width * 2 + 1
  const newHeight = height * 2 + 1
  const baseOffsets = [-newWidth, 1, newWidth, -1]
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
    const newIndex = getExpandedIndex({ index, width })
    expandedPlots.add(newIndex)
    for (let j = 0; j < eightOffsets.length; j++) {
      if (!expandedPlotIntersects.includes(newIndex + eightOffsets[j])) {
        expandedPlotIntersects.push(newIndex + eightOffsets[j])
      }
    }
  }

  return {
    intersects: expandedPlotIntersects,
    offsets: eightOffsets,
    expandedPlot: expandedPlots,
    width: newWidth,
    height: newHeight,
  }
}

function getExpandedIndex({ index, width }: { index: number; width: number }) {
  const newWidth = width * 2 + 1
  const y = 2 * Math.floor(index / width) + 1
  const x = 2 * (index % width) + 1
  return y * newWidth + x
}

function draw({
  width,
  height,
  sortedIntersects,
  expandedPlot,
  plot,
}: {
  sortedIntersects: number[]
  expandedPlot: Set<number>
  plot: number[]
  height: number
  width: number
}) {
  let draw = ""
  for (let i = 0; i < width * height; i++) {
    if (sortedIntersects.includes(i)) {
      draw += "*"
    } else if (expandedPlot.has(i)) {
      draw += "x"
    } else {
      draw += "."
    }
  }

  console.log("\n\n\n", plot)
  console.log(joinGroupsOfN(draw.split(""), width).join("\n"))
}

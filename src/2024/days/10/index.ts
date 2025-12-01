// import { joinGroupsOfN } from "../8"
import input from "./input.txt?raw"

export function part1(data = input) {
  const { trailheads, offsets, width, grid } = setupTrailMap(data)

  const conditionFn = ({
    currentTrails,
    index,
  }: {
    currentTrails: number[]
    index: number
  }) => !currentTrails.includes(index)
  return countTrails({
    trailheads,
    offsets,
    width,
    grid,
    conditionFn,
  })
}

export function part2(data = input) {
  const { trailheads, offsets, width, grid } = setupTrailMap(data)

  return countTrails({ trailheads, offsets, width, grid })
}

function setupTrailMap(data: string) {
  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
  const width = lines[0].length
  const grid = lines
    .join("")
    .split("")
    .map((n) => parseInt(n))
  const offsets: number[] = [-width, 1, width, -1]
  const trailheads = []
  for (let i = 0; i < grid.length; i++) if (grid[i] === 0) trailheads.push(i)

  return { trailheads, offsets, width, grid }
}

function countTrails({
  trailheads,
  conditionFn,
  offsets,
  width,
  grid,
}: {
  trailheads: number[]
  conditionFn?: (data: { currentTrails: number[]; index: number }) => boolean
  offsets: number[]
  width: number
  grid: number[]
}) {
  let count = 0
  for (const i in trailheads) {
    let trails = [trailheads[i]]

    for (let height = 1; height <= 9; height++) {
      const newTrails: number[] = []
      for (const trail of trails) {
        for (let offsetI = 0; offsetI < offsets.length; offsetI++) {
          const offset = offsets[offsetI]
          if (offsetI === 1 && trail % width === width - 1) continue
          if (offsetI === 3 && trail % width === 0) continue
          if (grid[trail + offset] !== height) continue
          if (
            conditionFn &&
            !conditionFn({ currentTrails: newTrails, index: trail + offset })
          )
            continue

          newTrails.push(trail + offset)
        }
      }
      trails = newTrails
    }

    count += trails.length
  }
  return count
}

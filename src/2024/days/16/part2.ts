import input from "./input.txt?raw"
import { findPaths } from "./shared"

export function part2(data = input) {
  const potentialPaths = findPaths(data)

  const bestScore = potentialPaths.reduce(
    (min, { score }) => Math.min(min, score),
    Infinity
  )

  const bestPaths = potentialPaths.filter(({ score }) => score === bestScore)
  const allLocationsForAllRoutes = bestPaths.flatMap(({ path }) => path)
  const uniqueLocations = new Set(allLocationsForAllRoutes)
  return uniqueLocations.size
}

import input from "./input.txt?raw"
import { draw, run, setupRobots } from "./shared"

export function part2(data = input) {
  const width: number = 101
  const height: number = 103
  const robots = setupRobots(data, width)
  const loopLength = Math.max(width, height)

  const firstNRobots = []
  for (let i = 0; i < loopLength; i++) {
    const result = run({ robots, seconds: i, height, width }).map(
      (robot) => robot.position
    )
    firstNRobots.push(result)
  }

  let variant = Infinity
  let lowestVariance = Infinity
  for (let i = 0; i < firstNRobots.length; i++) {
    const result = variance(firstNRobots[i])
    if (result < lowestVariance) {
      variant = i
      lowestVariance = result
    }
  }

  let seconds = variant
  while (true) {
    const movedRobots = run({ robots, seconds, height, width })
    const result = draw(movedRobots, { height, width })
    if (result.includes("1111111111")) return seconds
    seconds += loopLength
  }
}

function variance(arr: number[]) {
  if (arr.length === 0) {
    return 0
  }

  const mean = arr.reduce((sum, value) => sum + value, 0) / arr.length
  const squaredDifferences = arr.map((value) => Math.pow(value - mean, 2))
  const sumOfSquaredDifferences = squaredDifferences.reduce(
    (sum, value) => sum + value,
    0
  )

  return sumOfSquaredDifferences / (arr.length - 1) // Sample variance
}

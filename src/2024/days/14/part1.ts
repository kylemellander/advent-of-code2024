import input from "./input.txt?raw"
import { run, setupRobots } from "./shared"

export function part1(
  data: string = input,
  width: number = 101,
  height: number = 103,
  seconds: number = 100
) {
  const robots = setupRobots(data, width)
  const movedRobots = run({ robots, width, height, seconds })
  return countQuandrants(movedRobots, width, height)
}

function countQuandrants(
  robots: { position: number }[],
  width: number,
  height: number
) {
  const positions = robots.map((robot) => robot.position)
  const centerX = (width - 1) / 2
  const centerY = (height - 1) / 2
  const quadrants = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  }

  for (const position of positions) {
    const x = position % width
    const y = Math.floor(position / width)

    if (x === centerX || y === centerY) continue
    if (x > centerX && y > centerY) {
      quadrants[1]++
    } else if (x < centerX && y > centerY) {
      quadrants[2]++
    } else if (x < centerX && y < centerY) {
      quadrants[3]++
    } else {
      quadrants[4]++
    }
  }

  return Object.values(quadrants).reduce((sum, value) => sum * value, 1)
}

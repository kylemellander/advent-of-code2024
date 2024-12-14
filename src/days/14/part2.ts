import input from "./input.txt?raw"
import { draw, run, setupRobots } from "./shared"

export function part2(data = input) {
  const width: number = 101
  const height: number = 103
  const robots = setupRobots(data, width)

  let seconds = 0
  while (true) {
    const result = draw(run({ robots, seconds, height, width }), {
      height,
      width,
    })
    if (result.includes("1111111111")) return seconds
    seconds++
  }
}

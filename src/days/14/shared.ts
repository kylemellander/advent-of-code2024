import { Robot } from "./types"

export function setupRobots(data: string, width: number): Robot[] {
  return data
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/p=(-?\d+),(-?\d+)\sv=(-?\d+),(-?\d+)/)

      if (!match) {
        throw new Error("Invalid input")
      }
      const vx = parseInt(match[3])
      const vy = parseInt(match[4])

      return {
        position: parseInt(match[1]) + parseInt(match[2]) * width,
        velocity: vx + vy * width,
        vx: vx,
      }
    })
}

export function draw(
  robots: { position: number }[],
  {
    onMiss,
    width,
    height,
  }: {
    onMiss?: string
    width: number
    height: number
  } = { width: 103, height: 101 }
) {
  const result = []
  for (let y = 0; y < height; y++) {
    let line = ""
    for (let x = 0; x < width; x++) {
      const index = y * width + x
      const robotsAtLocation = robots.filter(
        (robot) => robot.position === index
      )
      if (robotsAtLocation.length) {
        line += `${robotsAtLocation.length}`
      } else {
        line += onMiss || "."
      }
    }
    result.push(line)
  }

  return result.join("\n")
}

export function run({
  robots,
  seconds,
  height,
  width,
}: {
  robots: { position: number; velocity: number; vx: number }[]
  seconds: number
  height: number
  width: number
}) {
  const movedRobots = []
  const length = height * width
  for (let i = 0; i < robots.length; i++) {
    const robot = robots[i]
    const newPosition = robot.position + robot.velocity * seconds

    const wrapBoost =
      width *
      (Math.floor(robot.position / width) -
        Math.floor((seconds * robot.vx + robot.position) / width))
    const adjustedPosition =
      (seconds * length + newPosition + wrapBoost) % length
    movedRobots.push({ position: adjustedPosition })
  }

  return movedRobots
}

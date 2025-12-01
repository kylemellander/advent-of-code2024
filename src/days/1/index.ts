import input from "./input.txt?raw"

export function part1(
  data: string = input,
  start: number = 50,
  total: number = 100
) {
  const lines = data
    .split("\n")
    .filter(Boolean)
    .map((line) => [line[0] === "L" ? -1 : 1, parseInt(line.slice(1))])
  let currentLocation = start

  return lines.reduce((password, [direction, steps]) => {
    const newLocation = currentLocation + direction * steps
    const adjustment = newLocation % total === 0 ? 1 : 0
    currentLocation = newLocation
    return password + adjustment
  }, 0)
}

export function part2(
  data: string = input,
  start: number = 50,
  total: number = 100
) {
  const lines = data
    .split("\n")
    .filter(Boolean)
    .map((line) => [line[0] === "L" ? -1 : 1, parseInt(line.slice(1))])
  let currentLocation = start
  return lines.reduce((password, [direction, steps]) => {
    const newLocation = currentLocation + direction * steps
    const newFloor = Math.floor(newLocation / total)
    const currentFloor = Math.floor(currentLocation / total)
    const crossedZeroes = Math.abs(newFloor - currentFloor)
    const zeroesLandedOn = newLocation % total === 0 ? 1 : 0
    const adjustmentForLandingOnZeroIfGoingUp =
      zeroesLandedOn === 1 && direction === 1 ? -1 : 0
    const adjustmentForPreviouslyBeingOnZeroIfGoingDown =
      currentLocation % total === 0 && direction === -1 ? -1 : 0
    currentLocation = newLocation
    return (
      password +
      crossedZeroes +
      zeroesLandedOn +
      adjustmentForLandingOnZeroIfGoingUp +
      adjustmentForPreviouslyBeingOnZeroIfGoingDown
    )
  }, 0)
}

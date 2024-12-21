import input from "./input.txt?raw"

export function part1(data: string = input) {
  const targets = data.trim().split("\n")

  const startNumeric = 11
  const startDirectional = 2

  const myMoves = targets.map((target) => {
    const movesOfNumericRobot: (string | number)[][] = []
    for (let i = 0; i < target.length; i++) {
      const goal = target[i]
      const position = i === 0 ? startNumeric : NUMERIC.indexOf(target[i - 1])

      // original Robot movement
      const moves = findMovesNeccessary(goal, position, NUMERIC)
      movesOfNumericRobot.push(moves)
      movesOfNumericRobot.push(["A"])
    }

    // logRobot(movesOfNumericRobot)

    const movesOfDirectionalRobot1 = abstractOneLevel({
      start: startDirectional,
      originalMoves: movesOfNumericRobot,
    })

    // logRobot(movesOfDirectionalRobot1)

    const movesOfDirectionalRobot2 = abstractOneLevel({
      start: startDirectional,
      originalMoves: movesOfDirectionalRobot1,
    })

    logRobot(movesOfDirectionalRobot2)

    return movesOfDirectionalRobot2
  })

  return targets.reduce((sum, target, i) => {
    const numericOfTarget = Number(target.replace(/[^\d]/g, ""))
    console.log(numericOfTarget, myMoves[i].flatMap((m) => m).length)
    const score = numericOfTarget * myMoves[i].flatMap((m) => m).length
    return sum + score
  }, 0)
}

const NUMERIC = [
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  undefined,
  "0",
  "A",
]
const DIRECTIONAL = [undefined, 0, "A", 3, 2, 1]
const PAD_WIDTH = 3

function findMovesNeccessary(
  target: string | number,
  position: number,
  map: (number | string | undefined)[]
): (string | number)[] {
  const targetPosition = map.indexOf(target)
  const xAdjust = (targetPosition % PAD_WIDTH) - (position % PAD_WIDTH)
  const yAdjust =
    Math.floor(targetPosition / PAD_WIDTH) - Math.floor(position / PAD_WIDTH)

  const moves = []
  for (let i = 0; i < Math.abs(xAdjust); i++) moves.push(xAdjust > 0 ? 1 : 3)
  for (let i = 0; i < Math.abs(yAdjust); i++) moves.push(yAdjust > 0 ? 2 : 0)
  return moves
}

function findClosest(current: number, targets: number[], width: number) {
  const currentX = current % width
  const currentY = Math.floor(current / width)
  const closest = targets.reduce(
    (closest, target) => {
      const targetX = target % width
      const targetY = Math.floor(target / width)
      const distance =
        Math.abs(targetX - currentX) + Math.abs(targetY - currentY)
      if (distance < closest.distance) {
        return { distance, target }
      }
      return closest
    },
    { distance: Infinity, target: -1 }
  )

  return closest.target
}

function abstractOneLevel({
  start,
  originalMoves,
}: {
  start: number
  originalMoves: (string | number)[][]
}) {
  const allMoves = []

  let robotPosition = start
  for (let i = 0; i < originalMoves.length; i++) {
    const targetsRemaining = [...originalMoves[i]]

    // find nearest direction
    while (targetsRemaining.length > 0) {
      // find index of closest direction
      const closest = findClosest(
        robotPosition,
        targetsRemaining.map((target) => DIRECTIONAL.indexOf(target)),
        PAD_WIDTH
      )
      const closestDirection = DIRECTIONAL[closest]!
      const closestDirectionIndex = targetsRemaining.indexOf(closestDirection)
      targetsRemaining.splice(closestDirectionIndex, 1)

      // move to target
      const moves = findMovesNeccessary(
        closestDirection,
        robotPosition,
        DIRECTIONAL
      )

      robotPosition = closest
      // Submit it!
      allMoves.push(moves)
      allMoves.push(["A"])
    }
  }

  return allMoves
}

function logRobot(array: (string | number)[][]) {
  const log = array
    .flatMap((moves) =>
      moves.map((move) => {
        if (move === 0) return "^"
        if (move === 1) return ">"
        if (move === 2) return "v"
        if (move === 3) return "<"

        return move
      })
    )
    .join("")
  console.log(log, log.length)
  console.log(
    "<v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A",
    "target"
  )
}

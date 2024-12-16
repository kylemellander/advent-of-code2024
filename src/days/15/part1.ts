import input from "./input.txt?raw"

export function part1(data: string = input) {
  const [gridRaw, movements] = data.trim().split("\n\n")
  const lines = gridRaw.split("\n")
  const width = lines[0].length
  const grid = lines.join("").split("")
  const offsetMap = {
    "^": -width,
    ">": 1,
    v: width,
    "<": -1,
  }

  const gridState = [...grid]
  let robotLocation = grid.indexOf("@")
  for (let i = 0; i < movements.length; i++) {
    const offset = offsetMap[movements[i] as "^" | ">" | "v" | "<"]
    const moveToIndex = robotLocation + offset
    const moveTo = gridState[moveToIndex]
    if (moveTo === ".") {
      gridState[robotLocation] = "."
      robotLocation = moveToIndex
      gridState[moveToIndex] = "@"
    } else if (moveTo === "O") {
      // find last empty spot or wall
      let endOfBoxRowIndex = moveToIndex + offset
      while (gridState[endOfBoxRowIndex] === "O") {
        endOfBoxRowIndex += offset
      }
      if (gridState[endOfBoxRowIndex] === ".") {
        gridState[robotLocation] = "."
        robotLocation = moveToIndex
        gridState[moveToIndex] = "@"
        gridState[endOfBoxRowIndex] = "O"
      }
    }
  }

  let sumOfCoordinatesOfBoxes = 0
  for (let i = 0; i < gridState.length; i++) {
    if (gridState[i] === "O") {
      const x = i % width
      const y = Math.floor(i / width)
      sumOfCoordinatesOfBoxes += 100 * y + x
    }
  }

  return sumOfCoordinatesOfBoxes
}

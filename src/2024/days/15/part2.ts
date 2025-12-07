import input from "./input.txt?raw"

export function part2(data = input) {
  const [gridRaw, movements] = data.trim().split("\n\n")
  const lines = gridRaw.split("\n")
  const width = lines[0].length * 2
  const grid = lines
    .join("")
    .split("")
    .map((c) => {
      if (c === "@") return "@."
      if (c === "O") return "[]"
      if (c === "#") return "##"
      if (c === ".") return ".."
    })
    .join("")
    .split("")
  const offsetMap = {
    "^": -width,
    ">": 1,
    v: width,
    "<": -1,
  }

  // console.log(joinGroupsOfN(grid, width).join("\n"))

  const gridState = [...grid]
  let robotLocation = grid.indexOf("@")
  for (let i = 0; i < movements.length; i++) {
    if (movements[i] === " ") continue

    // console.log(joinGroupsOfN(gridState, width).join("\n"))
    // console.log(movements[i], i)
    const offset = offsetMap[movements[i] as "^" | ">" | "v" | "<"]
    const moveToIndex = robotLocation + offset
    const moveTo = gridState[moveToIndex]
    if (moveTo === ".") {
      gridState[robotLocation] = "."
      robotLocation = moveToIndex
      gridState[moveToIndex] = "@"
    } else if (
      (movements[i] === ">" || movements[i] === "<") &&
      (moveTo === "[" || moveTo === "]")
    ) {
      // find last empty spot or wall
      let endOfBoxRowIndex = moveToIndex + offset
      while (
        gridState[endOfBoxRowIndex] === "[" ||
        gridState[endOfBoxRowIndex] === "]"
      ) {
        endOfBoxRowIndex += offset
      }
      if (gridState[endOfBoxRowIndex] === ".") {
        gridState[robotLocation] = "."
        for (let j = endOfBoxRowIndex; j !== moveToIndex; j -= offset) {
          gridState[j] = gridState[j - offset]
        }
        robotLocation = moveToIndex
        gridState[moveToIndex] = "@"
      }
    } else if (moveTo === "]") {
      let wall = false
      const indicesToMove = [moveToIndex, moveToIndex - 1]
      let currentRowofBoxes = [...indicesToMove]

      while (!wall) {
        const { hitWall, indexesOfBoxesPushed } = findBoxesPushed(
          gridState,
          currentRowofBoxes,
          offset
        )
        if (hitWall) {
          wall = true
        } else if (indexesOfBoxesPushed.length === 0) {
          break
        } else {
          indexesOfBoxesPushed.forEach((index) => {
            indicesToMove.push(index)
          })
          currentRowofBoxes = indexesOfBoxesPushed
        }
      }

      if (!wall) {
        for (let j = indicesToMove.length - 1; j >= 0; j--) {
          gridState[indicesToMove[j] + offset] = gridState[indicesToMove[j]]
          if (!indicesToMove.includes(indicesToMove[j] - offset)) {
            gridState[indicesToMove[j]] = "."
          }
        }
        gridState[robotLocation] = "."
        robotLocation = moveToIndex
      }
    } else if (moveTo === "[") {
      let wall = false
      const indicesToMove = [moveToIndex, moveToIndex + 1]
      let currentRowofBoxes = [...indicesToMove]

      while (!wall) {
        const { hitWall, indexesOfBoxesPushed } = findBoxesPushed(
          gridState,
          currentRowofBoxes,
          offset
        )
        if (hitWall) {
          wall = true
        } else if (indexesOfBoxesPushed.length === 0) {
          break
        } else {
          indexesOfBoxesPushed.forEach((index) => {
            indicesToMove.push(index)
          })
          currentRowofBoxes = indexesOfBoxesPushed
        }
      }

      if (!wall) {
        for (let j = indicesToMove.length - 1; j >= 0; j--) {
          gridState[indicesToMove[j] + offset] = gridState[indicesToMove[j]]
          if (!indicesToMove.includes(indicesToMove[j] - offset)) {
            gridState[indicesToMove[j]] = "."
          }
        }
        gridState[robotLocation] = "."
        robotLocation = moveToIndex
      }
    }
  }

  // console.log(joinGroupsOfN(gridState, width).join("\n"))

  let sumOfCoordinatesOfBoxes = 0
  for (let i = 0; i < gridState.length; i++) {
    if (gridState[i] === "[") {
      const x = i % width
      const y = Math.floor(i / width)
      sumOfCoordinatesOfBoxes += 100 * y + x
    }
  }

  return sumOfCoordinatesOfBoxes
}

function findBoxesPushed(
  gridState: string[],
  indexes: number[],
  offset: number
) {
  const indexesOfBoxesPushed: number[] = []
  let hitWall = false
  for (const index of indexes) {
    if (gridState[index + offset] === "]") {
      indexesOfBoxesPushed.push(index + offset)
      indexesOfBoxesPushed.push(index + offset - 1)
    } else if (gridState[index + offset] === "[") {
      indexesOfBoxesPushed.push(index + offset)
      indexesOfBoxesPushed.push(index + offset + 1)
    } else if (gridState[index + offset] === "#") {
      hitWall = true
    }
  }

  return {
    hitWall,
    indexesOfBoxesPushed: indexesOfBoxesPushed.filter(
      (n, i) => indexesOfBoxesPushed.indexOf(n) === i
    ),
  }
}

import input from "./input.txt?raw"

export function part1(data: string = input) {
  const keys = data
    .trim()
    .split("\n\n")
    .map((key) => {
      const lines = key.split("\n")
      const isDown = lines[0][0] === "#"
      const counts = isDown ? getCountsDown(lines) : getCountsUp(lines)
      return { isDown, counts }
    })
  const [downKeys, upKeys] = keys.reduce(
    ([down, up], key) => {
      if (key.isDown) return [[...down, key.counts], up]
      return [down, [...up, key.counts]]
    },
    [[], []] as number[][][]
  )

  const matchingCombos = findMatchingCombos({ downKeys, upKeys })
  return matchingCombos.length
}

function findMatchingCombos({
  downKeys,
  upKeys,
}: {
  downKeys: number[][]
  upKeys: number[][]
}) {
  const matchingCombos = []
  for (const downKey of downKeys) {
    for (const upKey of upKeys) {
      if (downKey.every((down, i) => down + upKey[i] <= 5)) {
        matchingCombos.push([downKey, upKey])
      }
    }
  }

  return matchingCombos
}

function getCountsDown(lines: string[]) {
  const counts = []
  for (let x = 0; x < lines[0].length; x++) {
    for (let y = 1; y < lines.length; y++) {
      if (lines[y][x] === ".") {
        counts.push(y - 1)
        break
      }
    }
  }

  return counts
}

function getCountsUp(lines: string[]) {
  const counts = []
  const height = lines.length
  for (let x = 0; x < lines[0].length; x++) {
    for (let y = lines.length - 2; y >= 0; y--) {
      if (lines[y][x] === ".") {
        counts.push(height - y - 2)
        break
      }
    }
  }

  return counts
}

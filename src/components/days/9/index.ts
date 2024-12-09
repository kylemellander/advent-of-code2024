import input from "./input.txt?raw"

export function part1(data = input) {
  const file = data.trim()

  const result = []
  const backwardStartsOn = file.length % 2 === 1
  let backwardsIndex = backwardStartsOn ? file.length - 1 : file.length - 2
  let backwardRemaining = parseInt(file[backwardsIndex])

  for (let i = 0; i < file.length; i++) {
    if (i > backwardsIndex) break

    const times = parseInt(file[i])
    if (i % 2 === 0) {
      const n = i / 2

      if (i === backwardsIndex) {
        for (let i = 0; i < backwardRemaining; i++) result.push(n)
        break
      }

      for (let i = 0; i < times; i++) result.push(n)
    } else {
      for (let t = 0; t < times; t++) {
        while (backwardRemaining === 0) {
          backwardsIndex -= 2
          backwardRemaining = parseInt(file[backwardsIndex])
        }
        if (i > backwardsIndex) break
        const n = backwardsIndex / 2
        result.push(n)
        backwardRemaining--
      }
    }
  }

  return result.reduce((acc, n, i) => acc + n * i, 0)
}

export function part2(data = input) {}

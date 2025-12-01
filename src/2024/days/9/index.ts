import input from "./input.txt?raw"

export function part1(data = input) {
  const file = data
    .trim()
    .split("")
    .map((n) => parseInt(n))

  const result = []
  const backwardStartsOn = file.length % 2 === 1
  let backwardsIndex = backwardStartsOn ? file.length - 1 : file.length - 2
  let backwardRemaining = file[backwardsIndex]

  for (let i = 0; i < file.length; i++) {
    if (i > backwardsIndex) break

    const times = file[i]
    if (i % 2 === 0) {
      const n = i / 2

      if (i === backwardsIndex) {
        addToResult(n, backwardRemaining)
        break
      }

      addToResult(n, times)
    } else {
      for (let t = 0; t < times; t++) {
        while (backwardRemaining === 0) {
          backwardsIndex -= 2
          backwardRemaining = file[backwardsIndex]
        }
        if (i > backwardsIndex) break
        result.push(backwardsIndex / 2)
        backwardRemaining--
      }
    }
  }

  return result.reduce((acc, n, i) => acc + n * i, 0)

  function addToResult(n: number, times: number) {
    nTimes(times, () => result.push(n))
  }
}

export function part2(data = input) {
  const file = data
    .trim()
    .split("")
    .map((n) => parseInt(n))

  const result: number[] = []
  const backwardStartsOn = file.length % 2 === 1
  const endIndex = backwardStartsOn ? file.length - 1 : file.length - 2
  const usedIndices = new Set<number>()

  for (let i = 0; i < file.length; i++) {
    let times = file[i]

    if (i % 2 === 0 && !usedIndices.has(i)) {
      addToResult(i / 2, times)
    } else {
      for (let backI = endIndex; backI > i; backI -= 2) {
        if (usedIndices.has(backI)) continue
        const size = file[backI]
        if (size <= times) {
          const n = backI / 2
          addToResult(n, size)
          usedIndices.add(backI)
          times -= size
        }
      }

      if (times > 0) addToResult(0, times)
    }
  }

  return result.reduce((acc, n, i) => acc + n * i, 0)

  function addToResult(n: number, times: number) {
    nTimes(times, () => result.push(n))
  }
}

function nTimes(n: number, cb: (i: number) => void) {
  for (let i = 0; i < n; i++) cb(i)
}

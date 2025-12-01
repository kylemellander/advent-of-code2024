import input from "./input.txt?raw"

export function part1(dataRaw = input) {
  const data = dataRaw.trim()
  let result = ""

  for (let i = 0; i < data.length; i++) {
    if (data[i] === "(") {
      const end = data.indexOf(")", i)
      const [length, times] = data
        .slice(i + 1, end)
        .split("x")
        .map((n) => Number(n))

      const repeat = data.slice(end + 1, end + 1 + length)

      result += repeat.repeat(times)
      i = end + length
      continue
    }

    result += data[i]
  }

  return result.length
}

export function part2(dataRaw = input) {
  const data = dataRaw.trim()
  let count = 0
  let leftToParse = data

  while (leftToParse.includes("(")) {
    const start = leftToParse.indexOf("(")
    const end = leftToParse.indexOf(")", start)
    const [length, times] = leftToParse
      .slice(start + 1, end)
      .split("x")
      .map((n) => Number(n))
    const repeat = leftToParse.slice(end + 1, end + 1 + length)
    count += start
    leftToParse = repeat.repeat(times) + leftToParse.slice(end + 1 + length)
    if (start % 100 === 0)
      console.log(leftToParse.length - start, leftToParse.length)
  }

  return count
}

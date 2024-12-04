import input from "../inputs/3.txt?raw"

export function part1(data = input) {
  const line = data.replace("\n", "")
  return getResult([line])
}

export function part2(data = input) {
  const line = data.replace("\n", "")

  const [firstGoodSection, ...sectionWithDonts] = line.split("don't()")
  const remainderOfSections = sectionWithDonts.reduce((acc, l) => {
    const [_dontsection, ...goodSections] = l.split("do()")
    return [...acc, ...goodSections]
  }, [] as string[])
  const linesWithoutDonts = [firstGoodSection, ...remainderOfSections]

  return getResult(linesWithoutDonts)
}

function getResult(lines: string[]) {
  let result = 0
  lines.forEach((line) => {
    const matches = line.match(/mul\(\d*,\d*\)/g)
    matches?.forEach((match) => {
      const [a, b] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map((n) => parseInt(n))
      result += a * b
    })
  })
  return result
}

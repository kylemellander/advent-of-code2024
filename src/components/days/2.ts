import input from "../inputs/2.txt?raw"

export function part1() {
  const reports = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" ").map((n) => parseInt(n)))
  let valid = 0
  for (const report of reports) {
    valid += isReportValid(report) ? 1 : 0
  }

  return valid
}

export function part2() {
  const reports = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" ").map((n) => parseInt(n)))

  let valid = 0

  for (const report of reports) {
    valid += testReportWithSkip(report) ? 1 : 0
  }
  return valid
}

function isValid({
  report,
  index,
  direction,
}: {
  report: number[]
  index: number
  direction: "up" | "down"
  compIndex?: number
}) {
  if (!report[index + 1]) return true
  if (direction === "up") {
    if (report[index] >= report[index + 1]) return false
    if (report[index + 1] > report[index] + 3) return false
  }
  if (direction === "down") {
    if (report[index] <= report[index + 1]) return false
    if (report[index] > report[index + 1] + 3) return false
  }
  return true
}

function isReportValid(report: number[]) {
  const direction = report[0] > report[report.length - 1] ? "down" : "up"
  for (let i = 0; i < report.length - 1; i++) {
    if (!isValid({ report, index: i, direction })) return false
  }
  return true
}

function testReportWithSkip(report: number[]) {
  if (isReportValid(report)) return true

  for (let i = 0; i < report.length; i++) {
    const newReport = removeAtIndex(report, i)
    if (isReportValid(newReport)) return true
  }
  return false
}

function removeAtIndex<T>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

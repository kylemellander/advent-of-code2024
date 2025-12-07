import input from "./input.txt?raw"

export { Visual } from "./Visual"

export function part1(data: string = input) {
  const lines = data.split("\n").filter(Boolean)
  const width = lines[0].length
  const grid = lines.join("")
  const start = grid.indexOf("S")

  let splits = 0
  let beams = [start]

  while (beams.length > 0) {
    const newBeams: number[] = []
    for (const beam of beams) {
      const nextPotential = grid[beam + width]
      if (nextPotential === "^") {
        const leftBeam = beam + width - 1
        const rightBeam = beam + width + 1
        if (!newBeams.includes(leftBeam)) {
          newBeams.push(leftBeam)
        }
        if (!newBeams.includes(rightBeam)) {
          newBeams.push(rightBeam)
        }
        splits += 1
      } else if (nextPotential === ".") {
        if (!newBeams.includes(beam + width)) {
          newBeams.push(beam + width)
        }
      }
    }
    beams = newBeams
  }

  return splits
}

export function part2(data: string = input) {
  const lines = data.split("\n").filter(Boolean)
  const width = lines[0].length
  const grid: (string | number)[] = lines.join("").split("")
  const start = grid.indexOf("S")
  let beams: number[] = [start]

  while (beams.length > 0) {
    const newBeams: number[] = []
    for (const beam of beams) {
      const nextPotential = grid[beam + width]
      const beamValue = grid[beam] === "S" ? 1 : (grid[beam] as number)
      if (nextPotential === "^") {
        const leftBeam = beam + width - 1
        const rightBeam = beam + width + 1

        const leftBeamValue = grid[leftBeam]
        if (leftBeamValue === ".") {
          grid[leftBeam] = beamValue
        } else if (typeof leftBeamValue === "number") {
          grid[leftBeam] = leftBeamValue + beamValue
        }

        if (newBeams.indexOf(leftBeam) === -1) {
          newBeams.push(leftBeam)
        }
        if (newBeams.indexOf(rightBeam) === -1) {
          newBeams.push(rightBeam)
        }

        const rightBeamValue = grid[rightBeam]
        if (rightBeamValue === ".") {
          grid[rightBeam] = beamValue
        } else if (typeof rightBeamValue === "number") {
          grid[rightBeam] = rightBeamValue + beamValue
        }
      } else if (nextPotential === ".") {
        if (!newBeams.includes(beam + width)) {
          newBeams.push(beam + width)
        }
        grid[beam + width] = beamValue
      } else if (typeof nextPotential === "number") {
        grid[beam + width] = nextPotential + beamValue
        if (!newBeams.includes(beam + width)) {
          newBeams.push(beam + width)
        }
      }
    }

    beams = newBeams
  }

  const lastRowStart = grid.length - width
  const lastRow = grid.slice(lastRowStart)
  return lastRow.reduce((sum, val) => {
    if (typeof val === "number") {
      return ((sum as number) + val) as number
    }
    return sum
  }, 0)
}

import { useEffect, useState } from "react"
import input from "./input.txt?raw"

const lines = input.split("\n").filter(Boolean)
const width = lines[0].length

export function Visual() {
  const [grid, setGrid] = useState<(string | number)[]>(
    lines.join("").split("")
  )
  const start = grid.indexOf("S")
  const [beams, setBeams] = useState([start])

  useEffect(() => {
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
    setTimeout(() => {
      setBeams(newBeams)
      setGrid([...grid])
    }, 0)
  }, [beams.join(",")])

  let currentRow
  for (let i = 1; i < grid.length / width; i++) {
    const rowStart = grid.length - i * width
    const rowEnd = rowStart + width
    const row = grid.slice(rowStart, rowEnd)
    const hasNum = row.some((v) => typeof v === "number")
    if (hasNum) {
      currentRow = row
      break
    }
  }

  const showTotal = !!currentRow

  return (
    <>
      <button
        onClick={() => {
          setGrid(lines.join("").split(""))
          setBeams([start])
        }}
      >
        reset
      </button>
      <div
        style={{
          fontFamily: "monospace",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
          padding: "10px",
          fontSize: "6px",
          lineHeight: 0.6,
          boxSizing: "border-box",
          gap: "20px",
        }}
      >
        {showTotal && currentRow && <Total row={currentRow} />}
        {flatGridtoMapDisplay(grid, width)}
      </div>
    </>
  )
}

function flatGridtoMapDisplay(grid: (string | number)[], width: number) {
  const lines = []
  for (let i = 0; i < grid.length; i += width) {
    const line = grid.slice(i, i + width)

    lines.push(line)
  }
  return (
    <table
      style={{
        fontSize: "clamp(2px, 0.5vw, 12px)",
        borderCollapse: "collapse",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      {lines.map((line, i) => (
        <tr key={i}>
          {line.map((value, j) => (
            <Value key={j} value={value} />
          ))}
        </tr>
      ))}
    </table>
  )
}

function Value({ value }: { value: string | number }) {
  if (typeof value === "number") {
    const numStr = value.toString()
    const fontSize =
      numStr.length > 2 ? `${Math.max(1, 100 - numStr.length * 10)}%` : "100%"
    return (
      <td
        style={{
          color: "white",
          borderRadius: "2px",
          backgroundColor: "green",
          fontSize,
          fontStretch: "condensed",
          textAlign: "center",
        }}
      >
        {value}
      </td>
    )
  }
  if (value === "^") return <td>⭐</td>
  if (value === ".") return <td></td>
  if (value === "S") return <td style={{ fontSize: "24px" }}>🌟</td>
}

function Total({ row }: { row: (string | number)[] }) {
  return (
    <div
      style={{
        position: "relative",
        padding: "30px 40px",
        background:
          "linear-gradient(135deg, #ff4444 25%, #cc0000 25%, #cc0000 50%, #ff4444 50%, #ff4444 75%, #cc0000 75%, #cc0000)",
        backgroundSize: "40px 40px",
        border: "3px solid #8b0000",
        borderRadius: "8px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "15px",
          background:
            "linear-gradient(90deg, gold 0%, gold 48%, transparent 48%, transparent 52%, gold 52%, gold 100%)",
          borderRadius: "4px",
        }}
      />
      🎁 Total Beams:{" "}
      {row.reduce((sum, val) => {
        if (typeof val === "number") {
          return (sum as number) + val
        }
        return sum
      }, 0)}{" "}
      🎁
    </div>
  )
}

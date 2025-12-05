import { useEffect, useState } from "react"
import input from "./input.txt?raw"
import { adjacentCoords } from "./shared"

export function Visual() {
  const lines = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("")) as [string, string][]
  const height = lines.length
  const width = lines[0].length
  const [map, setMap] = useState<[string, string][]>(lines)
  const [done, setDone] = useState(false)

  const [changeCount, setChangeCount] = useState(0)
  const display = map.map((line) => line.join("")).join("\n")
  const [previousDisplay, setPreviousDisplay] = useState(display)

  useEffect(() => {
    if (done) return

    const clone = map.map((line) => [...line]) as [string, string][]

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = clone[y][x]
        if (cell !== "@") continue
        let surroundingCount = 0
        let i = 0
        while (surroundingCount < 4 && i < adjacentCoords.length) {
          const [offsetX, offsetY] = adjacentCoords[i]
          if (clone[y + offsetY]?.[x + offsetX] === "@") {
            surroundingCount++
          }
          i++
        }
        if (surroundingCount < 4) {
          clone[y][x] = "*"
        }
      }
    }

    const currentDisplay = clone.map((line) => line.join("")).join("\n")
    let isSame = true
    for (let i = 0; i < display.length; i++) {
      if (display[i] !== currentDisplay[i]) {
        isSame = false
        break
      }
    }

    setMap(clone)
    if (isSame) {
      setDone(true)
    } else {
      setPreviousDisplay(display)
      setChangeCount((c) => c + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeCount, display])

  if (done) {
    console.log(
      "Done with",
      display.match(/\*/g)?.length ?? 0,
      "rolls removed."
    )
  }
  return (
    <div
      style={{
        border: "1px solid black",
        display: "inline-block",
        padding: "20px",
        width: "915px",
        marginTop: "20px",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "11px",
          lineHeight: "0.75em",
          margin: 0,
        }}
      >
        {display.split("").map((char, i) => {
          const isChanged = char !== previousDisplay[i]
          return (
            <span
              key={i}
              style={{
                color: getColor(char, previousDisplay[i]),
                fontWeight: char === "*" && isChanged ? "bold" : "normal",
              }}
            >
              {char === "*" && !isChanged ? "." : char}
            </span>
          )
        })}
      </p>
    </div>
  )
}

function getColor(char: string, previousChar: string) {
  if (char === previousChar) {
    return COLORS[char] || "black"
  }
  if (char === "*" && previousChar === "@") {
    return "green"
  }
}
const COLORS: Record<string, string> = {
  "@": "grey",
  "*": "grey",
  ".": "white",
}

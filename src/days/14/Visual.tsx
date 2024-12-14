import { useEffect, useState } from "react"
import input from "./input.txt?raw"
import { Robot } from "./types"
import { draw, run } from "./shared"
import { part2 } from "./part2"

const data: string = input
const width: number = 101
const height: number = 103
const robots: Robot[] = data
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const match = line.match(/p=(-?\d+),(-?\d+)\sv=(-?\d+),(-?\d+)/)

    if (!match) {
      throw new Error("Invalid input")
    }
    const vx = parseInt(match[3])
    const vy = parseInt(match[4])

    return {
      position: parseInt(match[1]) + parseInt(match[2]) * width,
      velocity: vx + vy * width,
      vx: vx,
    }
  })

const correct = part2(data)

export function Visual() {
  const [seconds, setSeconds] = useState<number>(correct)
  const [play, setPlay] = useState<boolean>(false)

  const result = draw(run({ seconds, robots, height, width }), {
    onMiss: " ",
    width,
    height,
  })
  useEffect(() => {
    if (play) {
      if (result.includes("11111111")) {
        setPlay(false)
        return
      }
      const id = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 20)

      return () => clearInterval(id)
    }
  }, [play, result])

  return (
    <div
      style={{
        width: "500px",
        fontSize: "8px",
        lineHeight: "5px",
        ...(seconds === correct ? { color: "green" } : {}),
      }}
    >
      <pre>{result}</pre>

      <input
        style={{ width: "100%" }}
        type="range"
        min="0"
        max="10000"
        value={seconds}
        onChange={(e) => setSeconds(parseInt(e.target.value))}
      />
      <input
        style={{ fontSize: "16px" }}
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          if (!play) setSeconds((s) => s + 1)
          setPlay((p) => !p)
        }}
      >
        {play ? "Pause" : "Play"}
      </button>
    </div>
  )
}

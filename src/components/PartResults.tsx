import { useCurrentDay } from "./useCurrentDay"
import * as day1 from "../days/1"
import * as day2 from "../days/2"
import * as day3 from "../days/3"
import * as day4 from "../days/4"
import * as day5 from "../days/5"
import * as day6 from "../days/6"
import * as day7 from "../days/7"
import * as day8 from "../days/8"
import * as day9 from "../days/9"
import * as day10 from "../days/10"
import * as day11 from "../days/11"
import * as day12 from "../days/12"
import * as day13 from "../days/13"
import * as day14 from "../days/14"
import * as day15 from "../days/15"
import * as day16 from "../days/16"
import { useState } from "react"

const map: Record<
  string,
  {
    part1: () => string | number
    part2: () => string | number
    Visual?: () => JSX.Element
  }
> = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
  8: day8,
  9: day9,
  10: day10,
  11: day11,
  12: day12,
  13: day13,
  14: day14,
  15: day15,
  16: day16,
}

export function PartResults({ part }: { part: 1 | 2 }) {
  const partFunction = usePartFunction(part)

  const day = useCurrentDay()

  const [run, setRun] = useState(false)

  if (!partFunction) return <div>Part not implemented yet</div>
  if (!run) return <button onClick={() => setRun(true)}>Run</button>

  if (day && part === 2 && map[day].Visual) {
    const Visual = map[day].Visual as () => JSX.Element
    return (
      <>
        <Results fn={partFunction} />
        <Visual />
      </>
    )
  }
  return <Results fn={partFunction} />
}

function Results({ fn }: { fn: () => string | number }) {
  const { result, length } = benchmarkFunction(fn)

  return (
    <div>
      <b>{result}</b> ({length.toFixed(2)}
      ms)
    </div>
  )
}

function benchmarkFunction(fn: () => string | number) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  return { result, length: end - start }
}

const usePartFunction = (part: 1 | 2) => {
  const day = useCurrentDay()
  if (!day) return
  const data = map[day]

  if (!data) return

  if (part === 1) return data.part1
  return data.part2
}

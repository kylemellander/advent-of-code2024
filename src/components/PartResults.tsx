import { useCurrentDay } from "./useCurrentDay"
import * as day1 from "./days/1"
import * as day2 from "./days/2"
import * as day3 from "./days/3"
import * as day4 from "./days/4"
import * as day5 from "./days/5"
import * as day6 from "./days/6"
import { useState } from "react"

const map = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
}

export function PartResults({ part }: { part: 1 | 2 }) {
  const partFunction = usePartFunction(part)

  const [run, setRun] = useState(false)

  if (!partFunction) return <div>Part not implemented yet</div>
  if (!run) return <button onClick={() => setRun(true)}>Run</button>
  return <Results fn={partFunction} />
}

function Results({ fn }: { fn: () => string | number }) {
  const { result, length } = benchmarkFunction(fn)

  return (
    <div>
      <b>{result}</b> ({length.toFixed(2)}ms)
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
  const data = map[day as keyof typeof map]

  if (!data) return

  if (part === 1) return data.part1
  return data.part2
}

import { useCurrentDay } from "./useCurrentDay"

export function DayTitle() {
  const day = useCurrentDay()
  return <h1>Day {day}</h1>
}

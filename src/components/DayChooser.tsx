import { useCurrentDay } from "./useCurrentDay"

const days = Array.from({ length: 25 }, (_, i) => i + 1)
const style = { padding: "10px" }

export function DayChooser() {
  const currentDay = useCurrentDay()

  return (
    <>
      {days.map((day) => {
        const isSelected = day === currentDay
        if (isSelected)
          return (
            <span style={style} key={day}>
              {day}
            </span>
          )

        return (
          <a key={day} style={style} href={`?day=${day}`}>
            {day}
          </a>
        )
      })}
    </>
  )
}

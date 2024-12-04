import { registry } from "@planningcenter/tapestry-wrap"
import { DayChooser } from "./components/DayChooser"
import { DayWrapper } from "./components/DayWrapper"
import { DayTitle } from "./components/DayTitle"
import { PartResults } from "./components/PartResults"

registry.add("aoc-day-chooser", DayChooser)
registry.add("aoc-day-wrapper", DayWrapper, { children: "node" })
registry.add("aoc-day-title", DayTitle)
registry.add("aoc-day-results", PartResults, { part: "number" })

registry.connect()

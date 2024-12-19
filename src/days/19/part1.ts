import input from "./input.txt?raw"
import { designIterations } from "./shared"

export function part1(data: string = input) {
  const [towelsRaw, designsRaw] = data.trim().split("\n\n")
  const towels = towelsRaw.split(", ")
  const designs = designsRaw.split("\n")

  const buildableDesigns = designs.filter(
    (design) => designIterations(design, towels) > 0
  )
  return buildableDesigns.length
}

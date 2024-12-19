import input from "./input.txt?raw"
import { designIterations } from "./shared"

export function part2(data: string = input) {
  const [towelsRaw, designsRaw] = data.trim().split("\n\n")
  const towels = towelsRaw.split(", ")
  const designs = designsRaw.split("\n")

  const buildableDesignsCount = designs.reduce(
    (sum, design) => sum + designIterations(design, towels),
    0
  )
  return buildableDesignsCount
}

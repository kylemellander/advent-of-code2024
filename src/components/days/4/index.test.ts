import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", () => {
  it("runs part1", () => {
    expect(part1()).toEqual(2496)
  })

  it("runs part2", () => {
    expect(part2()).toEqual(1967)
  })
})

import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(
        part1(`987654321111111
811111111111119
234234234234278
818181911112111`)
      ).toEqual(357)
    })

    it("runs part2", () => {
      expect(
        part2(`987654321111111
811111111111119
234234234234278
818181911112111`)
      ).toEqual(3121910778619)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(16927)
  })

  it("runs part2", () => {
    expect(part2()).toEqual(167384358365132)
  })
})

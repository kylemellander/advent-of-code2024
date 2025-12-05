import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(
        part1(`3-5
10-14
16-20
12-18

1
5
8
11
17
32
`)
      ).toEqual(3)
    })

    it("runs part2", () => {
      expect(
        part2(`3-5
10-14
16-20
12-18

1
5
8
11
17
32
`)
      ).toEqual(14)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(674)
  })

  it("runs part2", () => {
    expect(part2()).toEqual(352509891817881)
  })
})

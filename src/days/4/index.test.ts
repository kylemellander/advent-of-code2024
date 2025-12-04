import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

describe("test", () => {
  describe("example", () => {
    it("runs part1", () => {
      expect(
        part1(`
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`)
      ).toEqual(13)
    })
    it("runs part2", () => {
      expect(
        part2(`
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`)
      ).toEqual(43)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(1416)
  })

  it("runs part2", () => {
    expect(part2()).toEqual(9086)
  })
})

import { part1, part2 } from "."
import { describe, it, expect } from "vitest"

const testInput = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +
`
describe("test", async () => {
  describe("examples", () => {
    it("runs part1 for example", () => {
      expect(part1(testInput)).toEqual(4277556)
    })
    it("runs part2 for example", () => {
      expect(part2(testInput)).toEqual(3263827)
    })
  })

  it("runs part1", () => {
    expect(part1()).toEqual(6635273135233)
  })

  it("runs part2", async () => {
    expect(part2()).toEqual(12542543681221)
  })
})

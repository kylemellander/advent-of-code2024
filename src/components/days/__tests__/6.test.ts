import { part1, part2 } from "../6"
import { describe, it, expect } from "vitest"

const testInput = `....#.....
                   .........#
                   ..........
                   ..#.......
                   .......#..
                   ..........
                   .#..^.....
                   ........#.
                   #.........
                   ......#...
                   `
describe("test", () => {
  it("runs part1 for example", () => {
    expect(part1(testInput)).toEqual(41)
  })
  it("runs part2 for example", () => {
    expect(part2(testInput)).toEqual(6)
  })

  it("runs part1", () => {
    expect(part1()).toEqual(5329)
  })
  it("runs part2", () => {
    expect(part2()).toEqual(2162)
  })
})

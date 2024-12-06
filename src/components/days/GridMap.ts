export type Coord = { x: number; y: number }
export type Direction = "N" | "E" | "S" | "W"

export class GridMap {
  width: number
  height: number
  startingPosition: Coord
  position: Coord
  positionsVisited: Record<string, string[]>
  startingDirection: Direction
  direction: Direction
  movementValidations: ((position: Coord) => boolean)[] = []
  onBlockedCallbacks: ((
    gridMap: GridMap,
    nextPosition: Coord,
    direction: Direction
  ) => void)[] = []
  onOutOfBoundsCallbacks: ((gridMap: GridMap) => void)[] = []
  onRepeatedActionCallbacks: ((gridMap: GridMap) => void)[] = []

  constructor({
    width,
    height,
    startingPosition,
    startingDirection,
  }: {
    width: number
    height: number
    startingPosition: Coord
    startingDirection: Direction
  }) {
    this.width = width
    this.height = height
    this.startingPosition = startingPosition
    this.position = { ...startingPosition }
    this.positionsVisited = {
      [`${startingPosition.x},${startingPosition.y}`]: [startingDirection],
    }
    this.direction = startingDirection
    this.startingDirection = startingDirection
  }

  reset() {
    this.position = { ...this.startingPosition }
    this.direction = this.startingDirection
    this.positionsVisited = {
      [`${this.startingPosition.x},${this.startingPosition.y}`]: [
        this.startingDirection,
      ],
    }
  }

  move() {
    if (this.direction === "N") return this.moveNorth()
    else if (this.direction === "S") return this.moveSouth()
    else if (this.direction === "E") return this.moveEast()
    else if (this.direction === "W") return this.moveWest()
  }

  moveNorth() {
    if (!this.validateMovement({ x: this.position.x, y: this.position.y - 1 }))
      return
    if (this.position.y === 0)
      return this.onOutOfBoundsCallbacks.forEach((cb) => cb(this))

    this.position.y--
    this.positionsVisited[`${this.position.x},${this.position.y}`] ||= []
    this.handleRepeatedAction()
    this.positionsVisited[`${this.position.x},${this.position.y}`].push("N")
  }

  moveSouth() {
    if (!this.validateMovement({ x: this.position.x, y: this.position.y + 1 }))
      return
    if (this.position.y === this.height - 1)
      return this.onOutOfBoundsCallbacks.forEach((cb) => cb(this))

    this.position.y++
    this.positionsVisited[`${this.position.x},${this.position.y}`] ||= []
    this.handleRepeatedAction()
    this.positionsVisited[`${this.position.x},${this.position.y}`].push("S")
  }

  moveEast() {
    if (!this.validateMovement({ x: this.position.x + 1, y: this.position.y }))
      return
    if (this.position.x === this.width - 1)
      return this.onOutOfBoundsCallbacks.forEach((cb) => cb(this))

    this.position.x++
    this.positionsVisited[`${this.position.x},${this.position.y}`] ||= []
    this.handleRepeatedAction()
    this.positionsVisited[`${this.position.x},${this.position.y}`].push("E")
  }

  moveWest() {
    if (!this.validateMovement({ x: this.position.x - 1, y: this.position.y }))
      return
    if (this.position.x === 0)
      return this.onOutOfBoundsCallbacks.forEach((cb) => cb(this))

    this.position.x--
    this.positionsVisited[`${this.position.x},${this.position.y}`] ||= []
    this.handleRepeatedAction()
    this.positionsVisited[`${this.position.x},${this.position.y}`].push("W")
  }

  validateMovement(moveTo: Coord) {
    const canMove = this.movementValidations.every((cb) => cb(moveTo))
    if (!canMove) {
      this.onBlockedCallbacks.forEach((cb) => cb(this, moveTo, this.direction))
    }
    return canMove
  }

  handleRepeatedAction() {
    const currentStep = `${this.position.x},${this.position.y}`
    if (this.positionsVisited[currentStep].includes(this.direction)) {
      this.onRepeatedActionCallbacks.forEach((cb) => cb(this))
      return true
    }
  }
}

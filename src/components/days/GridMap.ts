export type Coord = { x: number; y: number }
export type Direction = "N" | "E" | "S" | "W"

export const OPPPOSITE_DIRECTION = {
  N: "S" as Direction,
  S: "N" as Direction,
  E: "W" as Direction,
  W: "E" as Direction,
}

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

  reset({
    startingPosition,
    startingDirection,
  }: {
    startingPosition: Coord
    startingDirection: Direction
  }) {
    this.position = { ...startingPosition }
    this.direction = startingDirection
    this.positionsVisited = {
      [`${this.startingPosition.x},${this.startingPosition.y}`]: [
        this.startingDirection,
      ],
    }
  }

  move() {
    const direction = this.direction
    const { x, y } = this.position
    let newX = x,
      newY = y

    switch (direction) {
      case "N":
        newY--
        break
      case "S":
        newY++
        break
      case "E":
        newX++
        break
      case "W":
        newX--
        break
    }

    if (!this.validateMovement({ x: newX, y: newY })) return

    if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) {
      return this.onOutOfBoundsCallbacks.forEach((cb) => cb(this))
    }

    this.position = { x: newX, y: newY }
    this.handleRepeatedAction()
    const positionKey = `${newX},${newY}`
    this.positionsVisited[positionKey] ||= []
    this.positionsVisited[positionKey].push(direction)
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
    if (this.positionsVisited[currentStep]?.includes(this.direction)) {
      this.onRepeatedActionCallbacks.forEach((cb) => cb(this))
      return true
    }
  }
}

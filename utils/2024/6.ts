type Map = string[][]

export function parseMap(input: string): Map {
  const map = []
  for (const line of input.split('\n')) {
    map.push(line.split(''))
  }
  return map
}

type Direction = [1, 0] | [-1, 0] | [0, 1] | [0, -1]

interface Position {
  i: number
  j: number
}

function findStartingPos(map: Map): Position {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '^') {
        return ({ i, j })
      }
    }
  }
}

class Person {
  map: Map

  visited: {
    [key: string]: string[]
  }

  pos: Position

  direction: Direction

  looping: boolean

  constructor(start: Position, map: Map) {
    this.map = map
    this.visited = {}
    this.pos = { i: start.i, j: start.j }
    this.direction = [-1, 0]
    this.looping = false
    this.#update()
  }

  walk(): boolean {
    while (true) {
      if (this.looping) {
        return false
      }

      let next = this.#nextPosition()

      while (this.#isObstacle(next)) {
        this.#turnRight()
        next = this.#nextPosition()
      }

      if (this.#isOffMap(next)) {
        return true
      }

      this.#step()
    }
  }

  get locations() {
    return Object.keys(this.visited).map(key => JSON.parse(key))
  }

  #turnRight() {
    this.direction = [this.direction[1], -this.direction[0]] as Direction
  }

  #step() {
    this.pos = this.#nextPosition()
    this.#update()
  }

  #update() {
    const locationKey = JSON.stringify(this.pos)
    const directionKey = JSON.stringify(this.direction)

    if (!this.visited[locationKey]) {
      this.visited[locationKey] = [directionKey]
    } else if (this.visited[locationKey].includes(directionKey)) {
      this.looping = true
    } else {
      this.visited[locationKey].push(directionKey)
    }
  }

  #nextPosition(): Position {
    return ({
      i: this.pos.i + this.direction[0],
      j: this.pos.j + this.direction[1]
    })
  }

  #isOffMap(pos: Position): boolean {
    return pos.i < 0 || pos.i >= this.map.length || pos.j < 0 || pos.j >= this.map[pos.i].length
  }

  #isObstacle(pos: Position): boolean {
    return !this.#isOffMap(pos) && this.map[pos.i][pos.j] === '#'
  }
}

function arePositionsEqual(a: Position, b: Position) {
  return a.i === b.i && a.j === b.j
}

export function part1(input: string): number {
  const map = parseMap(input)
  const start = findStartingPos(map)
  const person = new Person(start, map)
  person.walk()
  return person.locations.length
}

export function part2(input: string): number {
  const map = parseMap(input)
  const start = findStartingPos(map)

  const person = new Person(start, map)
  person.walk()

  let total = 0
  for (const pos of person.locations) {
    if (arePositionsEqual(pos, start)) {
      continue
    }
    const newMap = structuredClone(map)
    newMap[pos.i][pos.j] = '#'
    const newPerson = new Person(start, newMap)
    if (!newPerson.walk()) {
      total += 1
    }
  }
  return total
}

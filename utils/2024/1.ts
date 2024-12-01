type LocationId = number

export function pluckLocationIds(line: string): LocationId[] {
  if (!line) return null

  return line
    .match(/\d+/g)
    ?.map(n => parseInt(n, 10))
}

export function parseLists(input: string): [LocationId[], LocationId[]] {
  if (!input) return null

  const lists: [LocationId[], LocationId[]] = [[], []]
  const lines = input.split('\n')

  for (const line of lines) {
    const [left, right] = pluckLocationIds(line)
    lists[0].push(left)
    lists[1].push(right)
  }

  return lists
}

export function calculateDistanceBetweenLocationIds(a: LocationId, b: LocationId): number {
  if (a === null || b === null) return null

  return Math.abs(a - b)
}

export function calculateTotalDistanceBetweenLists(left: LocationId[], right: LocationId[]): number {
  if (left.length !== right.length) return null

  const sortedLeft = left.sort()
  const sortedRight = right.sort()

  let distance = 0
  for (let i = 0; i < left.length; i++) {
    distance += calculateDistanceBetweenLocationIds(sortedLeft[i], sortedRight[i])
  }
  return distance
}

export function part1(input: string): number {
  const [left, right] = parseLists(input)
  return calculateTotalDistanceBetweenLists(left, right)
}

export function calculateSimilarityScore(left: LocationId[], right: LocationId[]): number {
  let score = 0
  for (const leftId of left) {
    const rightCount = right.filter(rightId => rightId === leftId).length
    score += (leftId * rightCount)
  }
  return score
}

export function part2(input: string): number {
  const [left, right] = parseLists(input)
  return calculateSimilarityScore(left, right)
}

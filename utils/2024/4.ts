type Wordsearch = string[][]

export function parseWordsearch(input: string): Wordsearch {
  if (!input) return

  const wordsearch = []
  for (const line of input.split('\n')) {
    wordsearch.push(line.split(''))
  }
  return wordsearch
}

type Point = [number, number]
type Direction = 'north' | 'north-east' | 'east' | 'south-east' | 'south' | 'south-west' | 'west' | 'north-west'

function getLine(ws: Wordsearch, point: Point, direction: Direction): string {
  const vectors = {
    'north': [-1, 0],
    'north-east': [-1, 1],
    'east': [0, 1],
    'south-east': [1, 1],
    'south': [1, 0],
    'south-west': [1, -1],
    'west': [0, -1],
    'north-west': [-1, -1]
  }

  let line = ''
  const [i, j] = point
  const [di, dj] = vectors[direction]

  for (let t = 0; t < 4; t++) {
    line += ws[i + (t * di)][j + (t * dj)]
  }

  return line
}

function countXmasLinesAtPoint(ws: Wordsearch, point: Point): number {
  const [i, j] = point
  const lines = []
  if (i <= (ws[i].length - 4)) {
    lines.push(getLine(ws, point, 'south'))
  }
  if (i >= 3) {
    lines.push(getLine(ws, point, 'north'))
  }
  if (j <= (ws.length - 4)) {
    lines.push(getLine(ws, point, 'east'))
  }
  if (j >= 3) {
    lines.push(getLine(ws, point, 'west'))
  }
  if ((i <= (ws[i].length - 4)) && (j <= (ws.length - 4))) {
    lines.push(getLine(ws, point, 'south-east'))
  }
  if ((i <= (ws[i].length - 4)) && (j >= 3)) {
    lines.push(getLine(ws, point, 'south-west'))
  }
  if ((i >= 3) && (j <= (ws.length - 4))) {
    lines.push(getLine(ws, point, 'north-east'))
  }
  if ((i >= 3) && (j >= 3)) {
    lines.push(getLine(ws, point, 'north-west'))
  }
  return lines.filter(line => line === 'XMAS').length
}

export function part1(input: string) {
  const wordsearch = parseWordsearch(input)
  let total = 0
  for (let i = 0; i < wordsearch.length; i++) {
    for (let j = 0; j < wordsearch[i].length; j++) {
      total += countXmasLinesAtPoint(wordsearch, [i, j])
    }
  }
  return total
}

function isOnEdge(ws: Wordsearch, point: Point): boolean {
  const [i, j] = point
  return (i === 0 || i === (ws.length - 1) || j === 0 || j === (ws[i].length - 1))
}

function isXmasPoint(ws: Wordsearch, point: Point): boolean {
  const [i, j] = point

  if (ws[i][j] !== 'A') {
    return false
  }

  if (isOnEdge(ws, point)) {
    return false
  }

  const posDiag = [ws[i + 1][j - 1], ws[i - 1][j + 1]]
  const negDiag = [ws[i - 1][j - 1], ws[i + 1][j + 1]]

  const isPosDiagMas = posDiag.includes('M') && posDiag.includes('S')
  const isNegDiagMas = negDiag.includes('M') && negDiag.includes('S')

  return isPosDiagMas && isNegDiagMas
}

export function part2(input: string) {
  const wordsearch = parseWordsearch(input)
  let total = 0
  for (let i = 0; i < wordsearch.length; i++) {
    for (let j = 0; j < wordsearch[i].length; j++) {
      if (isXmasPoint(wordsearch, [i, j])) {
        total += 1
      }
    }
  }
  return total
}

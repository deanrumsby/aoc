type Equation = [number, number[]]
type Operator = (a: number, b: number) => number

function parseInput(input: string): Equation[] {
  const equations = []
  for (const line of input.split('\n')) {
    equations.push(parseLine(line))
  }
  return equations
}

export function parseLine(line: string): Equation {
  const [testValueString, equationString] = line.split(': ')
  return ([Number(testValueString), equationString.split(' ').map(Number)])
}

function calculateAllPossibilities(args: number[], operators: Operator[]): number[] {
  if (args.length === 1) {
    return args
  }
  const last = args[args.length - 1]
  const possibilities = calculateAllPossibilities(args.slice(0, args.length - 1), operators)

  let results = []
  for (const operator of operators) {
    results = [...results, ...possibilities.map(total => operator(total, last))]
  }
  return results
}

export function intoCalculateAllPossibilities(arrayString: string): number[] {
  const args = JSON.parse(arrayString)
  const operators = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b
  ]
  return calculateAllPossibilities(args, operators)
}

function isPossible(equation: Equation, operators: Operator[]): boolean {
  const [testValue, args] = equation
  return calculateAllPossibilities(args, operators).includes(testValue)
}

export function intoIsPossible(line: string): boolean {
  const operators: Operator[] = [
    (a, b) => a + b,
    (a, b) => a * b
  ]
  return isPossible(parseLine(line), operators)
}

function totalCalibrationResult(equations: Equation[], operators: Operator[]): number {
  let total = 0
  for (const equation of equations) {
    if (isPossible(equation, operators)) {
      const testValue = equation[0]
      total += testValue
    }
  }
  return total
}

export function part1(input: string): number {
  const equations = parseInput(input)
  const operators: Operator[] = [
    (a, b) => a + b,
    (a, b) => a * b
  ]
  return totalCalibrationResult(equations, operators)
}

export function part2(input: string): number {
  const equations = parseInput(input)
  const operators: Operator[] = [
    (a, b) => a + b,
    (a, b) => a * b,
    (a, b) => Number(`${a}${b}`)
  ]
  return totalCalibrationResult(equations, operators)
}

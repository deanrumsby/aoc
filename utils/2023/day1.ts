function recoverCalibrationValue(line: string): number {
  const digits = line.match(/\d/g)
  return parseInt(`${digits.at(0)}${digits.at(-1)}`)
}

export function part1(input: string) {
  return input[0]
}

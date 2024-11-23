export function recoverCalibrationValue(line: string): number | null {
  const digits = line.match(/\d/g)

  if (!digits) {
    return null
  }

  return parseInt(`${digits.at(0)}${digits.at(-1)}`)
}

export function sumCalibrationValues(lines: string): number | null {
  let sum = 0
  for (const line of lines.split('\n')) {
    sum += recoverCalibrationValue(line)
  }
  return sum || null
}

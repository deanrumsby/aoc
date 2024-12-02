type Report = number[]

export function parseReport(line: string): Report {
  return line
    .match(/\d+/g)
    ?.map(n => parseInt(n, 10))
}

function isIncreasing(a: number, b: number): boolean {
  return a < b
}

function isDecreasing(a: number, b: number): boolean {
  return a > b
}

function isGradual(a: number, b: number): boolean {
  const distance = Math.abs(a - b)
  return distance >= 1 && distance <= 3
}

function isReportSafe(report: Report): boolean {
  const direction = report[0] <= report[1] ? 'increasing' : 'decreasing'
  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1]
    const current = report[i]

    if (
      !isGradual(prev, current)
      || (direction === 'increasing' && !isIncreasing(prev, current))
      || (direction === 'decreasing' && !isDecreasing(prev, current))
    ) {
      return false
    }
  }
  return true
}

export function lineIntoIsReportSafe(line: string): boolean {
  return isReportSafe(parseReport(line))
}

export function part1(input: string): number {
  return countSafeReports(input, isReportSafe)
}

function dampen(fn: (report: Report) => boolean): (report: Report) => boolean {
  return (report) => {
    if (fn(report)) {
      return true
    }
    for (let i = 0; i < report.length; i++) {
      const dampenedReport = report.toSpliced(i, 1)
      if (fn(dampenedReport)) {
        return true
      }
    }
    return false
  }
}

function isReportSafeWithDampener(report: Report): boolean {
  return dampen(isReportSafe)(report)
}

export function lineIntoIsReportSafeWithDampener(line: string): boolean {
  const report = parseReport(line)
  return isReportSafeWithDampener(report)
}

function countSafeReports(input: string, safetyValidator: (report: Report) => boolean): number {
  let total = 0
  for (const line of input.split('\n')) {
    const report = parseReport(line)
    if (safetyValidator(report)) {
      total += 1
    }
  }
  return total
}

export function part2(input: string): number {
  return countSafeReports(input, dampen(isReportSafe))
}

type MultiplyInstruction = [number, number]

export function parseInstructions(input: string): MultiplyInstruction[] {
  const validInstructions = input.match(/mul\(\d+,\d+\)/g)
  const args = validInstructions.map(inst => inst.match(/\d+/g))
  return args
    .map(([x, y]) => ([parseInt(x), parseInt(y)]))
}

function executeInstruction(instruction: MultiplyInstruction): number {
  const [x, y] = instruction
  return x * y
}

export function part1(input: string): number {
  const instructions = parseInstructions(input)

  let total = 0
  for (const inst of instructions) {
    total += executeInstruction(inst)
  }

  return total
}

interface Instruction {
  type: 'mul' | 'do' | 'don\'t'
  args: number[]
}

export function parseInstructions2(input: string): Instruction[] {
  // eg. ["mul(4,2)", "do()", "don't()"]
  const validInstructions = input.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)

  if (!validInstructions) {
    return
  }

  const results = []
  for (const inst of validInstructions) {
    switch (inst.slice(0, 3)) {
      case 'mul': {
        const args = inst.match(/\d+/g).map(n => parseInt(n, 10))
        results.push({ type: 'mul', args })
        break
      }
      case 'do(': {
        results.push({ type: 'do', args: [] })
        break
      }
      case 'don': {
        results.push({ type: 'don\'t', args: [] })
        break
      }
    }
  }
  return results
}

let isDo = true

function executeInstruction2(instruction: Instruction): number | undefined {
  const { type, args } = instruction
  switch (type) {
    case 'mul': {
      const [x, y] = args
      return x * y
    }
    case 'do': {
      isDo = true
      break
    }
    case 'don\'t': {
      isDo = false
      break
    }
  }
}

export function part2(input: string): number {
  const instructions = parseInstructions2(input)

  if (!instructions) return

  let total = 0
  for (const inst of instructions) {
    const result = executeInstruction2(inst)

    if (result && isDo) {
      total += result
    }
  }

  return total
}

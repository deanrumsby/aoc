interface Rules {
  [page: string]: string[]
}

export function parseRules(rulesString: string): Rules {
  const rules = {}
  for (const line of rulesString.split('\n')) {
    const [left, right] = line.split('|')
    if (!rules[left]) {
      rules[left] = [right]
    } else {
      rules[left].push(right)
    }
  }
  return rules
}

function canAddToQueue(page: string, queue: string[], rules: Rules): boolean {
  for (const queued of queue) {
    if (rules[page]?.includes(queued)) {
      return false
    }
  }
  return true
}

export function intoCanAddToQueue(page: string, queueString: string, rulesString: string): boolean {
  const queue = queueString.split(',')
  const rules = parseRules(rulesString)
  return canAddToQueue(page, queue, rules)
}

function isQueueInOrder(queue: string[], rules: Rules) {
  const temp = []
  for (const page of queue) {
    if (canAddToQueue(page, temp, rules)) {
      temp.push(page)
    } else {
      return false
    }
  }
  return true
}

export function intoIsQueueInOrder(queueString: string, rulesString: string) {
  const queue = queueString.split(',')
  const rules = parseRules(rulesString)
  return isQueueInOrder(queue, rules)
}

function parseQueues(queuesString: string): string[][] {
  return queuesString.split('\n').map(str => str.split(','))
}

function middlePage(queue: string[]): string {
  return queue[Math.floor(queue.length / 2)]
}

export function part1(input: string) {
  const [rulesString, queuesString] = input.split('\n\n')
  const rules = parseRules(rulesString)
  const queues = parseQueues(queuesString)

  let total = 0
  for (const queue of queues) {
    if (isQueueInOrder(queue, rules)) {
      total += parseInt(middlePage(queue), 10)
    }
  }
  return total
}

function findWrongPageIndex(page: string, temp: string[], rules: Rules): number {
  for (let i = 0; i < temp.length; i++) {
    if (rules[page]?.includes(temp[i])) {
      return i
    }
  }
}

function repairQueueOrder(queue: string[], rules: Rules): string[] {
  let attemptedQueue = queue
  while (!isQueueInOrder(attemptedQueue, rules)) {
    const temp = []
    for (let i = 0; i < attemptedQueue.length; i++) {
      const page = attemptedQueue[i]
      if (!canAddToQueue(page, temp, rules)) {
        const badIndex = findWrongPageIndex(attemptedQueue[i], temp, rules)
        const badPage = temp[badIndex]
        attemptedQueue = [...attemptedQueue]
        attemptedQueue[i] = badPage
        attemptedQueue[badIndex] = page
        break
      } else {
        temp.push(page)
      }
    }
  }
  return attemptedQueue
}

export function part2(input: string): number {
  const [rulesString, queuesString] = input.split('\n\n')
  const rules = parseRules(rulesString)
  const queues = parseQueues(queuesString)

  let total = 0
  for (const queue of queues) {
    if (!isQueueInOrder(queue, rules)) {
      const repairedQueue = repairQueueOrder(queue, rules)
      total += parseInt(middlePage(repairedQueue), 10)
    }
  }
  return total
}

export const QUIZ_ENGINE_VERSION = 3

export interface BuildDeckOptions<T> {
  items: readonly T[]
  size?: number
  getKey: (item: T) => string
  /**
   * Items seen very recently are moved behind unseen items before the final cut.
   * This prevents a fresh set from immediately beginning with the same countries.
   */
  recentKeys?: readonly string[]
  /** Injectable for deterministic tests later. */
  random?: () => number
}

export interface MultipleChoiceOption {
  key: string
  label: string
}

export interface MultipleChoiceQuestion<T> {
  id: string
  item: T
  options: MultipleChoiceOption[]
  correctOptionKey: string
  correctOptionIndex: number
}

export interface BuildMultipleChoiceQuizOptions<T> {
  questionItems: readonly T[]
  optionItems?: readonly T[]
  size?: number
  optionCount?: number
  getKey: (item: T) => string
  getLabel: (item: T) => string
  recentKeys?: readonly string[]
  random?: () => number
}

function browserRandom(): number {
  const cryptoApi = globalThis.crypto

  if (cryptoApi?.getRandomValues) {
    const values = new Uint32Array(1)
    cryptoApi.getRandomValues(values)
    return values[0] / 0x100000000
  }

  return Math.random()
}

/** Fisher-Yates shuffle. A copy is returned; the source array is never mutated. */
export function shuffleDeck<T>(items: readonly T[], random: () => number = browserRandom): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

/**
 * Builds a deck without replacement. Every item is unique within the returned set.
 * Recently seen items are still eligible, but they are placed behind fresh items.
 */
export function buildShuffledDeck<T>({
  items,
  size = items.length,
  getKey,
  recentKeys = [],
  random = browserRandom,
}: BuildDeckOptions<T>): T[] {
  const unique = new Map<string, T>()

  for (const item of items) {
    const key = getKey(item)
    if (!unique.has(key)) unique.set(key, item)
  }

  const recent = new Set(recentKeys)
  const freshItems: T[] = []
  const repeatedItems: T[] = []

  for (const item of unique.values()) {
    if (recent.has(getKey(item))) repeatedItems.push(item)
    else freshItems.push(item)
  }

  const deck = [
    ...shuffleDeck(freshItems, random),
    ...shuffleDeck(repeatedItems, random),
  ]

  return deck.slice(0, Math.max(0, Math.min(size, deck.length)))
}

/**
 * Returns a shuffled list of correct-answer positions with an even distribution.
 * For a 10-question / 4-option quiz each position appears either 2 or 3 times.
 */
export function buildBalancedAnswerPositions(
  questionCount: number,
  optionCount: number,
  random: () => number = browserRandom,
): number[] {
  if (questionCount <= 0 || optionCount <= 0) return []

  const positions: number[] = []

  while (positions.length < questionCount) {
    positions.push(...shuffleDeck(Array.from({ length: optionCount }, (_, index) => index), random))
  }

  return positions.slice(0, questionCount)
}

/**
 * Builds a multiple-choice quiz without replacement.
 * Question order is shuffled, distractors are unique, and correct positions are balanced.
 */
export function buildMultipleChoiceQuiz<T>({
  questionItems,
  optionItems = questionItems,
  size = questionItems.length,
  optionCount = 4,
  getKey,
  getLabel,
  recentKeys = [],
  random = browserRandom,
}: BuildMultipleChoiceQuizOptions<T>): MultipleChoiceQuestion<T>[] {
  if (optionCount < 2) throw new Error('A multiple-choice quiz needs at least two options.')

  const questionDeck = buildShuffledDeck({
    items: questionItems,
    size,
    getKey,
    recentKeys,
    random,
  })

  const optionPool = Array.from(new Map(optionItems.map((item) => [getKey(item), item])).values())

  if (optionPool.length < optionCount) {
    throw new Error(`Not enough unique options to build a ${optionCount}-option quiz.`)
  }

  const correctPositions = buildBalancedAnswerPositions(questionDeck.length, optionCount, random)

  return questionDeck.map((item, questionIndex) => {
    const correctKey = getKey(item)
    const distractors = shuffleDeck(
      optionPool.filter((candidate) => getKey(candidate) !== correctKey),
      random,
    ).slice(0, optionCount - 1)

    const options = distractors.map((candidate) => ({
      key: getKey(candidate),
      label: getLabel(candidate),
    }))

    const correctOptionIndex = correctPositions[questionIndex]
    options.splice(correctOptionIndex, 0, {
      key: correctKey,
      label: getLabel(item),
    })

    return {
      id: `${correctKey}-${questionIndex + 1}`,
      item,
      options,
      correctOptionKey: correctKey,
      correctOptionIndex,
    }
  })
}

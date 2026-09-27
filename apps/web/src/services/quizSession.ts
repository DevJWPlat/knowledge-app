export interface StoredQuizAnswer {
  questionNumber: number
  countryCode: string
  countryName: string
  flagCode: string
  correctCountryCode: string
  correctCountryName: string
  selectedCountryCode: string
  selectedCountryName: string
  isCorrect: boolean
  responseTimeMs: number
}

export interface StoredQuizSession {
  id: string
  mode: 'flag-country'
  category: 'geography'
  scope: 'europe'
  questionCount: number
  correctCount: number
  incorrectCount: number
  accuracy: number
  durationMs: number
  startedAt: string
  completedAt: string
  answers: StoredQuizAnswer[]
}

const SESSION_PREFIX = 'knowledge:quiz-session:'
const LATEST_SESSION_KEY = 'knowledge:quiz-session:latest'

function makeId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function createQuizSessionId(): string {
  return makeId()
}

export function saveQuizSession(session: StoredQuizSession): void {
  try {
    sessionStorage.setItem(`${SESSION_PREFIX}${session.id}`, JSON.stringify(session))
    sessionStorage.setItem(LATEST_SESSION_KEY, session.id)
  } catch {
    // The current quiz can still finish if browser storage is unavailable.
  }
}

export function loadQuizSession(id: string): StoredQuizSession | null {
  try {
    const raw = sessionStorage.getItem(`${SESSION_PREFIX}${id}`)
    if (!raw) return null
    return JSON.parse(raw) as StoredQuizSession
  } catch {
    return null
  }
}

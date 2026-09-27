export type CategoryKey = string
export type ItemKey = string
export type SkillKey = string

export interface UserProgress {
  category: CategoryKey
  itemId: ItemKey
  skill: SkillKey
  mastery: number
  correctCount: number
  incorrectCount: number
  streak: number
  lastSeenAt: string | null
}

export interface QuizScope {
  [key: string]: string | number | boolean | string[] | null | undefined
}

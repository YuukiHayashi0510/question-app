import { State } from './const'

export type Form = {
  name: string
  question: string
  problem: string
  lang: string
  lang2: string
  code: string
  code2: string
  reference: string
  expectation: string
  mentor: string
  state: State
  date: Date
}

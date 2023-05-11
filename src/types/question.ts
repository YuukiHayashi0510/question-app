import { State } from './form/const'
import type { StoreQuestion } from '~/lib/Firebase/firestore'

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Question = {
  id?: string
  tmpState?: State
} & StoreQuestion

export type QuestionList = Question[]

export type Sort = {
  state: State | ''
  date: Order | ''
}

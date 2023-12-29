import { Order } from './const'
import { StoreQuestion } from '../../infrastructure/firebase/firestore'
import { State } from '../form/const'

export type Question = {
  id?: string
  tmpState?: State
} & StoreQuestion

export type QuestionList = Question[]

export type Sort = {
  state: State | ''
  date: Order | ''
}

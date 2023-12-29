import { State } from '~/types/pages/form/const'
import { Area, Role } from '~/types/pages/user/const'
import type { Timestamp } from 'firebase/firestore'

/**
 * FirestoreのUser型定義
 */
export type StoreUser = {
  id: string
  name: string
  role: Role
  area: Area
}

/**
 * FirestoreのQuestion型定義
 */
export type StoreQuestion = {
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
  date: Timestamp
}

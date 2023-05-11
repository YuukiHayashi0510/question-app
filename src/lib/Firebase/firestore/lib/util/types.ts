import { State } from '~/types/form/const'
import { Area, Role } from '~/types/user/const'
import type {
  QuerySnapshot,
  DocumentData,
  Timestamp,
  CollectionReference,
  DocumentReference,
  QueryDocumentSnapshot,
} from 'firebase/firestore'

export type Snapshot = QuerySnapshot<DocumentData>
export type Document = QueryDocumentSnapshot<DocumentData>
export type CollectionRef = CollectionReference<DocumentData>
export type DocumentRef = DocumentReference<DocumentData>

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

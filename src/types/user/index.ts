import { Area, Role } from './const'

// firestoreから取得した情報
export type SessionUser = {
  // firestoreのDocID or uid(firestoreに差し込むときはuid)
  id?: string
  name: string
  area?: Area | ''
  role?: Role
}

export type User = {
  mail: string
  password: string
  // authのuid
  uid: string
} & SessionUser

// プロフィール編集時
export type Profile = {
  mail: string
} & SessionUser

export type UserResponse = {
  isError: boolean
  response: any | ErrorEvent | undefined
}

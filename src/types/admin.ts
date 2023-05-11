import { Report } from './report'
import { User } from './user'
import { Area } from './user/const'

export type ModalValue = Omit<User, 'mail' | 'password'>

export type UserContext = ModalValue[]

export type UserReport = {
  area: Area // 地域
  name: string // 名前
  userId: string // auth uid
  report: Report[] // ユーザーの日報全部
}

export type AdminReportContext = UserReport[]

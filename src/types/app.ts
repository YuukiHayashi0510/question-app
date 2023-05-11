import { QuestionList } from '~/types/question'
import { AdminReportContext, UserContext } from './admin'
import { Report } from './report'
import { SessionUser } from './user'
import { ContextType } from './utils'

export enum Locales {
  En = 'en',
  Ja = 'ja',
}

// 質問のグローバルState
type QuestionContextType = {
  list: QuestionList
  maxSize: number
}

// Admin権限のグローバルState
type AdminContextType = {
  user: UserContext
  report: AdminReportContext
}

export type QuestionContext = ContextType<QuestionContextType>

export type AdminContext = ContextType<AdminContextType>

export type SessionUserContext = ContextType<SessionUser>

// Mentor権限の日報のグローバルState
export type ReportContext = ContextType<Report[]>

// 日報で使うタブのContext
export type TabContext = ContextType<number>

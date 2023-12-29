import { Dispatch, SetStateAction } from 'react'
import { QuestionList } from '~/types/pages/question'
import { AdminReportContext, UserContext } from './pages/admin'
import { Report } from './pages/report'
import { SessionUser } from './pages/user'

export type ContextType<T> = {
  context: T
  setContext: Dispatch<SetStateAction<T>>
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

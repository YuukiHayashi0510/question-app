import { useEffect, useMemo, useState } from 'react'
import { useAlert } from 'react-alert'
import { DateEqual } from '~/helpers/date/equal'
import ReportRepository from '~/infrastructure/repository/firebase/reportRepository'
import { useReport } from '~/providers/ReportProvider'
import { useSessionUser } from '~/providers/SessionUserProvider'

import { Report } from '~/types/pages/report'
import { Props } from './Layout'
import { getDocReport } from '../utils'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

export function useProps(): Props {
  const { context: sessionUser } = useSessionUser()
  const { context: report, setContext: setReport } = useReport()

  const [date, setDate] = useState<Props['date']>(new Date())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const alert = useAlert()

  const dailyReport: Props['dailyReport'] = useMemo(
    () => report.filter((rep) => DateEqual.isSameDate(rep.date, date))[0],
    [date, report]
  )
  const weeklyReport: Props['weeklyReport'] = useMemo(
    () => report.filter((rep) => DateEqual.isSameWeek(rep.date, date)),
    [date, report]
  )
  const monthlyReport: Props['monthlyReport'] = useMemo(
    () => report.filter((rep) => DateEqual.isSameMonth(rep.date, date)),
    [date, report]
  )

  useEffect(() => {
    const f = async () => {
      if (
        report.filter((rep) => DateEqual.isSameMonth(rep.date, date)).length > 0
      )
        return
      setIsLoading(true)
      const { isError, response } = await ReportRepository.getReport(
        sessionUser.id as string
      )
      const tmpArray: Report[] = []

      if (isError) {
        setIsLoading(false)
        alert.error(response)
        return
      }

      response.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        tmpArray.push(getDocReport(doc))
      })
      setReport(tmpArray)
      setIsLoading(false)
    }
    f()
  }, [])

  const onChangeDate: Props['onChangeDate'] = async (value) => {
    const sameReport = report.filter((rep) =>
      DateEqual.isSameMonth(rep.date, value)
    )

    if (DateEqual.isSameMonth(value, date) || sameReport.length > 0) {
      setDate(value)
      return
    }

    setIsLoading(true)

    const snapshot = await ReportRepository.getMonthlyReportByDate(
      value,
      sessionUser.id as string
    )

    if (!snapshot) {
      setIsLoading(false)
      setDate(value)
      return
    }

    const tmpArray: Report[] = []
    snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      tmpArray.push(getDocReport(doc))
    })

    setReport([...report, ...tmpArray])
    setDate(value)
    setIsLoading(false)
  }

  return {
    date,
    dailyReport,
    weeklyReport,
    monthlyReport,
    isLoading,
    onChangeDate,
  }
}

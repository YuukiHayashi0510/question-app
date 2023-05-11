import { useEffect, useMemo, useState } from 'react'
import { useReport } from '~/components/provider/ReportProvider'
import { useSessionUser } from '~/components/provider/SessionUserProvider'
import { isSameDate, isSameMonth, isSameWeek } from '~/lib/Date'
import {
  Document,
  getMonthlyReportByDate,
  getReport,
} from '~/lib/Firebase/firestore'
import { Report } from '~/types/report'
import { Props } from './Layout'
import { getDocReport } from '../utils'

export function useProps(): Props {
  const { context: sessionUser } = useSessionUser()
  const { context: report, setContext: setReport } = useReport()

  const [date, setDate] = useState<Props['date']>(new Date())
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dailyReport: Props['dailyReport'] = useMemo(
    () => report.filter((rep) => isSameDate(rep.date, date))[0],
    [date, report]
  )
  const weeklyReport: Props['weeklyReport'] = useMemo(
    () => report.filter((rep) => isSameWeek(rep.date, date)),
    [date, report]
  )
  const monthlyReport: Props['monthlyReport'] = useMemo(
    () => report.filter((rep) => isSameMonth(rep.date, date)),
    [date, report]
  )

  useEffect(() => {
    const f = async () => {
      if (report.filter((rep) => isSameMonth(rep.date, date)).length > 0) return
      setIsLoading(true)
      const { isError, response } = await getReport(sessionUser.id as string)
      const tmpArray: Report[] = []

      if (isError) {
        setIsLoading(false)
        alert(response)
        return
      }

      response.forEach((doc: Document) => {
        tmpArray.push(getDocReport(doc))
      })
      setReport(tmpArray)
      setIsLoading(false)
    }
    f()
  }, [])

  const onChangeDate: Props['onChangeDate'] = async (value) => {
    const sameReport = report.filter((rep) => isSameMonth(rep.date, value))

    if (isSameMonth(value, date) || sameReport.length > 0) {
      setDate(value)
      return
    }

    setIsLoading(true)

    const snapshot = await getMonthlyReportByDate(
      value,
      sessionUser.id as string
    )

    if (!snapshot) {
      setIsLoading(false)
      setDate(value)
      return
    }

    const tmpArray: Report[] = []
    snapshot.forEach((doc: Document) => {
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

import { useState } from 'react'
import { useAdmin } from '~/components/provider/AdminProvider'
import { isSameMonth } from '~/lib/Date'
import { Props } from './Layout'
import { getMonthlyReportByArea } from './utils'

export function useProps(): Props {
  const [area, setArea] = useState<Props['selectProps']['area']>('')
  const [date, setDate] = useState<Props['dateProps']['date']>(new Date())
  const [isLoading, setIsLoading] = useState<Props['isLoading']>(false)
  const [isValid, setIsValid] = useState<Props['isValid']>(true)

  // TODO: レポート表示用の状態をもつ

  const { context: admin, setContext: setAdmin } = useAdmin()

  const onClickDisplay: Props['onClickDisplay'] = async () => {
    if (!area || !isValid) return
    console.log('click')

    setIsLoading(true)
    const areaReport = await getMonthlyReportByArea(area, date, admin.report)
    setAdmin((prev) => ({
      ...prev,
      report: areaReport,
    }))
    setIsLoading(false)
    setIsValid(false)
  }

  const onChangeArea: Props['selectProps']['onChange'] = (value) => {
    setArea(value)
    setIsValid(area !== value)
  }

  const onChangeDate: Props['dateProps']['onChangeDate'] = (value) => {
    setDate(value)
    setIsValid(!isSameMonth(value, date))
  }

  return {
    isLoading,
    isValid,
    report: admin.report,
    selectProps: {
      area,
      onChange: onChangeArea,
    },
    dateProps: {
      date,
      onChangeDate,
    },
    onClickDisplay,
  }
}

import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useReport } from '~/components/provider/ReportProvider'
import { useSessionUser } from '~/components/provider/SessionUserProvider'
import { dateToLocaleString, isSameDate } from '~/lib/Date'
import {
  Document,
  getReportByDate,
  insertReport,
  updateReport,
} from '~/lib/Firebase/firestore'
import { sendReportRemind } from '~/lib/Slack'
import { initReport, Report } from '~/types/report'
import { Props } from './Layout'
import { getDocIdIndex, getDocReport, getReportByAlreadyDate } from '../utils'

export function useProps(): Props {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm<Report>({
    defaultValues: initReport,
    criteriaMode: 'all',
    shouldFocusError: false,
    mode: 'onChange',
  })

  const [isSubmit, setIsSubmit] = useState<Props['isSubmit']>(false)
  const [isUpdate, setIsUpdate] = useState<Props['isUpdate']>(false)
  const [date, setDate] = useState<Date>() // 一時保存用の日付、日付が一致しているか見る
  const { context: sessionUser } = useSessionUser()
  const { context: report, setContext: setReport } = useReport()

  useEffect(() => {
    const f = async () => {
      const watchDate = watch('date')

      // 同じ日の場合スルー
      if (date && isSameDate(date, watchDate)) return

      // 既に取得している、コンテキストにある場合
      const already = report.filter((rep) => isSameDate(rep.date, watchDate))
      if (already.length > 0) {
        setFormReport(already[0])
        return
      }

      const snapshot = await getReportByDate(
        watchDate,
        sessionUser['id'] as string
      )

      // データがない場合
      if (!snapshot || snapshot.size === 0) {
        setFormReport(initReport)
        return
      }

      snapshot.forEach((doc: Document) => {
        const docData = doc.data()
        setDate(docData.date.toDate())
        setFormReport(docData as Report)
        const r = getDocReport(doc)
        setReport((prev) => [...prev, r])
      })
    }
    f()
  }, [watch('date')])

  const onSubmit = async () => {
    if (!isValid) return
    setIsSubmit(true)

    const values = getValues()
    const valueDate = values['date']
    values['userId'] = sessionUser['id'] as string

    const index = getDocIdIndex(valueDate, report)
    if (!isUpdate && getReportByAlreadyDate(valueDate, report)) {
      alert(t('Alert.Report.alreadyWrite'))
      setIsSubmit(false)
      return
    }

    const str = dateToLocaleString(valueDate, false)
    // index === 0の場合に 0はfalsy判定になるため、undefinedにしている
    if (isUpdate && index !== undefined) {
      values.docId = report[index].docId
      await updateReport(report[index].docId as string, values)
      setReport((prev) =>
        prev.map((v) => (isSameDate(v.date, valueDate) ? values : v))
      )
      sendReportRemind(sessionUser.name, watch('date'), true)
      alert(`${str}分の日報を更新しました！`)
    } else if (!isUpdate) {
      const tmp = await getReportByDate(valueDate, sessionUser['id'] as string)
      if (!tmp || tmp.size === 0) {
        const id = await insertReport(values)
        if (id) {
          setReport((prev) => [...prev, { ...values, docId: id }])
          sendReportRemind(sessionUser.name, watch('date'))
          alert(`${str}の日報を記入しました！`)
        }
      } else alert(t('Alert.Report.alreadyWrite'))
    } else if (isUpdate) alert('日報がないため、更新はできません')

    setIsSubmit(false)
  }

  const setFormReport = (data: Report) => {
    setValue('con', data.con)
    setValue('mtg', data.mtg)
  }

  return {
    control,
    date: watch('date'),
    isSubmit,
    isUpdate,
    onChangeSelect: (value) => setIsUpdate(value === 'update' ? true : false),
    onSubmit,
    errors,
    handleSubmit,
  }
}

import { isSameDate } from '~/lib/Date'
import { filterByKeys } from '~/lib/Object'
import type { Document } from '~/lib/Firebase/firestore'
import type { Report } from '~/types/report'

// DocDataからReportに変更して取得
export function getDocReport(doc: Document): Report {
  const data = doc.data()
  const report = filterByKeys(data, ['date']) as Report
  report.docId = doc.id
  report.date = data['date'].toDate()
  return report
}

export function getReportByAlreadyDate(date: Date, array: Report[]): Report {
  const [report] = array.filter((v) => isSameDate(date, v.date))
  return report
}

export function getDocIdIndex(date: Date, array: Report[]): number | undefined {
  for (let i = 0; i < array.length; i++)
    if (isSameDate(date, array[i].date)) return i
}

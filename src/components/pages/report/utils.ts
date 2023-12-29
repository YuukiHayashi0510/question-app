import { DateEqual } from '~/helpers/date/equal'
import filterByKeys from '~/helpers/object'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

import type { Report } from '~/types/pages/report'

// DocDataからReportに変更して取得
export function getDocReport(doc: QueryDocumentSnapshot<DocumentData>): Report {
  const data = doc.data()
  const report = filterByKeys(data, ['date']) as Report
  report.docId = doc.id
  report.date = data['date'].toDate()
  return report
}

export function getReportByAlreadyDate(date: Date, array: Report[]): Report {
  const [report] = array.filter((v) => DateEqual.isSameDate(date, v.date))
  return report
}

export function getDocIdIndex(date: Date, array: Report[]): number | undefined {
  for (let i = 0; i < array.length; i++)
    if (DateEqual.isSameDate(date, array[i].date)) return i
}

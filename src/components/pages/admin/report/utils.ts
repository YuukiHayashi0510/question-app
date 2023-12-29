import { DateEqual } from '~/helpers/date/equal'
import filterByKeys from '~/helpers/object'
import ReportRepository from '~/infrastructure/repository/firebase/reportRepository'
import UserRepository from '~/infrastructure/repository/firebase/userRepository'
import { StoreUser } from '~/types/infrastructure/firebase/firestore'
import { Area } from '~/types/pages/user/const'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import type { UserReport } from '~/types/pages/admin'
import type { Report } from '~/types/pages/report'

// DocDataからReportに変更して取得
export function getDocReport(doc: QueryDocumentSnapshot<DocumentData>): Report {
  const data = doc.data()
  const report = filterByKeys(data, ['date']) as Report
  report.docId = doc.id
  report.date = data['date'].toDate()
  return report
}

// 地域からレポートを取得する
export async function getMonthlyReportByArea(
  area: Area,
  date: Date,
  userReport: UserReport[]
) {
  let userReportList = userReport
  const userSnapshot = await UserRepository.getUsersByArea(area)
  userSnapshot.forEach(async (doc) => {
    const data = doc.data() as StoreUser
    const reportSnapshot = await ReportRepository.getMonthlyReportByDate(
      date,
      data.id
    )
    const reportList: Report[] = []
    reportSnapshot.forEach((doc) => {
      const report = getDocReport(doc)
      reportList.push(report)
    })

    const userReport = userReportList.filter(
      (value) => value.userId === data.id
    )
    if (userReport.length === 0)
      userReportList.push({
        area,
        userId: data.id,
        name: data.name,
        report: reportList,
      })
    else {
      if (
        userReport[0].report.filter(
          (value) => !DateEqual.isSameMonth(value.date, date)
        ).length === 0
      )
        userReportList = userReportList.map((value) => {
          if (value.userId === data.id) {
            value.report = reportList
          }
          return value
        })
    }
  })

  return userReportList
}

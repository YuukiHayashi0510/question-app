import { faker } from '@faker-js/faker'
import ReportRepository from '~/infrastructure/repository/firebase/reportRepository'
import { initReport } from '~/types/pages/report/const'
import { MonthUtil } from './date/month'

// Seed作成用, 基本的に実行の必要はない
// FakerでReportを1つだけ作成
function makeFakeReport(date: Date) {
  const report = initReport
  report.userId = '724mtvSz2V9Jsvst9YTcPJWvMj2e'

  report.con = {
    support: {
      time: String(Number(faker.random.numeric(1)) / 10),
      memo: faker.lorem.sentence(),
    },
    event: {
      time: String(Number(faker.random.numeric(1)) / 10),
      memo: faker.lorem.sentence(),
    },
    zemi: {
      time: String(Number(faker.random.numeric(1)) / 10),
      memo: faker.lorem.sentence(),
    },
    study: {
      time: String(Number(faker.random.numeric(1)) / 10),
      memo: faker.lorem.sentence(),
    },
    room: {
      time: String(Number(faker.random.numeric(1)) / 10),
      memo: faker.lorem.sentence(),
    },
    other: {
      time: String(Number(faker.random.numeric(1)) / 10),
      memo: faker.lorem.sentence(),
    },
  }

  report.mtg = {
    time: String(Number(faker.random.numeric(1)) / 10),
    memo: faker.lorem.sentence(),
  }
  report.date = date

  return report
}

// firestoreに挿入
export async function insertFakeReport() {
  const first = MonthUtil.getMonthFirstDate()
  const final = MonthUtil.getMonthFinalDate()
  const gap = final.getDate() - first.getDate() + 1

  for (let index = 0; index < gap; index++) {
    const date = new Date(first.getFullYear(), first.getMonth(), index + 1)
    const report = makeFakeReport(date)
    await ReportRepository.insertReport(report)
  }
}

import { Report } from '~/types/pages/report'

export function getEachTime(report: Report) {
  const con = Object.keys(report.con)
    .map((v) => Number(report.con[v].time))
    .reduce((sum, elm) => {
      return sum + elm
    }, 0)
  const mtg = Number(report.mtg.time)

  return { con, mtg }
}

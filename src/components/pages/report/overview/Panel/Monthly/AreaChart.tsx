import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { getColorByIndex } from '~/helpers/chart'
import { DateEqual } from '~/helpers/date/equal'
import { DateLocale } from '~/helpers/date/locale'
import { Report } from '~/types/pages/report'
import { Data, options } from './chart/util'
import { getEachTime } from '../common/chart'
import { setData } from '../Weekly/chart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

type Props = {
  month: { first: Date; last: Date }
  report: Report[]
}

function AreaChart({ month, report }: Props) {
  const labels: string[] = []
  const datasets: Data[] = [
    {
      fill: true,
      label: 'Con',
      data: [],
      borderColor: getColorByIndex(1),
      backgroundColor: getColorByIndex(1),
    },
    {
      fill: true,
      label: 'MTG',
      data: [],
      borderColor: getColorByIndex(3),
      backgroundColor: getColorByIndex(3),
    },
    {
      fill: true,
      label: 'Total',
      data: [],
      borderColor: getColorByIndex(4),
      backgroundColor: getColorByIndex(4),
    },
  ]

  const gap = month.last.getDate() - month.first.getDate() + 1
  for (let i = 0; i < gap; i++) {
    const date = new Date(
      month.first.getFullYear(),
      month.first.getMonth(),
      month.first.getDate() + i
    )
    labels.push(DateLocale.translateShortJapanese(date))

    const reportList = report.filter((r) => DateEqual.isSameDate(r.date, date))
    if (reportList.length === 0) {
      setData(datasets)
      continue
    }
    const { con, mtg } = getEachTime(reportList[0])

    setData(datasets, con, mtg)
  }

  const data = {
    labels,
    datasets,
  }
  return <Line data={data} options={options} />
}

export default AreaChart

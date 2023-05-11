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
import { getColorByIndex } from '~/lib/Chart'
import { dateToLocaleString, isSameDate } from '~/lib/Date'
import { Report } from '~/types/report'
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
      borderColor: getColorByIndex(0),
      backgroundColor: getColorByIndex(0),
    },
    {
      fill: true,
      label: 'MTG',
      data: [],
      borderColor: getColorByIndex(1),
      backgroundColor: getColorByIndex(1),
    },
    {
      fill: true,
      label: 'Total',
      data: [],
      borderColor: getColorByIndex(2),
      backgroundColor: getColorByIndex(2),
    },
  ]

  const gap = month.last.getDate() - month.first.getDate() + 1
  for (let i = 0; i < gap; i++) {
    const date = new Date(
      month.first.getFullYear(),
      month.first.getMonth(),
      month.first.getDate() + i
    )
    labels.push(dateToLocaleString(date, false))

    const reportList = report.filter((r) => isSameDate(r.date, date))
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

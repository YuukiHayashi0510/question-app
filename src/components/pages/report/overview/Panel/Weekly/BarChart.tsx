import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { getColorByIndex } from '~/helpers/chart'
import { DateEqual } from '~/helpers/date/equal'
import { DateLocale } from '~/helpers/date/locale'
import { Report } from '~/types/pages/report'
import { setData } from './chart'
import { Data, options } from './chart/util'
import { getEachTime } from '../common/chart'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  monday: Date
  report: Report[]
}

function BarChart({ monday, report }: Props) {
  const labels: string[] = []
  const datasets: Data[] = [
    {
      label: 'Con',
      data: [],
      borderColor: getColorByIndex(1),
      backgroundColor: getColorByIndex(1),
    },
    {
      label: 'MTG',
      data: [],
      borderColor: getColorByIndex(3),
      backgroundColor: getColorByIndex(3),
    },
    {
      label: 'Total',
      data: [],
      borderColor: getColorByIndex(4),
      backgroundColor: getColorByIndex(4),
    },
  ]

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + i
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

  return <Bar data={data} options={options} />
}

export default BarChart

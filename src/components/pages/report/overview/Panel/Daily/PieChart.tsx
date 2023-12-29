import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { getColorByIndex } from '~/helpers/chart'
import { Report } from '~/types/pages/report'

ChartJS.register(ArcElement, Tooltip, Legend)
const labels = ['Con', 'MTG']

type Props = {
  report: Report
}

function PieChart({ report }: Props) {
  const con = Object.keys(report.con)
    .map((v) => Number(report.con[v].time))
    .reduce((sum, elm) => {
      return sum + elm
    }, 0)

  const data = {
    labels: labels,
    datasets: [
      {
        label: '所要時間',
        data: [con, report.mtg.time],
        backgroundColor: labels.map((_, i) => getColorByIndex(i)),
        borderColor: labels.map((_, i) => getColorByIndex(i)),
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} />
}

export default PieChart

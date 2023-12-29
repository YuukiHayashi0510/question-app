import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { getColorByIndex } from '~/helpers/chart'
import { Report } from '~/types/pages/report'

ChartJS.register(ArcElement, Tooltip, Legend)
const labels = ['Con', 'MTG']
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '所要時間の割合',
    },
  },
}

type Props = {
  report: Report[]
}

function PieChart({ report }: Props) {
  let con = 0
  let mtg = 0
  report.map((rep) => {
    con += Object.keys(rep.con)
      .map((v) => Number(rep.con[v].time))
      .reduce((sum, elm) => {
        return sum + elm
      }, 0)
    mtg += Number(rep.mtg.time)
  })

  const data = {
    labels: labels,
    datasets: [
      {
        label: '所要時間',
        data: [con, mtg],
        backgroundColor: labels.map((_, i) => getColorByIndex(i)),
        borderColor: labels.map((_, i) => getColorByIndex(i)),
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} options={options} />
}

export default PieChart

export type Data = {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '所要時間',
    },
  },
  scales: {
    y: {
      min: 0,
      max: 24,
    },
  },
}

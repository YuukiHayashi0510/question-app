import { Data } from './util'

export function setData(datasets: Data[], con = 0, mtg = 0) {
  datasets[0].data.push(con)
  datasets[1].data.push(mtg)
  datasets[2].data.push( con + mtg)
}

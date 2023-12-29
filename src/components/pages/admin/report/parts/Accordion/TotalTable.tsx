import React from 'react'
import BorderTable from '~/components/base/BorderTable'
import { Tr, Td, Th } from '~/components/base/BorderTable/component'
import { Report } from '~/types/pages/report'

type Props = {
  report: Report[]
}

function TotalTable({ report }: Props) {
  const total = { con: 0, mtg: 0, sum: 0 }
  report.map((rep) => {
    total.con += Object.keys(rep.con)
      .map((v) => Number(rep.con[v].time))
      .reduce((sum, elm) => {
        return sum + elm
      }, 0)
    total.mtg += Number(rep.mtg.time)
  })
  total.sum = total.con + total.mtg
  return (
    <BorderTable>
      <thead>
        <Tr>
          <Th></Th>
          <Th>Con</Th>
          <Th>MTG</Th>
          <Th>総計</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>合計</Td>
          <Td>{total.con}h</Td>
          <Td>{total.mtg}h</Td>
          <Td>{total.sum}h</Td>
        </Tr>
      </tbody>
    </BorderTable>
  )
}

export default TotalTable

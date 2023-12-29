import React from 'react'
import BorderTable from '~/components/base/BorderTable'
import { Td, Th, Tr } from '~/components/base/BorderTable/component'
import { Report } from '~/types/pages/report'

type Props = {
  report: Report[]
}

export type SectionType = Report['con']

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
    <BorderTable className='w-4/5'>
      <thead>
        <Tr>
          <Th className='w-1/2'>項目</Th>
          <Th>合計</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Con</Td>
          <Td>{total.con.toFixed(1)}h</Td>
        </Tr>
        <Tr>
          <Td>MTG</Td>
          <Td>{total.mtg.toFixed(1)}h</Td>
        </Tr>
        <Tr>
          <Td>全領域</Td>
          <Td>{total.sum.toFixed(1)}h</Td>
        </Tr>
      </tbody>
    </BorderTable>
  )
}

export default TotalTable

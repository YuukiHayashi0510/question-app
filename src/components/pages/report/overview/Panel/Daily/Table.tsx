import InfoIcon from '@mui/icons-material/Info'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BorderTable from '~/components/base/BorderTable'
import { Td, Th, Tr } from '~/components/base/BorderTable/component'
import { Report } from '~/types/pages/report'
import DetailModal from './DetailModal'

type Props = {
  section: Report['con']
  label: string
}

function DailyTable({ section, label }: Props) {
  const total = Object.keys(section)
    .map((v) => Number(section[v].time))
    .reduce((sum, elm) => {
      return sum + elm
    }, 0)

  const [t] = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='my-4'>
      <DetailModal
        isOpen={isOpen}
        label={label}
        section={section}
        setIsOpen={setIsOpen}
      />
      <span className='my-2 flex items-center gap-2'>
        <p className='text-lg font-semibold'>{label}</p>
        <IconButton onClick={() => setIsOpen(true)}>
          <InfoIcon fontSize='small' />
        </IconButton>
      </span>
      <BorderTable className='w-full'>
        <thead>
          <tr>
            <Th className='w-2/3'>項目</Th>
            <Th className='w-1/3'>所要時間</Th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(section).map((v, i) => {
            return (
              <Tr key={i}>
                <Td>{t(`Report.${label.toLowerCase()}.${v}`)}</Td>
                <Td>{section[v].time}h</Td>
              </Tr>
            )
          })}
          <Tr>
            <Td>合計</Td>
            <Td>{total.toFixed(2)}h</Td>
          </Tr>
        </tbody>
      </BorderTable>
    </div>
  )
}

export default DailyTable

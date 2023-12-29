import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import BorderTable from '~/components/base/BorderTable'
import { Tr, Th, Td } from '~/components/base/BorderTable/component'
import ModalTemplate from '~/components/base/Modal'
import { Report } from '~/types/pages/report'

type Props = {
  isOpen: boolean
  label: string
  section: Report['con']
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function DetailModal({ isOpen, label, section, setIsOpen }: Props) {
  const [t] = useTranslation()
  return (
    <ModalTemplate isOpen={isOpen} onClose={() => setIsOpen(false)} width={650}>
      <div className='my-4 text-center'>
        <p className='mb-6 text-center text-2xl font-semibold'>{label} 詳細</p>
        <BorderTable>
          <thead>
            <Tr>
              <Th className='desktop:w-1/4'>項目名</Th>
              <Th className='desktop:w-1/4'>所要時間</Th>
              <Th className='w-40 desktop:w-2/4'>メモ</Th>
            </Tr>
          </thead>
          <tbody>
            {Object.keys(section).map((v, i) => {
              return (
                <Tr key={i}>
                  <Td>{t(`Report.${label.toLowerCase()}.${v}`)}</Td>
                  <Td>{section[v].time}h</Td>
                  <Td>{section[v]['memo']}</Td>
                </Tr>
              )
            })}
          </tbody>
        </BorderTable>

        <Button
          className='mt-6'
          onClick={() => setIsOpen(false)}
          variant='outlined'
        >
          閉じる
        </Button>
      </div>
    </ModalTemplate>
  )
}

export default DetailModal

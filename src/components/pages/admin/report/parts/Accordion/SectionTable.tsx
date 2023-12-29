import React from 'react'
import { useTranslation } from 'react-i18next'
import BorderTable from '~/components/base/BorderTable'
import { Tr, Th, Td } from '~/components/base/BorderTable/component'
import { Report } from '~/types/pages/report'

type Section = Report['con']

type Props = {
  name: 'Con'
  section: Section[]
}

function SectionTable({ name, section }: Props) {
  const [t] = useTranslation()

  return (
    <BorderTable className='w-2/5 desktop:w-1/3'>
      <thead>
        <Tr>
          <Th colSpan={2}>{name}</Th>
        </Tr>
      </thead>
      <tbody>
        {Object.keys(section).map((v, i) => {
          return (
            <Tr key={i}>
              <Td className='w-2/3'>
                {t(`Report.${name.toLowerCase()}.${v}`)}
              </Td>
              <Td>{section[v].time}h</Td>
            </Tr>
          )
        })}
      </tbody>
    </BorderTable>
  )
}

export default SectionTable

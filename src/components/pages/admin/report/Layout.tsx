import React from 'react'
import LoadingButton from '~/components/base/Button/LoadingButton'
import RoleGuard from '~/guards/RoleGuard'
import { Role } from '~/types/pages/user/const'
import DataAccordion from './parts/Accordion/DataAccordion'
import AreaSelect, { Props as SelectProps } from './parts/AreaSelect'
import DateField, { Props as DateProps } from './parts/DateField'
import type { UserReport } from '~/types/pages/admin'

export type Props = {
  isLoading: boolean
  isValid: boolean
  report: UserReport[]
  selectProps: SelectProps
  dateProps: DateProps
  onClickDisplay: () => void
}

function Layout({
  isLoading,
  isValid,
  report,
  selectProps,
  dateProps,
  onClickDisplay,
}: Props) {
  return (
    <RoleGuard role={Role.Admin}>
      <div className='my-10 w-1/2'>
        <div className='flex w-3/4 items-center gap-4'>
          <DateField {...dateProps} />
          <AreaSelect {...selectProps} />
          <LoadingButton
            disabled={!isValid}
            isLoading={isLoading}
            onClick={onClickDisplay}
            variant='outlined'
          >
            表示
          </LoadingButton>
        </div>
        {/* 表示用 */}
        <div className='my-4 flex flex-col gap-4'>
          {report.map((rep, i) => {
            return <DataAccordion key={i} name={rep.name} report={rep.report} />
          })}
        </div>
      </div>
    </RoleGuard>
  )
}

export default Layout

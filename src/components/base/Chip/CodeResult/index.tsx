import { Chip } from '@mui/material'
import React from 'react'
import { TestResult } from '~/types/pages/code'
import { getChipColor } from './utils'

type Props = {
  label: TestResult
}

function CodeResultChip({ label }: Props) {
  const color = getChipColor(label)

  return (
    <div className='my-2'>
      <Chip className='w-min text-sm' color={color} label={label} />
    </div>
  )
}

export default CodeResultChip

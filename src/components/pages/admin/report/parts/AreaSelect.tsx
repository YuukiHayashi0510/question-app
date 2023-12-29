import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'
import { AllArea, Area } from '~/types/pages/user/const'

export type Props = {
  area: Area | ''
  onChange: (value: Area) => void
}

function AreaSelect({ area, onChange }: Props) {
  return (
    <FormControl className='max-w-[10rem]' fullWidth>
      <InputLabel id='select-label'>地域</InputLabel>
      <Select
        id='select'
        label='地域'
        labelId='select-label'
        onChange={(e) => onChange(e.target.value as Area)}
        value={area}
      >
        {AllArea.map((area) => (
          <MenuItem key={area} value={area}>
            {area}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AreaSelect

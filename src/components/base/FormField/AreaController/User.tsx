import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User } from '~/types/pages/user'
import { AllArea } from '~/types/pages/user/const'
import { getEngLabel } from './util'

type Props = {
  control: Control<User>
}

function AreaController({ control }: Props) {
  const [t, i18n] = useTranslation()
  return (
    <>
      <Controller
        control={control}
        name='area'
        render={({ field, formState: { errors } }) => (
          <FormControl error={!!errors.area} fullWidth required>
            <InputLabel id='select-label'>{t('User.area')}</InputLabel>
            <Select
              id='select'
              label={t('User.area')}
              labelId='select-label'
              {...field}
            >
              {AllArea.map((area) => (
                <MenuItem key={area} value={area}>
                  {getEngLabel(i18n.language, area) ?? area}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.area?.message || ''}</FormHelperText>
          </FormControl>
        )}
        rules={{ required: true }}
      />
    </>
  )
}

export default AreaController

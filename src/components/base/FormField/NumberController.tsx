import { ErrorMessage } from '@hookform/error-message'
import { Alert, InputAdornment, TextField } from '@mui/material'
import { SyntheticEvent } from 'react'
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form'

type Props = {
  control: Control<any>
  name: string
  label: string
  required?: boolean
  errors: Partial<FieldErrorsImpl<any>>
}

function NumberController(props: Props) {
  return (
    <div className='relative'>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <TextField
            InputProps={{
              endAdornment: <InputAdornment position='end'>h</InputAdornment>,
            }}
            className='my-4 w-full'
            label={props.label}
            onFocus={(e: SyntheticEvent) => {
              e.target.addEventListener('wheel', (e) => {
                e.preventDefault()
              })
            }}
            required={props.required}
            type='number'
            {...field}
          />
        )}
        rules={{
          min: { value: 0, message: '0以上の数値を入力してください' },
          max: { value: 24, message: '24以下の数値を入力してください' },
        }}
      />
      <ErrorMessage
        as={<Alert severity='error' />}
        className='absolute left-36 w-[20vw]'
        errors={props.errors}
        name={props.name}
      />
    </div>
  )
}

export default NumberController

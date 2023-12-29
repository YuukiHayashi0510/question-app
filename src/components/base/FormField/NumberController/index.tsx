import { InputAdornment, TextField } from '@mui/material'
import { SyntheticEvent } from 'react'
import { Control, Controller } from 'react-hook-form'

type Props = {
  control: Control<any>
  name: string
  label: string
  required?: boolean
}

function NumberController(props: Props) {
  return (
    <div className='relative'>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field, formState: { errors } }) => (
          <TextField
            InputProps={{
              endAdornment: <InputAdornment position='end'>h</InputAdornment>,
            }}
            className='my-4 w-full'
            error={!!errors[props.name]}
            helperText={errors[props.name]?.message as string}
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
    </div>
  )
}

export default NumberController

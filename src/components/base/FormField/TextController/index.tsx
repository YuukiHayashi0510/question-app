import { TextField } from '@mui/material'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type Props = {
  control: Control<any>
  rules?: RegisterOptions
  name: string
  label: string
  multiline?: boolean
  required?: boolean
}

function TextController(props: Props) {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field, formState: { errors } }) => (
          <TextField
            className='my-4 w-full'
            error={!!errors[props.name]}
            helperText={errors[props.name]?.message as string}
            label={props.label}
            multiline={props.multiline}
            required={props.required}
            {...field}
          />
        )}
        rules={props.rules}
      />
    </>
  )
}

export default TextController

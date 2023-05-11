import { TextField } from '@mui/material'
import {
  Control,
  Controller,
  FieldErrorsImpl,
  RegisterOptions,
} from 'react-hook-form'

type Props = {
  control: Control<any>
  rules?: RegisterOptions
  name: string
  label: string
  multiline?: boolean
  required?: boolean
  errors: Partial<FieldErrorsImpl<any>>
}

function TextController(props: Props) {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <TextField
            className='my-4 w-full'
            error={props.errors[props.name] ? true : false}
            helperText={props.errors[props.name]?.message as string}
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

import { ErrorMessage } from '@hookform/error-message'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import {
  Control,
  Controller,
  FieldErrorsImpl,
  RegisterOptions,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  control: Control<any>
  rules?: RegisterOptions
  name: string
  errors: Partial<FieldErrorsImpl<any>>
}

function PasswordController(props: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [t] = useTranslation()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <FormControl className='my-4' fullWidth required variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password' required>
              {t('User.password')}
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              {...field}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        )}
        rules={props.rules}
      />
      <ErrorMessage
        as={<Alert severity='error' />}
        errors={props.errors}
        name={props.name}
      />
    </>
  )
}

export default PasswordController

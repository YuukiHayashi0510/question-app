import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  control: Control<any>
  rules?: RegisterOptions
  name: string
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
        render={({ field, formState: { errors } }) => (
          <FormControl
            className='my-4'
            error={!!errors[props.name]}
            fullWidth
            required
            variant='outlined'
          >
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
            <FormHelperText>
              {(errors[props.name]?.message as string) || ''}
            </FormHelperText>
          </FormControl>
        )}
        rules={props.rules}
      />
    </>
  )
}

export default PasswordController

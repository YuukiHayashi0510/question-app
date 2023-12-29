import { Typography } from '@mui/material'
import { Control, FieldErrorsImpl } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import isEmail from 'validator/lib/isEmail'
import AreaController from '~/components/base/FormField/AreaController/User'
import PasswordController from '~/components/base/FormField/PasswordController'
import TextController from '~/components/base/FormField/TextController'
import { User } from '~/types/pages/user'

export type FormProps = {
  isRegister: boolean
  control: Control<User>
  errors: Partial<FieldErrorsImpl<User>>
}

function Form(props: FormProps) {
  const [t] = useTranslation()

  return (
    <>
      <Typography className='my-12 text-center' component='h5' variant='h5'>
        {props.isRegister ? t('Register.signup') : t('Register.login')}
      </Typography>
      {props.isRegister ? (
        <>
          <TextController
            control={props.control}
            label={t('User.name')}
            name='name'
            required
            rules={{
              required: t('Alert.required.name') as string,
              minLength: {
                value: 2,
                message: `2${t('Alert.valid.minLength')}`,
              },
            }}
          />
          <AreaController control={props.control} />
        </>
      ) : null}
      <TextController
        control={props.control}
        label={t('User.mail')}
        name='mail'
        required
        rules={{
          required: t('Alert.required.mail') as string,
          validate: (value) =>
            isEmail(value) || (t('Alert.valid.pattern') as string),
        }}
      />
      <PasswordController
        control={props.control}
        name='password'
        rules={{
          required: t('Alert.required.password') as string,
          minLength: {
            value: 6,
            message: `6${t('Alert.valid.minLength')}`,
          },
        }}
      />
    </>
  )
}

export default Form

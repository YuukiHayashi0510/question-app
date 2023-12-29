import SendIcon from '@mui/icons-material/Send'
import { Typography } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useAlert } from 'react-alert'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import isEmail from 'validator/lib/isEmail'

import SubmitButton from '~/components/base/Button/SubmitButton'
import TextController from '~/components/base/FormField/TextController'
import { AuthRepository } from '~/infrastructure/repository/firebase/authRepository'

import ModalTemplate, { Props } from '../../../../base/Modal'

export type CustomProps = Props & {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function ResetPassModal(props: CustomProps) {
  const {
    control,
    formState: { isValid },
    watch,
    handleSubmit,
    setValue,
  } = useForm<{ value: string }>({
    defaultValues: { value: '' },
    criteriaMode: 'all',
    mode: 'onChange',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [t] = useTranslation()
  const alert = useAlert()

  const onClose = () => {
    props.setIsOpen(false)
    setValue('value', '')
  }

  const onSubmit = async () => {
    if (!isValid) return
    setIsLoading(true)
    const { isError, response } = await AuthRepository.resetPassword(
      watch('value')
    )
    if (isError) {
      alert.error(response)
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    alert.success(t('Alert.submitted'))
    props.setIsOpen(false)
    setValue('value', '')
  }

  return (
    <ModalTemplate isOpen={props.isOpen} onClose={onClose}>
      <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
        <Typography className='my-4 text-center' component='h5' variant='h5'>
          {t('Register.resetPass')}
        </Typography>
        <p className='my-2 whitespace-pre-wrap break-words text-center'>
          {t('Register.resetPassText')}
        </p>
        <TextController
          control={control}
          label={t('User.mail')}
          name='value'
          rules={{
            required: t('Alert.required.mail') as string,
            validate: (value) =>
              isEmail(value) || (t('Alert.valid.pattern') as string),
          }}
        />
        <SubmitButton isLoading={isLoading} onClick={onSubmit}>
          <span className='flex items-center gap-1'>
            <SendIcon fontSize='small' />
            {t('Button.submit')}
          </span>
        </SubmitButton>
      </form>
    </ModalTemplate>
  )
}

export default ResetPassModal

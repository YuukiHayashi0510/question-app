import SendIcon from '@mui/icons-material/Send'
import { Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import isEmail from 'validator/lib/isEmail'

import SubmitButton from '~/components/base/Button/SubmitButton'
import TextController from '~/components/base/FormField/TextController'
import { resetPassword } from '~/lib/Firebase/auth'
import { SetState } from '~/types/utils'

import CustomModal, { Props } from '../../../base/Modal'

export type CustomProps = Props & {
  setIsOpen: SetState<boolean>
}

function ResetPassModal(props: CustomProps) {
  const {
    control,
    formState: { errors, isValid },
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

  const onClose = () => {
    props.setIsOpen(false)
    setValue('value', '')
  }

  const onSubmit = async () => {
    if (!isValid) return
    setIsLoading(true)
    const { isError, response } = await resetPassword(watch('value'))
    if (isError) {
      alert(response)
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    alert(t('Alert.submitted'))
    props.setIsOpen(false)
    setValue('value', '')
  }

  return (
    <CustomModal isOpen={props.isOpen} onClose={onClose}>
      <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
        <Typography className='my-4 text-center' component='h5' variant='h5'>
          {t('Register.resetPass')}
        </Typography>
        <p className='my-2 whitespace-pre-wrap break-words text-center'>
          {t('Register.resetPassText')}
        </p>
        <TextController
          control={control}
          errors={errors}
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
    </CustomModal>
  )
}

export default ResetPassModal

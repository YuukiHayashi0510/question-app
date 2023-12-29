import { Link } from '@mui/material'
import { useTranslation } from 'react-i18next'

import SubmitButton from '~/components/base/Button/SubmitButton'

export type Props = {
  isLoading: boolean
  isRegister: boolean
  onClickRegister: () => void
  onClickReset: () => void
  onSubmit: () => void
}

export function FormBottom(props: Props) {
  const [t] = useTranslation()

  return (
    <div className='flex flex-col items-center gap-4'>
      <SubmitButton isLoading={props.isLoading} onClick={props.onSubmit}>
        {props.isRegister ? t('Button.signup') : t('Button.login')}
      </SubmitButton>
      <Link onClick={props.onClickRegister}>
        {!props.isRegister ? t('Link.signup') : t('Link.login')}
      </Link>
      <Link onClick={props.onClickReset}>{t('Link.resetPassword')}</Link>
    </div>
  )
}

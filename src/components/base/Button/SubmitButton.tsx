import { ReactNode } from 'react'
import LoadingButton from '~/components/base/Button/LoadingButton'

type Props = {
  isLoading: boolean
  onClick: (any: any) => any
  children: ReactNode
}

function SubmitButton(props: Props) {
  return (
    <>
      <LoadingButton
        isLoading={props.isLoading}
        onClick={props.onClick}
        type='submit'
        variant='outlined'
      >
        {props.children}
      </LoadingButton>
    </>
  )
}

export default SubmitButton

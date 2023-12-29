import { ComponentPropsWithoutRef } from 'react'
import LoadingButton from '~/components/base/Button/LoadingButton'

function SubmitButton(props: ComponentPropsWithoutRef<typeof LoadingButton>) {
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

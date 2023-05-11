import { Button, CircularProgress } from '@mui/material'
import { ReactNode } from 'react'
import { ButtonType, ButtonVariant } from './utils'

export type Props = {
  className?: string
  isLoading?: boolean
  type?: ButtonType
  variant?: ButtonVariant
  disabled?: boolean
  hidden?: boolean
  children: ReactNode
  onClick?: (any: any) => void
}

function LoadingButton(props: Props) {
  return (
    <>
      {props.isLoading ? (
        <CircularProgress className='m-3' disableShrink thickness={4} />
      ) : (
        <Button
          className={props.className}
          disabled={props.disabled}
          hidden={props.hidden}
          onClick={props.onClick}
          type={props.type}
          variant={props.variant}
        >
          {props.children}
        </Button>
      )}
    </>
  )
}

export default LoadingButton

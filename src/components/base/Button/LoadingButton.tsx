import { Button, CircularProgress } from '@mui/material'
import { ComponentPropsWithoutRef } from 'react'

export type LoadingButtonProps = {
  isLoading?: boolean
} & ComponentPropsWithoutRef<typeof Button>

function LoadingButton({ isLoading, ...props }: LoadingButtonProps) {
  return (
    <>
      {isLoading ? (
        <CircularProgress className='m-3' disableShrink thickness={4} />
      ) : (
        <Button
          className={props.className}
          disabled={props.disabled}
          hidden={props.hidden}
          onClick={props.onClick}
          type={props.type}
          variant={props.variant}
          {...props}
        >
          {props.children}
        </Button>
      )}
    </>
  )
}

export default LoadingButton

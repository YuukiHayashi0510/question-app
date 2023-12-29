import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useAlert } from 'react-alert'

type Props = {
  isValid: boolean
  alertMessage: string
  url: string
  children: ReactNode
}

function Layout({ isValid, alertMessage, url, children }: Props) {
  const router = useRouter()
  const alert = useAlert()

  useEffect(() => {
    if (isValid) return
    alert.error(alertMessage)
    router.push(url)
  }, [])

  return (
    <>{isValid ? children : <CircularProgress disableShrink thickness={4} />}</>
  )
}

export default Layout

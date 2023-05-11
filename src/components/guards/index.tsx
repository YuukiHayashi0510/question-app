import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

type Props = {
  isValid: boolean
  alertMessage: string
  url: string
  children: ReactNode
}

function Layout({ isValid, alertMessage, url, children }: Props) {
  const router = useRouter()

  useEffect(() => {
    if (isValid) return
    alert(alertMessage)
    router.push(url)
  }, [])

  return (
    <>{isValid ? children : <CircularProgress disableShrink thickness={4} />}</>
  )
}

export default Layout

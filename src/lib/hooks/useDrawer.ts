import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    router.events.on('hashChangeStart', () => setIsOpen(false))
    return () => {
      router.events.off('hashChangeStart', () => setIsOpen(false))
    }
  }, [router.events])

  return [isOpen, setIsOpen] as const
}

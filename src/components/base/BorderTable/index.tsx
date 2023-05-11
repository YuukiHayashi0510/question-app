import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

function BorderTable({ className, children }: Props) {
  return <table className={`border ${className}`}>{children}</table>
}

export default BorderTable

import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

function BorderTable({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'table'>) {
  const allClasses = twMerge('border', className)
  return (
    <table className={allClasses} {...props}>
      {children}
    </table>
  )
}

export default BorderTable

import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export function Tr({
  className = '',
  children,
  ...props
}: ComponentPropsWithoutRef<'tr'>) {
  const allClasses = twMerge('border', className)
  return (
    <tr className={allClasses} {...props}>
      {children}
    </tr>
  )
}

export function Th({
  className = '',
  children,
  ...props
}: ComponentPropsWithoutRef<'th'>) {
  const allClasses = twMerge('border p-1', className)
  return (
    <th className={allClasses} {...props}>
      {children}
    </th>
  )
}

export function Td({
  className = '',
  children = '',
  ...props
}: ComponentPropsWithoutRef<'td'>) {
  const allClasses = twMerge('border p-1 text-center', className)
  return (
    <td className={allClasses} {...props}>
      {children}
    </td>
  )
}

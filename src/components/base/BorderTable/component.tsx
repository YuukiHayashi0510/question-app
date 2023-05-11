import { ThHTMLAttributes } from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function Tr({ className = '', children }: Props) {
  return <tr className={`border ${className}`}>{children}</tr>
}

export function Th({
  className = '',
  children,
  ...props
}: Props & ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th className={`border p-1 ${className}`} {...props}>
      {children}
    </th>
  )
}

export function Td({ className = '', children = '' }: Props) {
  return <td className={`border p-1 text-center ${className}`}>{children}</td>
}

import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: any
}

function StyledButton({ children, onClick }: Props) {
  return (
    <button className='w-20' onClick={onClick}>
      {children}
    </button>
  )
}

export default StyledButton

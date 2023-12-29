import React, { ComponentPropsWithoutRef } from 'react'

function StyledButton({
  children,
  onClick,
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button className='w-20' onClick={onClick}>
      {children}
    </button>
  )
}

export default StyledButton

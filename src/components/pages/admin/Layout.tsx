import React from 'react'
import RoleGuard from '~/guards/RoleGuard'
import { PageType } from '~/types/pages/page'
import { Role } from '~/types/pages/user/const'
import Item from './parts/Item'

function Layout() {
  return (
    <RoleGuard role={Role.Admin}>
      <div className='mt-8'>
        <div className='flex flex-col items-center justify-center gap-y-16 laptop:gap-y-32'>
          <div className='flex gap-16 laptop:gap-32'>
            <Item page={PageType.Admin.User} />
            <Item page={PageType.Admin.Report} />
          </div>
          <div className='flex gap-16 laptop:gap-32'>
            <Item page={PageType.Admin.Test} />
            <Item page={PageType.Admin.News} />
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}

export default Layout

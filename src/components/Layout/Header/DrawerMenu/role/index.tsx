import React from 'react'
import { Role } from '~/types/pages/user/const'
import AdminView from './Admin'
import MentorView from './Mentor'

type Props = {
  role: Role
}

const RoleView = ({ role }: Props) => {
  const currentView = {
    [Role.Admin]: <AdminView />,
    [Role.Mentor]: <MentorView />,
  }[role]

  return <div>{currentView}</div>
}

export default RoleView

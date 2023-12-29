import { Meta, StoryObj } from '@storybook/react'
import { Role } from '~/types/pages/user/const'
import RoleView from '.'

const meta: Meta<typeof RoleView> = {
  title: '/components/layout/header/DrawerMenu/RoleView',
  component: RoleView,
}

export default meta

type Story = StoryObj<typeof RoleView>

export const Mentor: Story = {
  args: {
    role: Role.Mentor,
  },
}

export const Admin: Story = {
  args: {
    role: Role.Admin,
  },
}

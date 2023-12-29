import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { Role } from '~/types/pages/user/const'
import Profile from '.'

const meta: Meta<typeof Profile> = {
  component: Profile,
}

export default meta

type Story = StoryObj<typeof Profile>

export const Defaults: Story = {
  render: function Comp() {
    const { setContext } = useSessionUser()
    useEffect(() => {
      setContext({ name: '', role: Role.Student })
    }, [])

    return <Profile />
  },
}

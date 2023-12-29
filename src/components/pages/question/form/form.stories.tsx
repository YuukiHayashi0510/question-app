import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { Role } from '~/types/pages/user/const'
import { Form } from '.'

const meta: Meta<typeof Form> = {
  component: Form,
}

export default meta

type Story = StoryObj<typeof Form>

export const Defaults: Story = {
  render: function Comp() {
    const { setContext } = useSessionUser()
    useEffect(() => {
      setContext({ name: '', role: Role.Student })
    }, [])

    return <Form />
  },
}

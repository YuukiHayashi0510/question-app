import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { Role } from '~/types/pages/user/const'
import Header from '.'

const meta: Meta<typeof Header> = {
  component: Header,
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: { title: '質問サイト' },
}

export const Student: Story = {
  args: { title: '質問サイト' },
  render: function Comp({ ...args }) {
    const { setContext } = useSessionUser()
    useEffect(() => {
      setContext({ name: '', role: Role.Student })
    }, [])

    return <Header title={args.title} />
  },
}

export const Mentor: Story = {
  args: { title: '質問サイト' },
  render: function Comp({ ...args }) {
    const { setContext } = useSessionUser()
    useEffect(() => {
      setContext({ name: '', role: Role.Mentor })
    }, [])

    return <Header title={args.title} />
  },
}

export const Admin: Story = {
  args: { title: '質問サイト' },
  render: function Comp({ ...args }) {
    const { setContext } = useSessionUser()
    useEffect(() => {
      setContext({ name: '', role: Role.Admin })
    }, [])

    return <Header title={args.title} />
  },
}

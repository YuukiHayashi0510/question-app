import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DrawerMenu from '.'

const meta: Meta<typeof DrawerMenu> = {
  component: DrawerMenu,
}

export default meta

type Story = StoryObj<typeof DrawerMenu>

export const Default: Story = {
  render: function Comp() {
    const [, setIsOpen] = useState(false)

    return <DrawerMenu setIsOpen={setIsOpen} />
  },
}

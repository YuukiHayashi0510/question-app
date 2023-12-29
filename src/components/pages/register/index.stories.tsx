import { Meta, StoryObj } from '@storybook/react'
import Register from '.'

const meta: Meta<typeof Register> = {
  component: Register,
}

export default meta

type Story = StoryObj<typeof Register>

export const Defaults: Story = {}

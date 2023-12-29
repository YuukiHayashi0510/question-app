import { Meta, StoryObj } from '@storybook/react'
import ResetPassModal from '.'

const meta: Meta<typeof ResetPassModal> = {
  component: ResetPassModal,
}

export default meta

type Story = StoryObj<typeof ResetPassModal>

export const Default: Story = {
  args: { isOpen: true },
}

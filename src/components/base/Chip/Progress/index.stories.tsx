import { Meta, StoryObj } from '@storybook/react'
import { State } from '~/types/pages/form/const'
import ProgressChip from '.'

const meta: Meta<typeof ProgressChip> = {
  component: ProgressChip,
}

export default meta

type Story = StoryObj<typeof ProgressChip>

export const Yet: Story = {
  args: {
    label: State.Yet,
  },
}

export const Doing: Story = {
  args: {
    label: State.Doing,
  },
}

export const Done: Story = {
  args: {
    label: State.Done,
  },
}

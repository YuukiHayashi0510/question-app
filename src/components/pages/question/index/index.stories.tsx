import { Meta, StoryObj } from '@storybook/react'
import Question from '.'

const meta: Meta<typeof Question> = {
  component: Question,
}

export default meta

type Story = StoryObj<typeof Question>

export const Defaults: Story = {}

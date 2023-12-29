import { Meta, StoryObj } from '@storybook/react'
import { State } from '~/types/pages/form/const'
import { Order } from '~/types/pages/question/const'
import SortTab from '.'

const meta: Meta<typeof SortTab> = {
  component: SortTab,
}

export default meta

type Story = StoryObj<typeof SortTab>

export const Default: Story = {
  args: { sort: { state: '', date: '' } },
}

export const Yet: Story = {
  args: { sort: { state: State.Yet, date: '' } },
}

export const Doing: Story = {
  args: { sort: { state: State.Doing, date: '' } },
}

export const Done: Story = {
  args: { sort: { state: State.Done, date: '' } },
}

export const Asc: Story = {
  args: { sort: { state: '', date: Order.Asc } },
}

export const Desc: Story = {
  args: { sort: { state: '', date: Order.Desc } },
}

import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Profile } from '~/types/pages/user'
import AreaController from './Profile'

const meta: Meta<typeof AreaController> = {
  component: AreaController,
}

export default meta

type Story = StoryObj<typeof AreaController>

export const Default: Story = {
  render: function Comp() {
    const { control } = useForm<Profile>()
    return (
      <form>
        <AreaController control={control} />
      </form>
    )
  },
}

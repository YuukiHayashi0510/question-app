import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import PasswordController from '.'

const meta: Meta<typeof PasswordController> = {
  component: PasswordController,
}

export default meta

type Form = {
  pw: string
}

type Story = StoryObj<typeof PasswordController>

export const Default: Story = {
  render: function Comp() {
    const { control } = useForm<Form>()
    return (
      <form>
        <PasswordController control={control} name='pw' />
      </form>
    )
  },
}

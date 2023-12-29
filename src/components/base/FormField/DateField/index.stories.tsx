import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import DateField from '.'

const meta: Meta<typeof DateField> = {
  component: DateField,
}

export default meta

type Story = StoryObj<typeof DateField>

type Form = {
  date: Date
}

export const Default: Story = {
  render: function Comp() {
    const { control } = useForm<Form>()
    return (
      <form>
        <DateField control={control} name='date' />
      </form>
    )
  },
}

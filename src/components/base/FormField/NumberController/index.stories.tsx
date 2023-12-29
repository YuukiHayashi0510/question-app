import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import NumberController from '.'

const meta: Meta<typeof NumberController> = {
  component: NumberController,
}

export default meta

type Story = StoryObj<typeof NumberController>

type Form = {
  num: number
}

export const Default: Story = {
  args: {
    label: '数字',
    required: false,
  },
  render: function Comp({ ...args }) {
    const { control } = useForm<Form>()
    return (
      <form>
        <NumberController
          control={control}
          label={args.label}
          name='num'
          required={args.required}
        />
      </form>
    )
  },
}

export const Required: Story = {
  args: {
    label: '数字',
    required: true,
  },
  render: function Comp({ ...args }) {
    const { control } = useForm<Form>()
    return (
      <form>
        <NumberController
          control={control}
          label={args.label}
          name='num'
          required={args.required}
        />
      </form>
    )
  },
}

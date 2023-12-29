import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import TextController from '.'

const meta: Meta<typeof TextController> = {
  component: TextController,
  args: {
    required: false,
  },
}

export default meta

type Form = {
  text: string
}

type Story = StoryObj<typeof TextController>

export const Default: Story = {
  args: {
    label: 'テキスト',
    multiline: false,
  },
  render: function Comp({ ...args }) {
    const { control } = useForm<Form>()

    return (
      <TextController
        control={control}
        label={args.label}
        multiline={args.multiline}
        name='text'
      />
    )
  },
}

export const Required: Story = {
  args: {
    label: 'テキスト',
    multiline: false,
    required: true,
    rules: { required: '必須入力' },
  },
  render: function Comp({ ...args }) {
    const { control } = useForm<Form>()

    return (
      <form>
        <TextController
          control={control}
          label={args.label}
          multiline={args.multiline}
          name='text'
          required={args.required}
          rules={args.rules}
        />
      </form>
    )
  },
}

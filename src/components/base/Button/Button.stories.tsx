import LoadingButton from './LoadingButton'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoadingButton> = {
  component: LoadingButton,
}

export default meta

type Story = StoryObj<typeof LoadingButton>

export const Loading: Story = {
  args: {
    className: '',
    disabled: false,
    type: 'button',
    variant: 'contained',
    isLoading: false,
    children: 'ロード',
    size: 'medium',
  },
}

export const Submit: Story = {
  args: {
    className: '',
    disabled: false,
    type: 'submit',
    variant: 'contained',
    isLoading: false,
    children: '送信',
  },
}

export const Disabled: Story = {
  args: {
    className: '',
    disabled: true,
    type: 'button',
    variant: 'contained',
    isLoading: false,
    children: 'ロード',
    size: 'medium',
  },
}

export const IsLoading: Story = {
  args: {
    className: '',
    disabled: false,
    type: 'button',
    variant: 'contained',
    isLoading: true,
    children: 'ロード',
    size: 'medium',
  },
}

export const Outlined: Story = {
  args: {
    className: '',
    disabled: false,
    type: 'button',
    variant: 'outlined',
    isLoading: false,
    children: 'ロード',
    size: 'medium',
  },
}

export const Text: Story = {
  args: {
    className: '',
    disabled: false,
    type: 'button',
    variant: 'text',
    isLoading: false,
    children: 'ロード',
    size: 'medium',
  },
}

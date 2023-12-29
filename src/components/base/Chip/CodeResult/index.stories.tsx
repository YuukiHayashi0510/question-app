import { Meta, StoryObj } from '@storybook/react'
import { TestResult } from '~/types/pages/code'
import CodeResultChip from '.'

const meta: Meta<typeof CodeResultChip> = {
  component: CodeResultChip,
}

export default meta

type Story = StoryObj<typeof CodeResultChip>

export const AC: Story = {
  args: {
    label: TestResult.AC,
  },
}

export const WA: Story = {
  args: {
    label: TestResult.WA,
  },
}

export const TLE: Story = {
  args: {
    label: TestResult.TLE,
  },
}

export const MLE: Story = {
  args: {
    label: TestResult.MLE,
  },
}

export const RE: Story = {
  args: {
    label: TestResult.RE,
  },
}

export const CE: Story = {
  args: {
    label: TestResult.CE,
  },
}

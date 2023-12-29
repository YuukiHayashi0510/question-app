import { Td, Th, Tr } from './component'
import type { Meta, StoryObj } from '@storybook/react'
import BorderTable from '.'

const meta: Meta<typeof BorderTable> = {
  component: BorderTable,
}

export default meta

type Story = StoryObj<typeof BorderTable>

export const Defaults: Story = {
  render: () => (
    <BorderTable>
      <thead>
        <Tr>
          <Th className='w-2/3'>項目</Th>
          <Th className='w-1/3'>所要時間</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Con</Td>
          <Td>2h</Td>
        </Tr>
      </tbody>
    </BorderTable>
  ),
}

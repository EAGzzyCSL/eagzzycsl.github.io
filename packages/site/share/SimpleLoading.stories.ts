import type { Meta, StoryObj } from '@storybook/react'

import SimpleLoading from './SimpleLoading'

const meta = {
  title: 'SimpleLoading',
  component: SimpleLoading,
} satisfies Meta<typeof SimpleLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: '加载中',
  },
}

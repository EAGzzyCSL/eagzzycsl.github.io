import type { Meta, StoryObj } from '@storybook/react'

import SimpleError from './SimpleError'

const meta = {
  title: 'SimpleError',
  component: SimpleError,
} satisfies Meta<typeof SimpleError>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: '出错啦',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onConfirm: () => {},
  },
}

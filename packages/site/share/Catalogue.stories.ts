import type { Meta, StoryObj } from '@storybook/react'

import Catalogue from './Catalogue'

const meta = {
  title: 'Catalogue',
  component: Catalogue,
} satisfies Meta<typeof Catalogue>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    toc: {
      // TODO: 看起来 list 这个属性可以没有
      list: [],
      nested: [
        {
          title: '1.1 序言',
          level: 1,
          sub: [],
        },
        {
          title: '1.2 正文',
          level: 1,
          sub: [
            {
              title: '1.2.1 第一节',
              level: 2,
              sub: [],
            },
            {
              title: '1.2.2 第二章',
              level: 2,
              sub: [],
            },
          ],
        },
        {
          title: '1.3 总结',
          level: 1,
          sub: [],
        },
      ],
    },
    noLevelId: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onItemClick: () => {},
  },
}

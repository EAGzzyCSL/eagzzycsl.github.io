import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import PanelSwitcher from './PanelSwitcher'

const meta = {
  title: 'PanelSwitcher',
  component: PanelSwitcher,
} satisfies Meta<typeof PanelSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    selectedPanelIndex: 0,
    panels: [
      {
        id: '111',
        component: () => <div>pane1</div>,
      },
      {
        id: '222',
        component: () => <div>pane2</div>,
      },
    ],
  },
}

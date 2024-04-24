import type { Meta, StoryObj } from '@storybook/react'
import { Todolists } from './Todolists'
import { ReduxStoreProviderDecorator, ThemeProviderDecorator } from 'common/stories/decorators'

const meta: Meta<typeof Todolists> = {
  title: 'TODOLISTS/todolists',
  component: Todolists,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, ThemeProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Todolists>

export const TodolistsStory: Story = {}

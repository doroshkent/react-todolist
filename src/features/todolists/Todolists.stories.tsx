import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator'
import { Todolists } from 'features/todolists/Todolists'
import { ThemeProviderDecorator } from 'stories/decorators/ThemeProviderDecorator'

const meta: Meta<typeof Todolists> = {
  title: 'TODOLISTS/todolists',
  component: Todolists,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, ThemeProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Todolists>

export const TodolistsStory: Story = {}

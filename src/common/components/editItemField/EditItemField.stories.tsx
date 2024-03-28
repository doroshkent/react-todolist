import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditItemField } from './EditItemField'

const meta: Meta<typeof EditItemField> = {
  title: 'TODOLISTS/EditItemField',
  component: EditItemField,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Start title is empty. Add title, push Enter, set string.',
    },
    renameItem: {
      description: 'Changes title. Sets error if title is empty.',
    },
    toggleEditMode: {
      description: 'Hides component.',
    },
  },
}

export default meta
type Story = StoryObj<typeof EditItemField>

export const EditItemFieldStory: Story = {
  args: {
    title: '',
    renameItem: action('title changed'),
    toggleEditMode: action('field hide'),
  },
}

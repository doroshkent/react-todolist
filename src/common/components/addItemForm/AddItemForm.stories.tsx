import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AddItemForm } from './AddItemForm'

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      action: 'clicked',
    },
    item: {
      description: "Title of item, that's being added (for label).",
    },
  },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
  args: {
    addItem: action('Button clicked inside form'),
    item: 'task',
  },
}

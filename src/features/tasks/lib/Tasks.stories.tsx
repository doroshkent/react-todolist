import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from 'common/stories/decorators'
import { Tasks } from 'features/tasks/ui/Tasks'

const meta: Meta<typeof Tasks> = {
  title: 'TODOLISTS/Tasks',
  component: Tasks,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [ReduxStoreProviderDecorator],
  argTypes: {
    todolistId: {
      description: 'Id of todolist, from which tasks are shown.',
    },
  },
  args: {
    todolistId: 'todolistId1',
  },
}

export default meta
type Story = StoryObj<typeof Tasks>

export const TasksStory: Story = {}

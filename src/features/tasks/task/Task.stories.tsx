import type { Meta, StoryObj } from '@storybook/react'
import { useSelector } from 'react-redux'
import { ReduxStoreProviderDecorator } from 'common/stories/decorators'
import { Task } from './Task'
import { selectTasks } from '../tasks-selectors'

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Task>

const Component = ({ todolistId }: { todolistId: string }) => {
  const tasks = useSelector(selectTasks(todolistId))
  return (
    <Task
      id={tasks[0].id}
      status={tasks[0].status}
      title={tasks[0].title}
      todolistId={todolistId}
      entityStatus={tasks[0].entityStatus}
    />
  )
}

export const TaskStory: Story = {
  args: {
    todolistId: 'todolistId1',
  },
  render: (args) => <Component {...args} />,
}

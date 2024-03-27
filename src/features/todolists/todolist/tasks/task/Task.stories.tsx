import type { Meta, StoryObj } from '@storybook/react'
import { Task } from 'features/todolists/todolist/tasks/task/Task'
import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator'
import { selectTasks } from 'features/todolists/todolist/tasks/tasks-selectors'
import { useSelector } from 'react-redux'

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

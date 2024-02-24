import type { Meta, StoryObj } from '@storybook/react';
import { Task } from "components/tasks/task/Task";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { useAppSelector } from "state/store";
import { TaskType } from "api/todolists-api";

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  tags: [ 'autodocs' ],
  decorators: [ ReduxStoreProviderDecorator ]
};

export default meta;
type Story = StoryObj<typeof Task>;

const Component = ({ todolistId }: { todolistId: string }) => {
  const tasks = useAppSelector<TaskType[]>( state => state.tasks[todolistId] )
  return <Task id={ tasks[0].id } status={ tasks[0].status } title={ tasks[0].title } todolistId={ todolistId } />
}

export const TaskStory: Story = {
  args: {
    todolistId: "todolistId1",
  },
  render: args => <Component { ...args } />
};

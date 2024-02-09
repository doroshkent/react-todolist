import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { Tasks } from "components/tasks/Tasks";

const meta: Meta<typeof Tasks> = {
  title: 'TODOLISTS/Tasks',
  component: Tasks,
  tags: [ 'autodocs' ],
  decorators: [ ReduxStoreProviderDecorator ],
  argTypes: {
    todolistId: {
      description: 'Id of todolist, from which tasks are shown.'
    },
    filter: {
      description: 'Determines which tasks should me shown'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tasks>;

export const TasksStory: Story = {
  args: {
    todolistId: "todolistId1",
    filter: "all"
  },
};

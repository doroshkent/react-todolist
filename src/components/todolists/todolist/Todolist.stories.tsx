import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { ThemeProviderDecorator } from "stories/decorators/ThemeProviderDecorator";
import { Todolist } from "components/todolists/todolist/Todolist";

const meta: Meta<typeof Todolist> = {
  title: 'TODOLISTS/todolists',
  component: Todolist,
  tags: [ 'autodocs' ],
  decorators: [ ReduxStoreProviderDecorator, ThemeProviderDecorator ],
  argTypes: {
    id: {
      description: 'Id of displayed todolist'
    },
    title: {
      description: 'Todolist\'s title'
    },
    filter: {
      description: 'Determines which tasks should be shown'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Todolist>;

export const TodolistStory: Story = {
  args: {
    id: "todolist"
  }
};

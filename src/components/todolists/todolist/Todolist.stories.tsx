import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { ThemeProviderDecorator } from "stories/decorators/ThemeProviderDecorator";
import { Todolist } from "components/todolists/todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootStateType } from "state/store";
import { TodoListStateType } from "state/todolistsReducer";

const meta: Meta<typeof Todolist> = {
  title: 'TODOLISTS/Todolist',
  component: Todolist,
  tags: [ 'autodocs' ],
  decorators: [ ReduxStoreProviderDecorator, ThemeProviderDecorator ],
};

export default meta;

type Story = StoryObj<typeof Todolist>;

const Component = () => {
  const todolists = useSelector<AppRootStateType, TodoListStateType>( state => state.todolists );
  return <Todolist id={ todolists[0].id } filter={ todolists[0].filter } title={ todolists[0].title } />
}

export const TodolistStory: Story = {
  render: () => <Component />
};

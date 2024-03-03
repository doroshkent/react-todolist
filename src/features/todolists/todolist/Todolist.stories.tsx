import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { ThemeProviderDecorator } from "stories/decorators/ThemeProviderDecorator";
import { Todolist } from "features/todolists/todolist/Todolist";
import { useAppSelector } from "state/store";
import { TodolistDomainType } from "state/todolistsReducer";

const meta: Meta<typeof Todolist> = {
  title: 'TODOLISTS/Todolist',
  component: Todolist,
  tags: [ 'autodocs' ],
  decorators: [ ReduxStoreProviderDecorator, ThemeProviderDecorator ],
};

export default meta;

type Story = StoryObj<typeof Todolist>;

const Component = () => {
  const todolists = useAppSelector<TodolistDomainType[]>( state => state.todolists );
  return <Todolist id={ todolists[0].id } filter={ todolists[0].filter } title={ todolists[0].title }
                   entityStatus={ todolists[0].entityStatus } />
}

export const TodolistStory: Story = {
  render: () => <Component />
};

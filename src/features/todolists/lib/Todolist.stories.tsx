import type { Meta, StoryObj } from '@storybook/react'
import { useSelector } from 'react-redux'
import { ReduxStoreProviderDecorator, ThemeProviderDecorator } from 'common/stories/decorators'
import { Todolist } from 'features/todolists/ui/todolist/Todolist'
import { selectTodolists } from '../model/todolists-slice'

const meta: Meta<typeof Todolist> = {
  title: 'TODOLISTS/Todolist',
  component: Todolist,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, ThemeProviderDecorator],
}

export default meta

type Story = StoryObj<typeof Todolist>

const Component = () => {
  const todolists = useSelector(selectTodolists)
  return <Todolist todolist={todolists[0]} />
}

export const TodolistStory: Story = {
  render: () => <Component />,
}

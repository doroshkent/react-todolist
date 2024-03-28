import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from 'common/stories/decorators/ReduxStoreProviderDecorator'
import { ThemeProviderDecorator } from 'common/stories/decorators/ThemeProviderDecorator'
import { Todolist } from 'features/todolists/todolist/Todolist'
import { selectTodolists } from 'features/todolists/todolists-selectors'
import { useSelector } from 'react-redux'

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
  return (
    <Todolist
      id={todolists[0].id}
      filter={todolists[0].filter}
      title={todolists[0].title}
      entityStatus={todolists[0].entityStatus}
    />
  )
}

export const TodolistStory: Story = {
  render: () => <Component />,
}

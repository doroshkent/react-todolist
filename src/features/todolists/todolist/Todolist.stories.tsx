import type { Meta, StoryObj } from '@storybook/react'
import { useSelector } from 'react-redux'
import { ReduxStoreProviderDecorator, ThemeProviderDecorator } from 'common/stories/decorators'
import { selectTodolists, Todolist } from 'features/todolists'

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

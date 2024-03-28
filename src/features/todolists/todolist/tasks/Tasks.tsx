import React, { memo } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Task, useTasks } from 'features/todolists/todolist/tasks'
import { NoItemsPrompt } from 'common/components'
import List from '@mui/material/List'

export type TasksProps = {
  todolistId: string
}

export const Tasks = memo(({ todolistId }: TasksProps) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()
  const { tasks } = useTasks(todolistId)

  return (
    <>
      {tasks.length > 0 ? (
        <List ref={listRef}>
          {tasks.map((task) => (
            <Task key={task.id} todolistId={todolistId} {...task} />
          ))}
        </List>
      ) : (
        <NoItemsPrompt item={'task'} />
      )}
    </>
  )
})

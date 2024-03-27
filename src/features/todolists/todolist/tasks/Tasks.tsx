import React, { memo } from 'react'
import List from '@mui/material/List'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Task } from 'features/todolists/todolist/tasks/task/Task'
import { useTasks } from 'features/todolists/todolist/tasks/useTasks'
import { NoItemsPrompt } from 'common/components/NoItemsPrompt'

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

import React, { memo } from 'react'
import { NoItemsPrompt } from 'common/components'
import List from '@mui/material/List'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTasks } from 'features/tasks/lib/useTasks'
import { Task } from 'features/tasks/task/Task'

export const Tasks = memo(({ todolistId }: TasksProps) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()
  const { tasks } = useTasks(todolistId)

  return (
    <>
      {tasks.length > 0 ? (
        <List ref={listRef}>
          {tasks.map((task) => (
            <Task key={task.id} todolistId={todolistId} task={task} />
          ))}
        </List>
      ) : (
        <NoItemsPrompt item={'task'} />
      )}
    </>
  )
})

// types
export type TasksProps = {
  todolistId: string
}

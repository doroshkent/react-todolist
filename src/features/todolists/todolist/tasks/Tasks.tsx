import React, { memo } from 'react'
import List from '@mui/material/List'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Task } from 'features/todolists/todolist/tasks/task/Task'
import { useTasks } from 'features/todolists/todolist/tasks/useTasks'
import { FilterValues } from 'features/todolists/todolistsSlice'
import { NoItemsPrompt } from 'components/NoItemsPrompt'

export type TasksProps = {
  todolistId: string
  filter: FilterValues
}

export const Tasks = memo(({ todolistId, filter }: TasksProps) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()
  const { filteredTasks } = useTasks(todolistId, filter)

  return (
    <>
      {filteredTasks.length > 0 ? (
        <List ref={listRef}>
          {filteredTasks.map((task) => (
            <Task key={task.id} todolistId={todolistId} {...task} />
          ))}
        </List>
      ) : (
        <NoItemsPrompt item={'task'} />
      )}
    </>
  )
})

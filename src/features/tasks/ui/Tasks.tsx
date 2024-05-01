import React, { memo, useEffect } from 'react'
import { NoItemsPrompt } from 'common/components'
import List from '@mui/material/List'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Task } from 'features/tasks/ui/task/Task'
import { useActions } from 'common/hooks'
import { useSelector } from 'react-redux'
import { selectFilteredTasks } from 'features/tasks/model/tasks-selectors'

type Props = {
  todolistId: string
}

export const Tasks = memo(({ todolistId }: Props) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>()
  const { fetchTasks } = useActions()
  const tasks = useSelector(selectFilteredTasks(todolistId))

  useEffect(() => {
    fetchTasks(todolistId)
  }, [])

  return (
    <>
      {tasks.length > 0 ? (
        <List ref={listRef}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </List>
      ) : (
        <NoItemsPrompt item={'task'} />
      )}
    </>
  )
})

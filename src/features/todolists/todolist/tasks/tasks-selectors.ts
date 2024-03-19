import { AppRootState } from 'app/store'
import { createSelector } from '@reduxjs/toolkit'
import { selectTodolistFilter } from 'features/todolists/todolists-selectors'
import { TaskStatuses } from 'features/todolists/todolists-api'

export const selectTasks = (todolistId: string) => (state: AppRootState) => state.tasks[todolistId]

export const selectFilteredTasks = (todolistId: string) =>
  createSelector(selectTasks(todolistId), selectTodolistFilter(todolistId), (tasks, filter) => {
    switch (filter) {
      case 'active': {
        return tasks.filter((t) => t.status === TaskStatuses.New)
      }
      case 'completed': {
        return tasks.filter((t) => t.status === TaskStatuses.Completed)
      }
      default: {
        return tasks
      }
    }
  })

import { AppRootState } from 'app/store'

export const selectTasks = (todolistId: string) => (state: AppRootState) => state.tasks[todolistId]

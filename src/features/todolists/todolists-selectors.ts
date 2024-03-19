import { AppRootState } from 'app/store'

export const selectTodolists = (state: AppRootState) => state.todolists
export const selectTodolistFilter = (id: string) => (state: AppRootState) =>
  state.todolists.find((tl) => tl.id === id)?.filter

import { AppRootState } from 'common/types'

export const selectTodolistFilter = (id: string) => (state: AppRootState) =>
  state.todolists.find((tl) => tl.id === id)?.filter
export const selectTodolistFetchStatus = (id: string) => (state: AppRootState) =>
  state.todolists.find((tl) => tl.id === id)?.fetchStatus

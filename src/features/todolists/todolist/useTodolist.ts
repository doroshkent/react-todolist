import { FilterValues } from 'features/todolists/model/todolists-slice'
import { useActions } from 'common/hooks'

export const useTodolist = (id: string) => {
  const { removeTodolist, renameTodolist, addTask, changeFilter } = useActions()

  const onRemoveTodoList = () => {
    removeTodolist({ id })
  }
  const onRenameTodoList = (title: string) => {
    renameTodolist({ id, title })
  }
  const onAddTask = (title: string) => {
    addTask({ todolistId: id, title })
  }
  const onChangeFilter = (value: FilterValues) => {
    changeFilter({ id, filter: value })
  }

  return {
    onRenameTodoList,
    onRemoveTodoList,
    onAddTask,
    onChangeFilter,
  }
}

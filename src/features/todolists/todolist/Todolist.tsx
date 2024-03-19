import React, { memo } from 'react'
import { AddItemForm } from 'components/addItemForm/AddItemForm'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { Tasks } from 'features/todolists/todolist/tasks/Tasks'
import { useTodolist } from 'features/todolists/todolist/useTodolist'
import { FilterValues } from 'features/todolists/todolistsSlice'
import { RequestStatus } from 'app/appSlice'
import { FilterButton } from 'components/buttons/FilterButton'
import { DeleteButton } from 'components/buttons/DeleteButton'
import { EditableTitle } from 'components/editableTitle/EditableTitle'

type TodolistProps = {
  id: string
  title: string
  filter: FilterValues
  entityStatus: RequestStatus
}

export const Todolist = memo(({ id, title, filter, entityStatus }: TodolistProps) => {
  const { onTodoListDeleted, addNewTask, onFilterButtonClicked, onTodoListRenamed } = useTodolist(id)

  return (
    <Card sx={{ padding: '15px', minWidth: '300px', maxWidth: '450px' }}>
      <Grid container flexDirection={'column'}>
        <Grid item container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <EditableTitle renameItemCallback={onTodoListRenamed} entityStatus={entityStatus} title={title} />
          </Grid>
          <Grid item>
            <DeleteButton disabled={entityStatus === 'loading'} onClick={onTodoListDeleted} />
          </Grid>
        </Grid>

        <Grid item>
          <AddItemForm disabled={entityStatus === 'loading'} addItem={addNewTask} item="task" />
        </Grid>

        <Grid item>
          <Tasks todolistId={id} />
        </Grid>

        <Grid item alignSelf={'center'}>
          <ButtonGroup size={'small'}>
            <FilterButton filter={filter} onClickCallback={onFilterButtonClicked} filterName={'all'} />
            <FilterButton filter={filter} onClickCallback={onFilterButtonClicked} filterName={'active'} />
            <FilterButton filter={filter} onClickCallback={onFilterButtonClicked} filterName={'completed'} />
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  )
})

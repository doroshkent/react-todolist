import React, { memo } from 'react'
import { RequestStatus } from 'common/types'
import { AddItemForm, DeleteButton, EditableTitle, FilterButton } from 'common/components'
import { Tasks } from '../../tasks'
import { FilterValues } from 'features/todolists/todolists-slice'
import { useTodolist } from './useTodolist'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

export const Todolist = memo(({ id, title, filter, fetchStatus }: TodolistProps) => {
  const { onTodoListDeleted, addNewTask, onFilterButtonClicked, onTodoListRenamed } = useTodolist(id)

  return (
    <Card sx={{ padding: '15px', minWidth: '300px', maxWidth: '450px' }}>
      <Grid container flexDirection={'column'}>
        <Grid item container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <EditableTitle renameItemCallback={onTodoListRenamed} fetchStatus={fetchStatus} title={title} />
          </Grid>
          <Grid item>
            <DeleteButton disabled={fetchStatus === 'loading'} onClick={onTodoListDeleted} />
          </Grid>
        </Grid>

        <Grid item>
          <AddItemForm disabled={fetchStatus === 'loading'} addItem={addNewTask} item="task" />
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

// types
type TodolistProps = {
  id: string
  title: string
  filter: FilterValues
  fetchStatus: RequestStatus
}

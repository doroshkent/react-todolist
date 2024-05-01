import React from 'react'
import { AddItemForm } from 'common/components'
import { Tasks } from 'features/tasks'
import { TodolistDomain } from 'features/todolists/model/todolists-slice'
import { FilterTasksButtons } from './filterTasksButtons/FilterTasksButtons'
import { TodolistHeader } from './todolistHeader/TodolistHeader'
import { useActions } from 'common/hooks'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

type Props = {
  todolist: TodolistDomain
}

export const Todolist = ({ todolist }: Props) => {
  const { id, title, fetchStatus, filter } = todolist
  const { addTask } = useActions()

  const onAddTask = (title: string) => {
    addTask({ todolistId: id, title })
  }

  return (
    <Card sx={{ padding: '15px', minWidth: '300px', maxWidth: '450px' }}>
      <Grid container flexDirection={'column'}>
        <Grid item container justifyContent={'space-between'} alignItems={'center'}>
          <TodolistHeader fetchStatus={fetchStatus} title={title} id={id} />
        </Grid>

        <Grid item>
          <AddItemForm disabled={fetchStatus === 'loading'} addItem={onAddTask} item="task" />
        </Grid>

        <Grid item>
          <Tasks todolistId={id} />
        </Grid>

        <Grid item alignSelf={'center'}>
          <FilterTasksButtons id={id} filter={filter} />
        </Grid>
      </Grid>
    </Card>
  )
}

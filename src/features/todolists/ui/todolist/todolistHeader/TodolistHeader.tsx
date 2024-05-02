import React from 'react'
import Grid from '@mui/material/Grid'
import { DeleteButton, EditableTitle } from 'common/components'
import { RequestStatus } from 'common/types'
import { useActions } from 'common/hooks'

type Props = {
  id: string
  fetchStatus: RequestStatus
  title: string
}

export const TodolistHeader = ({ title, fetchStatus, id }: Props) => {
  const { removeTodolist, renameTodolist } = useActions()

  const onRemoveTodolist = () => {
    removeTodolist({ id })
  }
  const onRenameTodolist = (title: string) => {
    return renameTodolist({ id, title }).unwrap()
  }

  return (
    <>
      <Grid item>
        <EditableTitle renameItemCallback={onRenameTodolist} fetchStatus={fetchStatus} title={title} />
      </Grid>
      <Grid item>
        <DeleteButton disabled={fetchStatus === 'loading'} onClick={onRemoveTodolist} />
      </Grid>
    </>
  )
}

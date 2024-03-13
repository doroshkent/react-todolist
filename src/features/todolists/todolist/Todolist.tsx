import React, { memo } from 'react'
import { AddItemForm } from 'components/addItemForm/AddItemForm'
import { EditItemField } from 'components/editItemField/EditItemField'
import { ButtonGroup, Card, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { Tasks } from 'features/todolists/todolist/tasks/Tasks'
import { useTodolist } from 'features/todolists/todolist/useTodolist'
import { FilterValuesType } from 'state/todolists-reducer'
import { RequestStatusType } from 'state/app-reducer'
import { FilterButton } from 'components/buttons/FilterButton'

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist = memo(({ id, title, filter, entityStatus }: TodolistPropsType) => {
  const {
    titleEditMode,
    onTodoListRenamed,
    toggleTitleEditMode,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked,
  } = useTodolist(id, entityStatus)

  return (
    <Card sx={{ padding: '15px', width: '300px' }}>
      <Grid container flexDirection={'column'}>
        <Grid item container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            {titleEditMode ? (
              <EditItemField title={title} renameItem={onTodoListRenamed} toggleEditMode={toggleTitleEditMode} />
            ) : (
              <Tooltip title={'Double click to rename'}>
                <Typography variant={'h5'} onDoubleClick={() => toggleTitleEditMode(true)} sx={{ cursor: 'pointer' }}>
                  {title}
                </Typography>
              </Tooltip>
            )}
          </Grid>
          <Grid item>
            <Tooltip title={'Remove'}>
              <IconButton disabled={entityStatus === 'loading'} onClick={onTodoListDeleted}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid item>
          <AddItemForm disabled={entityStatus === 'loading'} addItem={addNewTask} item="task" />
        </Grid>

        <Grid item>
          <Tasks todolistId={id} filter={filter} />
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

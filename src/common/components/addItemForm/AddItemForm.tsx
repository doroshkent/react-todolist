import React, { memo } from 'react'
import { Grid, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAddItemForm } from './useAddItemForm'
import { ItemType } from 'common/types'

export const AddItemForm = memo(({ addItem, item, disabled = false }: AddItemFormPropsType) => {
  const { newItemTitle, error, onTitleChange, onEnterPress, onAddItem } = useAddItemForm(addItem)

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid item flexGrow={2}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant={'outlined'}
          size={'small'}
          label={error ? error : `New ${item}`}
          margin={'normal'}
          color={item === 'task' ? 'primary' : 'secondary'}
          error={!!error}
          value={newItemTitle}
          onChange={onTitleChange}
          onKeyDown={onEnterPress}
          disabled={disabled}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={onAddItem} disabled={!newItemTitle || disabled}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
})

// types
type AddItemFormPropsType = {
  addItem: (title: string) => void
  item: ItemType
  disabled?: boolean
}

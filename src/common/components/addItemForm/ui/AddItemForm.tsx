import React, { memo } from 'react'
import { Grid, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAddItemForm } from 'common/components/addItemForm/lib/useAddItemForm'
import { ItemType } from 'common/types'

type Props = {
  addItem: (title: string) => Promise<unknown>
  item: ItemType
  disabled?: boolean
}

export const AddItemForm = memo(({ addItem, item, disabled = false }: Props) => {
  const { newItemTitle, error, onChangeTitle, onEnterPress, onAddItem } = useAddItemForm(addItem)

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
          onChange={onChangeTitle}
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

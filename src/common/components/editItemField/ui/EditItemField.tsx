import React, { memo } from 'react'
import TextField from '@mui/material/TextField'
import { useEditItemField } from 'common/components/editItemField/lib/useEditItemField'

type Props = {
  title: string
  renameItem: (title: string) => Promise<unknown>
  toggleEditMode: (toggleValue: boolean) => void
}

export const EditItemField = memo(({ title, renameItem, toggleEditMode }: Props) => {
  const { newTitle, error, onTitleChanged, activateViewMode, onKeyPressed } = useEditItemField(
    title,
    toggleEditMode,
    renameItem
  )

  return (
    <TextField
      variant={'standard'}
      size={'small'}
      value={newTitle}
      onChange={onTitleChanged}
      onBlur={activateViewMode}
      onKeyDown={onKeyPressed}
      autoFocus
      error={!!error}
      fullWidth
      helperText={error ? error : ''}
    />
  )
})

import React, { memo } from 'react'
import TextField from '@mui/material/TextField'
import { useEditItemField } from 'common/components/editItemField/lib/useEditItemField'

export const EditItemField = memo(({ title, renameItem, toggleEditMode }: EditableItemPropsType) => {
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
    />
  )
})

//types
export type EditableItemPropsType = {
  title: string
  renameItem: (title: string) => void
  toggleEditMode: (toggleValue: boolean) => void
}

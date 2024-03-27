import React, { memo } from 'react'
import { TextField } from '@mui/material'
import { useEditItemField } from 'common/components/editItemField/useEditItemField'

export type EditableItemPropsType = {
  title: string
  renameItem: (title: string) => void
  toggleEditMode: (toggleValue: boolean) => void
}

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

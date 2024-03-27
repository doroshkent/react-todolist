import { ChangeEvent, KeyboardEvent, useState } from 'react'

export const useEditItemField = (
  title: string,
  toggleEditMode: (value: boolean) => void,
  renameItem: (title: string) => void
) => {
  const [newTitle, setNewTitle] = useState(title)
  const [error, setError] = useState('')

  const activateViewMode = () => {
    if (newTitle.trim()) {
      toggleEditMode(false)
      renameItem(newTitle.trim())
    } else {
      setError('Input is required')
    }
  }

  const onKeyPressed = (e: KeyboardEvent) => {
    if (error) setError('')
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return {
    newTitle,
    error,
    onTitleChanged,
    activateViewMode,
    onKeyPressed,
  }
}

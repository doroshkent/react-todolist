import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { maxLengthError } from 'common/constants'

export const useEditItemField = (
  title: string,
  toggleEditMode: (value: boolean) => void,
  renameItem: (title: string) => Promise<unknown>
) => {
  const [newTitle, setNewTitle] = useState(title)
  const [error, setError] = useState('')

  const activateViewMode = () => {
    if (newTitle.trim()) {
      renameItem(newTitle.trim())
        .then(() => toggleEditMode(false))
        .catch((e) => {
          if (e.resultCode) setError(maxLengthError)
        })
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

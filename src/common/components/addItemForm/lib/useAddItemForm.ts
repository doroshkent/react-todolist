import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { maxLengthError, maxTodolistsCount } from 'common/constants'

export const useAddItemForm = (onItemAdded: (title: string) => Promise<unknown>) => {
  const [newItemTitle, setNewItemTitle] = useState('')
  const [error, setError] = useState('')

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value)
  }

  const onAddItem = () => {
    if (newItemTitle.trim()) {
      onItemAdded(newItemTitle.trim())
        .then(() => {
          setNewItemTitle('')
        })
        .catch((e) => {
          debugger
          if (e.resultCode) {
            e.messages[0].includes('Title') ? setError(maxLengthError) : setError(maxTodolistsCount)
          }
        })
    } else {
      setError('Input is required')
    }
  }

  const onEnterPress = (e: KeyboardEvent) => {
    if (error) {
      setError('')
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      onAddItem()
    }
  }
  return {
    newItemTitle,
    error,
    onChangeTitle,
    onEnterPress,
    onAddItem,
  }
}

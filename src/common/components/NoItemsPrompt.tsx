import React from 'react'
import { ItemType } from 'common/types'

export const NoItemsPrompt = ({ item }: { item: ItemType }) => {
  return (
    <p style={{ fontStyle: 'italic', opacity: '0.5', textAlign: 'center', marginBottom: '10px' }}>
      You have no {item}s yet
    </p>
  )
}

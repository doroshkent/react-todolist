import { ItemsType } from 'app/App'
import React from 'react'

export const NoItemsPrompt = ({ item }: { item: ItemsType }) => {
  return <p style={{ fontStyle: 'italic', opacity: '0.5', textAlign: 'center' }}>You have no {item}s yet</p>
}

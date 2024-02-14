import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export const useAddItemForm = (onItemAdded: (title: string) => void) => {
  const [ newItemTitle, setNewItemTitle ] = useState( "" );
  const [ error, setError ] = useState( "" );

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle( e.currentTarget.value )
  }

  const onAddItem = () => {
    if (newItemTitle.trim()) {
      onItemAdded( newItemTitle.trim() );
      setNewItemTitle( "" );
    } else {
      setError( "Input is required" );
    }
  };

  const onEnterPress = (e: KeyboardEvent) => {
    if (error) {
      setError( "" );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onAddItem();
    }
  };
  return {
    newItemTitle,
    error,
    onTitleChange,
    onEnterPress,
    onAddItem
  }
}

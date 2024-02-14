import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { EditableItemPropsType } from "components/editItemField/EditItemField";

export const useEditItemField = ({ title, renameItem, toggleEditMode }: EditableItemPropsType) => {
  const [ newTitle, setNewTitle ] = useState( title );
  const [ error, setError ] = useState( "" );

  const activateViewMode = () => {
    if (newTitle.trim()) {
      toggleEditMode( false );
      renameItem( newTitle.trim() );
    } else {
      setError( "Input is required" );
    }
  };

  const onEnterPressed = (e: KeyboardEvent) => {
    setError( "" );
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle( e.currentTarget.value );
  };

  return {
    newTitle,
    error,
    onTitleChanged,
    activateViewMode,
    onEnterPressed
  }
}

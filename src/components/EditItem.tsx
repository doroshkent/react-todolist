import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@mui/material";

interface EditableItemPropsType {
  title: string;
  renameItem: (title: string) => void;
  toggleEditMode: (toggleValue: boolean) => void;
}

//TODO fix bug with extra large words (css)

export function EditItem({
                           title,
                           renameItem,
                           toggleEditMode,
                         }: EditableItemPropsType) {
  const [ newTitle, setNewTitle ] = useState( title );
  const [ error, setError ] = useState<string | null>( null );

  const activateViewMode = () => {
    if (newTitle.trim()) {
      toggleEditMode( false );
      renameItem( newTitle.trim() );
    } else {
      setError( "Input is required" );
    }
  };

  const onEnterPressHandler = (e: KeyboardEvent) => {
    setError( null );
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle( e.currentTarget.value );
  };

  return (
    <>
      <TextField
        variant={ "standard" }
        size={ "small" }
        value={ newTitle }
        onChange={ onChangeTitleHandler }
        onBlur={ activateViewMode }
        onKeyDown={ onEnterPressHandler }
        autoFocus
        error={ !!error }
        fullWidth
      />
    </>
  );
}

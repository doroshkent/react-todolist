import React, { memo } from "react";
import { TextField } from "@mui/material";
import { useEditItemField } from "components/editItemField/hooks/useEditItemField";

export type EditableItemPropsType = {
  title: string;
  renameItem: (title: string) => void;
  toggleEditMode: (toggleValue: boolean) => void;
}

//TODO fix bug with extra large words (css)

export const EditItemField = memo( ({ title, renameItem, toggleEditMode }: EditableItemPropsType) => {
  const {
    newTitle,
    error,
    onTitleChanged,
    activateViewMode,
    onEnterPressed
  } = useEditItemField( title, toggleEditMode, renameItem );

  return (
    <TextField
      variant={ "standard" }
      size={ "small" }
      value={ newTitle }
      onChange={ onTitleChanged }
      onBlur={ activateViewMode }
      onKeyDown={ onEnterPressed }
      autoFocus
      error={ !!error }
      fullWidth
    />
  );
} )

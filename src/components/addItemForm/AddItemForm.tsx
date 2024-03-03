import React, { memo } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { ItemsType } from "app/App";
import AddIcon from "@mui/icons-material/Add";
import { useAddItemForm } from "components/addItemForm/useAddItemForm";

type AddItemFormPropsType = {
  addItem: (title: string) => void
  item: ItemsType
  disabled?: boolean
};

export const AddItemForm = memo( ({ addItem, item, disabled = false }: AddItemFormPropsType) => {
  const {
    newItemTitle,
    error,
    onTitleChange,
    onEnterPress,
    onAddItem
  } = useAddItemForm( addItem );

  return (
    <Grid container alignItems={ "center" }>
      <Grid item sx={ { position: "relative" } }>
        <TextField
          fullWidth
          multiline
          maxRows={ 4 }
          variant={ "outlined" }
          size={ "small" }
          label={ error ? error : `New ${ item }` }
          margin={ "normal" }
          color={ item === "task" ? "primary" : "secondary" }
          error={ !!error }
          value={ newItemTitle }
          onChange={ onTitleChange }
          onKeyDown={ onEnterPress }
          disabled={ disabled }
        />
        <IconButton sx={ { position: "absolute", top: "19%" } }
                    onClick={ onAddItem }
                    disabled={ !newItemTitle || disabled }>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
} )

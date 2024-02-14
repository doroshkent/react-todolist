import React, { memo } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { ItemsType } from "App";
import AddIcon from "@mui/icons-material/Add";
import { useAddItemForm } from "components/addItemForm/hooks/useAddItemForm";

type AddItemFormProps = {
  addItem: (title: string) => void;
  item: ItemsType;
};

export const AddItemForm = memo( ({ addItem, item }: AddItemFormProps) => {
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
        />
        <IconButton sx={ { position: "absolute", top: "19%" } }
                    onClick={ onAddItem }
                    disabled={ !newItemTitle }>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
} )

import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { ItemsType } from "App";
import AddIcon from "@mui/icons-material/Add";

type AddItemFormProps = {
  addItem: (title: string) => void;
  item: ItemsType;
};

export const AddItemForm = memo( ({ addItem, item }: AddItemFormProps) => {
  console.log( "add item form render" )
  const [ newItemTitle, setNewItemTitle ] = useState<string>( "" );
  const [ error, setError ] = useState<string | null>( null );

  const onSetNewItemTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemTitle( e.currentTarget.value );

  const onAddItemHandler = () => {
    if (newItemTitle.trim()) {
      addItem( newItemTitle.trim() );
      setNewItemTitle( "" );
    } else {
      setError( "Input is required" );
    }
  };

  const onEnterPressHandler = (e: KeyboardEvent) => {
    setError( null );
    if (e.key === "Enter") {
      e.preventDefault();
      onAddItemHandler();
    }
  };
  return (
    <Grid container alignItems={ "center" }>
      <Grid item sx={ { position: "relative" } }>
        <TextField
          fullWidth
          multiline
          maxRows={ 4 }
          variant={ "outlined" }
          size={ "small" }
          label={ `New ${ item }` }
          margin={ "normal" }
          color={ item === "task" ? "primary" : "secondary" }
          error={ !!error }
          helperText={ error ? error : " " }
          value={ newItemTitle }
          onChange={ onSetNewItemTitle }
          onKeyDown={ onEnterPressHandler }
        />
        <Tooltip title={ "Add" } arrow>
          <IconButton
            sx={ {
              position: "absolute",
              top: "19%",
            } }
            onClick={ onAddItemHandler }
            disabled={ !newItemTitle }
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
} )

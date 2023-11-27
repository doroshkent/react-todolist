import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Grid, IconButton, TextField, Tooltip} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {ItemsType} from "../App";

type AddItemFormProps = {
  addItem: (title: string) => void;
  item: ItemsType;
};

export function AddItemForm({addItem, item}: AddItemFormProps) {
  const [newItemTitle, setNewItemTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onSetNewItemTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemTitle(e.currentTarget.value);

  const onAddItemHandler = () => {
    if (newItemTitle.trim()) {
      addItem(newItemTitle.trim());
      setNewItemTitle("");
    } else {
      setError("Input is required");
    }
  };

  const onEnterPressHandler = (e: KeyboardEvent) => {
    setError(null);
    if (e.key === "Enter") {
      onAddItemHandler();
    }
  };
  return (
    <Grid container alignItems={"center"}>
      <Grid item sx={{ position: 'relative' }}>
        <TextField
          variant={"outlined"}
          sx={{marginLeft: "10px"}}
          size={"small"}
          label={`New ${item}`}
          margin={"normal"}
          color={item === "task" ? "primary" : "secondary"}
          error={!!error}
          helperText={error ? error : " "}
          value={newItemTitle}
          onChange={onSetNewItemTitle}
          onKeyDown={onEnterPressHandler}
        />
        <Tooltip title={"Add"} arrow>
          <IconButton sx={{
            position: 'absolute',
            top: '19%',
             // Adjust this value for horizontal positioning
          }}
            onClick={onAddItemHandler} disabled={!newItemTitle}>
            <ControlPointIcon/>
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

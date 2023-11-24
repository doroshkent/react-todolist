import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "../styles/common/Input";
import { ErrorMessage } from "../styles/common/ErrorMessage";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

export function AddItemForm({ addItem }: AddItemFormProps) {
  const [newItemTitle, setNewItemTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onSetNewItemTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewItemTitle(e.currentTarget.value);

  const onAddTaskHandler = () => {
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
      onAddTaskHandler();
    }
  };
  return (
    <>
      <Input
        type="text"
        value={newItemTitle}
        onChange={onSetNewItemTitle}
        onKeyDown={onEnterPressHandler}
        $error={error}
      />
      <button onClick={onAddTaskHandler}>+</button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

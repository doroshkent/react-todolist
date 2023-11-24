import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "styles/common/Input";
import { ErrorMessage } from "../styles/common/ErrorMessage";

interface EditableSpanPropsType {
  title: string;
  renameItem: (title: string) => void;
}

export function EditableSpan({ title, renameItem }: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(title);
  };
  const activateViewMode = () => {
    if (newTitle.trim()) {
      setEditMode(false);
      renameItem(newTitle.trim());
    } else {
      setError("Input is required");
    }
  };

  const onEnterPressHandler = (e: KeyboardEvent) => {
    setError(null);
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return editMode ? (
    <>
      <Input
        value={newTitle}
        onChange={onChangeTitleHandler}
        onBlur={activateViewMode}
        onKeyDown={onEnterPressHandler}
        autoFocus
        $error={error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
}

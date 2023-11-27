import React, { ChangeEvent, KeyboardEvent, useState } from "react";

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
      <input
        value={newTitle}
        onChange={onChangeTitleHandler}
        onBlur={activateViewMode}
        onKeyDown={onEnterPressHandler}
        autoFocus
      />
      {error && <div>{error}</div>}
    </>
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
}

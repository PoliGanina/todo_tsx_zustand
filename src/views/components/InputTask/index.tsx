import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
  key: string;
  id: string;
  title: string;
  onDone: (title: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const [done, setDone] = useState(false);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editMode && editTitleInputRef?.current?.focus();
  }, [editMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          disabled={editMode}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        {editMode ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              onEdited(id, value);
              setEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setEditMode(false);
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>
            {title.indexOf(" ") > -1 ? title : title.slice(0, 10) + "..."}
          </h3>
        )}
      </label>
      {editMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            setEditMode(false);
            onEdited(id, title);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setEditMode(true);
          }}
        />
      )}

      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure you want to delete this item?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};

export default InputTask;

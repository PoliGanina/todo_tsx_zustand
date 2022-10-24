import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const addTaks = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        className={styles.inputPlusValue}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && addTaks();
        }}
        placeholder="Type here..."
      />
      <button
        className={styles.inputPlusButton}
        onClick={addTaks}
        aria-label="Add"
      />
    </div>
  );
};
export default InputPlus;

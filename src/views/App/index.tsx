import React from "react";
import styles from "./index.module.scss";

import { useToDoStore } from "../../data/stores/useToDoStore";
import InputPlus from "../components/InputPlus";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import InputTask from "../components/InputTask";

const App: React.FC = () => {
  const [tasks, createTask, removeTask, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask,
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>to Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <ErrorBoundary>
        <section className={styles.articleSection}>
          {!tasks.length && (
            <p className={styles.articleText}>No tasks yet...</p>
          )}
          {tasks.map(({ id, title }) => (
            <InputTask
              key={id}
              title={title}
              id={id}
              onDone={removeTask}
              onEdited={updateTask}
              onRemoved={removeTask}
            />
          ))}
        </section>
      </ErrorBoundary>
    </article>
  );
};

export default App;

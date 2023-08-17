import { useState } from "react";
import { Trash } from "phosphor-react";

import styles from "./Task.module.css";

import finishedTaskIcon from "../assets/radio-button-selected.svg";
import finishedTaskIconWithHover from "../assets/radio-button-selected-with-hover.svg";
import unfinishedTaskIcon from "../assets/radio-button-not-selected.svg";
import unfinishedTaskIconWithHover from "../assets/radio-button-not-selected-with-hover.svg";

export interface TaskType {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: TaskType;
  onTaskStatus: (id: string) => void;
  onTaskDeletion: (id: string) => void;
}

export function Task({ task, onTaskStatus, onTaskDeletion }: TaskProps) {
  const { id, description, isCompleted } = task;
  const [variationOfFinishedTaskIcon, setVariationOfFinishedTaskIcon] =
    useState(finishedTaskIcon);
  const [variationOfUnfinishedTaskIcon, setVariationOfUnfinishedTaskIcon] =
    useState(unfinishedTaskIcon);

  function handleTaskStatus() {
    onTaskStatus(id);
  }

  function handleTaskDeletion() {
    onTaskDeletion(id);
  }

  return (
    <div className={styles.task}>
      {isCompleted ? (
        <button
          className={styles.statusButton}
          title="Mudar status da tarefa"
          onMouseLeave={() => setVariationOfFinishedTaskIcon(finishedTaskIcon)}
          onMouseEnter={() =>
            setVariationOfFinishedTaskIcon(finishedTaskIconWithHover)
          }
          onClick={handleTaskStatus}
        >
          {/* <CheckCircle size={24} color="#8284fa" weight="fill" /> */}
          <img
            src={variationOfFinishedTaskIcon}
            alt="Botão de status da tarefa"
          />
        </button>
      ) : (
        <button
          className={styles.statusButton}
          title="Mudar status da tarefa"
          onMouseLeave={() =>
            setVariationOfUnfinishedTaskIcon(unfinishedTaskIcon)
          }
          onMouseEnter={() =>
            setVariationOfUnfinishedTaskIcon(unfinishedTaskIconWithHover)
          }
          onClick={handleTaskStatus}
        >
          {/* <Circle size={24} color="#4ea8de" /> */}
          <img
            src={variationOfUnfinishedTaskIcon}
            alt="Botão de status da tarefa"
          />
        </button>
      )}
      <p className={isCompleted ? styles.finishedTask : ""}>{description}</p>
      <button
        className={styles.deleteButton}
        title="Excluir tarefa"
        onClick={handleTaskDeletion}
      >
        <Trash size={24} />
      </button>
    </div>
  );
}

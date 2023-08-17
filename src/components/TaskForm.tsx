import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onSaveNewTask: (newTask: string) => void;
}

export function TaskForm({ onSaveNewTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState("");
  const isNewTaskEmpty = newTask.trim() === "";

  function handleTaskCreation(event: FormEvent) {
    event.preventDefault();
    onSaveNewTask(newTask);
    setNewTask("");
  }

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    handleInvalidTask(event);
    setNewTask(event.target.value);
  }

  function handleInvalidTask(event: InvalidEvent<HTMLInputElement>) {
    // if (isNewTaskEmpty) {
    //   event.target.setCustomValidity("Este campo é obrigatório");
    // } else {
    //   event.target.setCustomValidity("");
    // }
    isNewTaskEmpty
      ? event.target.setCustomValidity("Este campo é obrigatório")
      : event.target.setCustomValidity("");
  }

  return (
    <div className={styles.taskForm}>
      <form onSubmit={handleTaskCreation}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          name="task"
          value={newTask}
          onChange={handleTaskChange}
          onInvalid={handleInvalidTask}
          required
        />
        {/* Retire a propriedade disabled={isNewTaskEmpty} para ver handleInvalidTask em ação */}
        <button type="submit" disabled={isNewTaskEmpty}> 
          <span>
            Criar <PlusCircle size={16} />
          </span>
        </button>
      </form>
    </div>
  );
}

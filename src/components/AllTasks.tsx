import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";

import styles from "./AllTasks.module.css";
import clipboard from "../assets/clipboard.png";

const sampleTasks = [
  {
    id: uuidv4(),
    description: "Enviar uma atualização por e-mail para a equipe: 9h de hoje.",
    isCompleted: true,
  },
  {
    id: uuidv4(),
    description:
      "Ligar para a agência de design para finalizar os mockups: 13h de hoje.",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    description: "Contatar os recrutadores sobre a nova função: terça-feira.",
    isCompleted: false,
  },
];

export function AllTasks() {
  const [tasks, setTasks] = useState(sampleTasks);

  function saveNewTask(task: string) {
    const newTask = {
      id: uuidv4(),
      description: task,
      isCompleted: false,
    };
    setTasks([newTask, ...tasks]);
  }

  function changeTaskStatus(id: string) {
    // const updatedTaskList = tasks.map((task) => {
    //   if (task.id === id) {
    //     task.isCompleted = !task.isCompleted;
    //   }
    //   return task;
    // });
    const updatedTaskList = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTaskList);
  }

  function deleteTask(id: string) {
    const updatedTaskList = tasks.filter((task) => task.id !== id);
    setTasks(updatedTaskList);
  }

  function countCreatedTasks() {
    return tasks.length;
  }

  function countCompletedTasks() {
    return tasks.reduce(
      (completedTasks, task) =>
        task.isCompleted ? completedTasks + 1 : completedTasks,
      0
    );
  }

  return (
    <>
      <TaskForm onSaveNewTask={saveNewTask} />
      <div className={styles.allTasks}>
        <header>
          <div className={styles.createdTaskCounter}>
            Tarefas criadas <span>{countCreatedTasks()}</span>
          </div>
          <div className={styles.finishedTaskCounter}>
            Concluídas{" "}
            <span>
              {countCompletedTasks()} de {countCreatedTasks()}
            </span>
          </div>
        </header>
        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onTaskStatus={changeTaskStatus}
                  onTaskDeletion={deleteTask}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyTaskList}>
            <img src={clipboard} alt="prancheta" />
            <div className={styles.emptyTaskListMessage}>
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

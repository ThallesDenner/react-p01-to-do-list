import styles from "./Header.module.css";

import toDoListLogo from "../assets/to-do-list-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={toDoListLogo} alt="Logo da lista de tarefas" />
    </header>
  );
}

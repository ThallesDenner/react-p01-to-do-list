import { AllTasks } from "./components/AllTasks";
import { Header } from "./components/Header";

import styles from "./App.module.css";
import "./global.css";

export function App() {
  return (
    <div>
      <Header />
      <main className={styles.taskContainer}>
        <AllTasks />
      </main>
    </div>
  );
}

import { FC } from "react";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";

import styles from "./App.module.css";

export const App: FC = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Main />
    </div>
  );
};

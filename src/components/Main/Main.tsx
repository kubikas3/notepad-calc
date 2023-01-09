import { useNoteData } from "../../hooks/useNoteData";
import { TabPanel } from "../TabPanel/TabPanel";
import styles from "./Main.module.css";

export const Main = () => {
  const { index, notes } = useNoteData();

  return (
    <main className={styles.root}>
      {notes.map((_, i) => (
        <TabPanel key={`tabpanel-${i}`} index={i} value={index} />
      ))}
    </main>
  );
};

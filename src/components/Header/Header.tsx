import AddIcon from "@mui/icons-material/Add";
import { AppBar, IconButton } from "@mui/material";
import { FC } from "react";
import { useNoteData } from "../../hooks/useNoteData";
import { TabList } from "../TabList/TabList";

import styles from "./Header.module.css";

export const Header: FC = () => {
  const { notes, setIndex, setNotes } = useNoteData();

  const handleAddClick = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: notes.length,
        name: `Be pavadinimo ${prevState.length + 1}`,
        content: "",
      },
    ]);
    setIndex(notes.length);
  };

  return (
    <AppBar className={styles.root} color="transparent" position="static">
      <TabList />
      <IconButton className={styles.addButton} onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
    </AppBar>
  );
};

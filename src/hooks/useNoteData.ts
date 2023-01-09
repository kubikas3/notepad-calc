import { useContext } from "react";
import { NoteDataContext } from "../contexts/NoteData/NoteDataContext";

export const useNoteData = () => {
  const state = useContext(NoteDataContext);

  if (!state) {
    throw new Error("NodeDataProvider is not present in the tree.");
  }

  return state;
};

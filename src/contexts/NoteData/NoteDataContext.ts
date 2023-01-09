import { createContext, Dispatch, SetStateAction } from "react";
import { Note } from "../../@types/Note";

type NoteData = {
  notes: Note[];
  index: number;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  setIndex: Dispatch<SetStateAction<number>>;
};

export const NoteDataContext = createContext<NoteData | null>(null);

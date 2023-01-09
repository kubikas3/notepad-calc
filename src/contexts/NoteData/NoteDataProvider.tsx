import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Note } from "../../@types/Note";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { NoteDataContext } from "./NoteDataContext";

type NoteDataProviderProps = PropsWithChildren<{
  storageKey: string;
  initialIndex: number;
  initialNotes: Note[];
}>;

export const NoteDataProvider: FC<NoteDataProviderProps> = ({
  children,
  storageKey,
  initialIndex,
  initialNotes,
}) => {
  const [index, setIndex] = useState(initialIndex);
  const [notes, setNotes] = useLocalStorage(storageKey, initialNotes);
  const [tabs] = useLocalStorage<string[]>("tabs", []);

  useEffect(() => {
    if (tabs.length) {
      setNotes(
        tabs.map((tab, index) => ({
          id: index,
          name: `Be pavadinimo ${index + 1}`,
          content: tab,
        }))
      );
      localStorage.removeItem("tabs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoteDataContext.Provider value={{ index, notes, setIndex, setNotes }}>
      {children}
    </NoteDataContext.Provider>
  );
};

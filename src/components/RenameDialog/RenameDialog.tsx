import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useNoteData } from "../../hooks/useNoteData";

type RenameDialogProps = {
  noteId: number;
  open: boolean;
  onClose: () => void;
};

export const RenameDialog: FC<RenameDialogProps> = ({
  noteId,
  open,
  onClose,
}) => {
  const { notes, setNotes } = useNoteData();
  const [name, setName] = useState("");
  const note = notes.find((note) => note.id === noteId);
  const error = !note
    ? "Skaičiavimas neegzistuoja"
    : !name
    ? "Pavadinimas negali būti tuščias"
    : undefined;

  useEffect(() => {
    if (open) {
      note && setName(note.name);
    }
  }, [open, note]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotes((prevState) =>
      prevState.map((note) => (note.id === noteId ? { ...note, name } : note))
    );
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Pervadinti</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            required
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            type="text"
            margin="normal"
            variant="outlined"
            label="Naujas pavadinimas"
            value={name}
            disabled={!note}
            error={!!error}
            helperText={error}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Atšaukti</Button>
          <Button type="submit" variant="contained" disabled={!!error}>
            Pervadinti
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

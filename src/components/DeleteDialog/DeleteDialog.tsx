import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNoteData } from "../../hooks/useNoteData";

type DeleteDialogProps = {
  noteId: number;
  open: boolean;
  onClose: () => void;
};

export const DeleteDialog: FC<DeleteDialogProps> = ({
  noteId,
  open,
  onClose,
}) => {
  const { notes, setIndex, setNotes } = useNoteData();
  const note = notes.find((note) => note.id === noteId);

  const handleDeleteClick = () => {
    setNotes((prevState) => prevState.filter((note) => note.id !== noteId));
    setIndex((prevState) =>
      prevState === notes.length - 1 ? Math.max(0, notes.length - 2) : prevState
    );
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Ištrinti</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ar tikrai norite ištrinti skaičiavimą {note?.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Atšaukti
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteClick}>
          Ištrinti
        </Button>
      </DialogActions>
    </Dialog>
  );
};

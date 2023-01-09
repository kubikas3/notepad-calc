import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tabs,
} from "@mui/material";
import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNoteData } from "../../hooks/useNoteData";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";
import { RenameDialog } from "../RenameDialog/RenameDialog";
import { Tab } from "../Tab/Tab";

import styles from "./TabList.module.css";

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

export const TabList: FC = () => {
  const { index, notes, setIndex } = useNoteData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState(-1);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleRenameDialogClose = () => {
    setRenameDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleRenameClick = () => {
    setMenuOpen(false);
    setRenameDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleTabChange = useCallback(
    (_: ChangeEvent<{}>, index: number) => {
      setIndex(index);
    },
    [setIndex]
  );

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLDivElement>, noteId: number) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      setMenuOpen(true);
      setSelectedNoteId(noteId);
    },
    []
  );

  useEffect(() => {
    if (notes.length) {
      document.title = notes[index].name;
    } else {
      document.title = "Notepad Calc";
    }
  }, [notes, index]);

  const tabs = notes.map(({ id, name }) => (
    <Tab
      key={`tab-${id}`}
      noteId={id}
      name={name}
      onContextMenu={handleContextMenu}
      {...a11yProps(index)}
    />
  ));

  return (
    <>
      <RenameDialog
        noteId={selectedNoteId}
        open={renameDialogOpen}
        onClose={handleRenameDialogClose}
      />
      <DeleteDialog
        noteId={selectedNoteId}
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      />
      <Menu
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        PaperProps={{ className: styles.menu }}
      >
        <MenuItem onClick={handleRenameClick}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Pervadinti</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Ištrinti</ListItemText>
        </MenuItem>
      </Menu>
      <Tabs
        className={styles.tabs}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="tab list"
        value={index}
        onChange={handleTabChange}
      >
        {tabs}
      </Tabs>
    </>
  );
};

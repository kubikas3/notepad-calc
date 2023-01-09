import { Tab as MuiTab } from "@mui/material";
import { ComponentProps, memo, MouseEvent } from "react";

type TabProps = {
  noteId: number;
  name: string;
  onContextMenu: (event: MouseEvent<HTMLDivElement>, noteId: number) => void;
} & Omit<ComponentProps<typeof MuiTab>, "label" | "onContextMenu">;

export const Tab = memo<TabProps>(
  ({ noteId, name, onContextMenu, ...props }) => {
    const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
      onContextMenu(event, noteId);
    };

    return <MuiTab label={name} onContextMenu={handleContextMenu} {...props} />;
  }
);

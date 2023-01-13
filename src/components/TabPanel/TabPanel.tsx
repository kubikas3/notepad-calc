import { TextField } from "@mui/material";
import { ChangeEvent, FC, UIEvent, useEffect, useRef } from "react";
import { useNoteData } from "../../hooks/useNoteData";
import { BigMath } from "../../services/BigMath";

import styles from "./TabPanel.module.css";

const LINE_BREAK_REGEX = /\r?\n/;

const handleScrollEnd = (
  sender: EventTarget & HTMLTextAreaElement,
  target: HTMLTextAreaElement | null
) => {
  if (target) {
    const scrollLeftMax = target.scrollWidth - target.clientWidth;
    const scrollTopMax = target.scrollHeight - target.clientHeight;
    target.scrollTo(
      Math.min(sender.scrollLeft, scrollLeftMax),
      Math.min(sender.scrollTop, scrollTopMax)
    );
  }
};

type TabPanelProps = {
  index: number;
  value: number;
};

export const TabPanel: FC<TabPanelProps> = ({ index, value }) => {
  const { notes, setNotes } = useNoteData();
  const note = notes[index];
  const math = useRef(new BigMath());
  const timeoutRef = useRef<number>(0);
  const inputFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const outputFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const scope = {};
  const visible = value === index;

  useEffect(() => {
    if (visible && inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
  }, [index, value, visible]);

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes((prevState) =>
      prevState.map((item) =>
        item === note ? { ...item, content: target.value } : item
      )
    );
  };

  const handleInputScroll = ({
    currentTarget,
  }: UIEvent<HTMLTextAreaElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    }

    timeoutRef.current = setTimeout(
      handleScrollEnd,
      0,
      currentTarget,
      outputFieldRef.current
    );
  };

  const handleOutputScroll = ({
    currentTarget,
  }: UIEvent<HTMLTextAreaElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
    }

    timeoutRef.current = setTimeout(
      handleScrollEnd,
      0,
      currentTarget,
      inputFieldRef.current
    );
  };

  const mapLine = (line: string) => {
    const trimmedLine = line.trim();
    const [expression, comment] = line.split("'").map((str) => str.trim());

    if (expression.length) {
      const answer = math.current.evaluate(expression, scope);

      return `${expression} = ${answer} ${comment ?? ""}`;
    }

    return trimmedLine;
  };

  const answers = note.content.split(LINE_BREAK_REGEX).map(mapLine).join("\n");

  return (
    <div
      className={styles.root}
      role="tabpanel"
      hidden={!visible}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      <TextField
        autoFocus
        multiline
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className={styles.textField}
        label="Skaičiavimai"
        variant="outlined"
        placeholder="x = 5..."
        value={note.content}
        onChange={handleChange}
        inputRef={inputFieldRef}
        InputProps={{
          className: `${styles.textFieldInputWrapper} ${styles.inputFieldWrapper}`,
        }}
        inputProps={{
          className: styles.textFieldInput,
          onScroll: handleInputScroll,
        }}
      />
      <TextField
        multiline
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className={styles.textField}
        label="Atsakymai"
        variant="outlined"
        value={answers}
        inputRef={outputFieldRef}
        InputProps={{
          className: `${styles.textFieldInputWrapper} ${styles.outputFieldWrapper}`,
        }}
        inputProps={{
          className: styles.textFieldInput,
          onScroll: handleOutputScroll,
          readOnly: true,
        }}
      />
    </div>
  );
};

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { NoteDataProvider } from "./contexts/NoteData/NoteDataProvider";
import { Note } from "./@types/Note";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

const initialNotes: Note[] = [{ id: 0, name: "Be pavadinimo 1", content: "" }];
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <NoteDataProvider
        storageKey="notes"
        initialIndex={0}
        initialNotes={initialNotes}
      >
        <App />
      </NoteDataProvider>
    </StyledEngineProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

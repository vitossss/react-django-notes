import "./App.css";

import { useState, useEffect } from "react";
import { NoteAPI } from "./api/api";

import NoteList from "./components/notes/NoteList";
import NotePage from "./components/notes/NotePage";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  const history = useNavigate();

  useEffect(() => {
    getAllNotes();
  }, []);

  async function getAllNotes() {
    const response = await NoteAPI.getNotes(); // get all notes from db
    setNotes(response.data.map(note => ({...note, isPinned: false})));
  }

  async function createOneNote() {
    await NoteAPI.createNote(note, getAllNotes);
    history("/");
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/notes/:id"
          element={
            <NotePage
              note={note}
              setNote={setNote}
              getAllNotes={getAllNotes}
              createOneNote={createOneNote}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

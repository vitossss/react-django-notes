import React from "react";

import classes from "./styles/NotePage.module.css";
import btnBack from "../../assets/images/arrow-left-green.png";

import { NoteAPI } from "../../api/api";

import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const NotePage = ({ note, setNote, createOneNote, getAllNotes }) => {
  const params = useParams();
  const noteId = params.id;

  const history = useNavigate();

  useEffect(() => {
    getOneNote();
  }, [noteId]);

  async function getOneNote() {
    const response = await NoteAPI.getNote(noteId);
    setNote(response.data);
  }

  async function deleteOneNote() {
    await NoteAPI.deleteNote(noteId, getAllNotes);
    history("/");
  }

  async function updateOneNote() {
    await NoteAPI.updateNote(noteId, note, getAllNotes);
    history("/");
  }

  const checkCreate = () => {
    if (noteId === "new" && note.body !== "") {
      console.log("Created!");
      createOneNote();
    }
  };

  const checkUpdate = () => {
    if (noteId !== "new" && note.body !== "") {
      console.log("Updated!");
      updateOneNote();
    } else if (noteId !== "new" && note.body === "") {
      console.log("Deleted!");
      deleteOneNote();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.btn__update_section}>
        <Link onClick={checkUpdate} to="/">
          <button className={classes.btn__update}>
            <img src={btnBack} alt="btnBack" />
          </button>
        </Link>
      </div>
      <textarea
        className={classes.note__field}
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        cols="50"
        rows="19"
        value={note?.body}
      ></textarea>
      <div className={classes.btn__section}>
        <Link to="/">
          <button className={classes.btn__cancel}>Cancel</button>
        </Link>
        {noteId !== "new" ? (
          <button className={classes.btn__delete} onClick={deleteOneNote}>
            Delete
          </button>
        ) : (
          <button className={classes.btn__create} onClick={checkCreate}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default NotePage;

import React from "react";

import classes from "./styles/NoteList.module.css";
import Header from "../header/Header";

import { Link } from "react-router-dom";

import addNote from "../../assets/images/add-note.svg";

const NoteList = ({ notes }) => {
  const getTitle = (note) => {
    const title = note.body.split('\n')[0]
    if (title.length > 45) {
      return title.slice(0, 45)
    }
    return title
  };

  const getDate = (note) => {
    return new Date(note.update).toLocaleDateString()
  }

  return (
    <>
      <Header notes={notes} />
      <div className={classes.wrapper__list}>
        <div className={classes.notes__list}>
          {notes.map((note) => (
            <div className={classes.note} key={note.id}>
              <Link to={"/notes/" + note.id}>
                <pre>{getTitle(note)}</pre>
                <div className={classes.date__format}><span>{getDate(note)}</span></div>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Link to="/notes/new">
            <button className={classes.btn__add}>
              <img src={addNote} alt="addNote" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoteList;

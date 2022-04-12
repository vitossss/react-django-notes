import React from "react";
import { useState, useEffect } from "react";

import classes from "./styles/NoteList.module.css";
import Header from "../header/Header";

import { Link } from "react-router-dom";

import addNote from "../../assets/images/add-note.svg";
import thumbtack from "../../assets/images/thumbtack-solid-white.png";

import { getTitle } from "../utils/title";
import { getDate } from "../utils/date";
import { sortPinned } from "../utils/sort";

const NoteList = ({ notes }) => {
  const [pinNote, setPinNote] = useState([]);

  return (
    <>
      <Header notes={notes} />
      <div className={classes.wrapper__list}>
        <div className={classes.notes__list}>
          {pinNote
            ? pinNote.map((pinn) => (
                <div className={classes.note} key={pinn.id}>
                  <Link to={"/notes/" + pinn.id}>
                    <pre>{getTitle(pinn)}</pre>
                    <div className={classes.date__format}>
                      <span>{getDate(pinn)}</span>
                    </div>
                  </Link>
                </div>
              ))
            : null}
          {notes.map((note) => (
            <div className={classes.note} key={note.id}>
              <Link to={"/notes/" + note.id}>
                <pre>{getTitle(note)}</pre>
                <div className={classes.date__format}>
                  <span>{getDate(note)}</span>
                </div>
              </Link>
              <div className={classes.btn__pin_section}>
                <button
                  className={classes.btn__pin}
                  onClick={() => {
                    setPinNote(note);
                  }}
                >
                  <img src={thumbtack} alt="thumbtack" />
                </button>
              </div>
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

import React from "react";

import classes from './header.module.css'

const Header = ({ notes }) => {
  return (
    <div>
      <header className={classes.notes}>
        <div className={classes.notes__header}>
          <h2>Notes</h2>
        </div>
        <div className={classes.notes__counter}><span>{notes.length}</span></div>
      </header>
    </div>
  );
};

export default Header;

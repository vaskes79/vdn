import React, { useEffect, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import Controls from './Controls';
import { DBContext } from 'db';

const Notes = ({ classes }) => {
  const [notes, setNotes] = useState([]);
  const db = useContext(DBContext);

  const getNotes = async () => {
    try {
      const notes = await db.getNoteList();
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  // db.addNote('some url', 'some 2 text', 1123);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Controls />
      <AddNoteForm />
      <NoteList notes={notes} />
    </div>
  );
};

Notes.propTypes = {};

Notes.defaultProps = {};

export default withStyles(styles)(Notes);

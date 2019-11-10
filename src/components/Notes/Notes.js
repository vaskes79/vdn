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
  let updateNotes = [];
  const [notes, setNotes] = useState(updateNotes);
  const db = useContext(DBContext);

  const getNotes = async () => {
    try {
      updateNotes = await db.getNoteList();
      setNotes(updateNotes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateNotes]);

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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import styles from './styles';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import Controls from './Controls';
import { withDBContext } from 'db';

const Notes = ({ classes, db }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const notes = await db.getNoteList();
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotes();
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

export default compose(
  withStyles(styles),
  withDBContext
)(Notes);

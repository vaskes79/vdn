import React, { useEffect, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import Controls from './Controls';
import { DBContext } from 'components/db';

const Notes = ({ classes, urlNotes = '' }) => {
  const [notes, setNotes] = useState([]);
  const { getNoteList } = useContext(DBContext);

  useEffect(() => {
    const getNotes = async () => {
      let updateNotes = await getNoteList(urlNotes);
      setNotes(updateNotes);
    };
    getNotes();
  }, [getNoteList, notes, setNotes, urlNotes]);

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

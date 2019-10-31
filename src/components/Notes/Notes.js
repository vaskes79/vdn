import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import Controls from './Controls';

const Notes = ({ classes, notes }) => (
  <div className={classes.root}>
    <Controls />
    <AddNoteForm />
    <NoteList notes={notes} />
  </div>
);

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

Notes.defaultProps = {};

export default withStyles(styles)(Notes);

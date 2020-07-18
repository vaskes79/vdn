import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';
import Controls from './Controls';
import { VdnAppContext } from 'components/VdnApp';

const Notes = ({ classes }) => {
  const { notes } = useContext(VdnAppContext);

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

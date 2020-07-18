import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { VdnAppContext } from 'components/VdnApp';

import styles from './styles';
import NoteItem from './NoteItem';

const NoteList = ({ classes, notes }) => {
  return (
    <div className={classes.noteList}>
      <List component="nav" aria-label="navigation by video notes">
        {notes.map(note => (
          <Fragment key={note.id}>
            <NoteItem note={note} />
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(NoteList);

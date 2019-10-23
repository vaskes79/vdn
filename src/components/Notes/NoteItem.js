import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import styles from './styles';
import { formatTime } from 'components/utils';

const NoteItem = ({ classes, note: { id, title, time } }) => (
  <ListItem
    button
    // selected={selectedIndex === 2}
    dense
    onClick={event => console.log(event.target)}
  >
    <ListItemText className={classes.title} primary={formatTime(time)} secondary={title} />
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete">
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default withStyles(styles)(NoteItem);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import styles from './styles';

const msToTime = duration => {
  var ms = parseInt(duration * 1000),
    s = parseInt((ms / 1000) % 60),
    m = parseInt((ms / (1000 * 60)) % 60),
    h = parseInt((ms / (1000 * 60 * 60)) % 24);

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  return h + ':' + m + ':' + s;
};

const NoteItem = ({ classes, note: { id, title, time } }) => (
  <ListItem
    button
    // selected={selectedIndex === 2}
    onClick={event => console.log(event.target)}
  >
    <ListItemText className={classes.title} primary={msToTime(time)} secondary={title} />
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

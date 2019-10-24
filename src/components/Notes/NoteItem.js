import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import styles from './styles';
import { formatTime } from 'components/utils';
import { Confirm as DeleteConfirm } from 'components/Dialog';

const NoteItem = ({ classes, note: { id, title, time } }) => {
  const fTime = formatTime(time);
  return (
    <ListItem
      button
      // selected={selectedIndex === 2}
      dense
      onClick={event => console.log(event.target)}
    >
      <ListItemText className={classes.title} primary={fTime} secondary={title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <EditIcon />
        </IconButton>
        <DeleteConfirm id={id} title={fTime} description={title} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(NoteItem);

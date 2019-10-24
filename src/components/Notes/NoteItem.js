import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import styles from './styles';
import { formatTime } from 'components/utils';
import { Confirm as DeleteConfirm, Edit } from 'components/Dialog';

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
        <Edit id={id} title={fTime} description={title} label={'Change Description Note'} />
        <DeleteConfirm id={id} title={fTime} description={title} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(NoteItem);

import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import styles from './styles';
import { formatTime } from 'components/utils';
import { Confirm as DeleteConfirm, Edit } from 'components/Dialog';
import { VdnAppContext } from 'components/VdnApp';

const NoteItem = ({ classes, note: { id, url, title, time } }) => {
  const fTime = formatTime(time);
  const { goToTime } = useContext(VdnAppContext);

  const onClickItem = () => {
    goToTime(time);
  };

  return (
    <ListItem
      button
      // selected={selectedIndex === 2}
      dense
      onClick={onClickItem}
    >
      <ListItemText className={classes.title} primary={fTime} secondary={title} />
      <ListItemSecondaryAction>
        <Edit
          url={url}
          id={id}
          title={title}
          description={fTime}
          note={true}
          label={'Change Description Note'}
        />
        <DeleteConfirm id={id} title={fTime} description={title} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(NoteItem);

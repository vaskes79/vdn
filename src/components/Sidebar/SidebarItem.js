import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import styles from './styles';
import { Confirm as DeleteConfirm, Edit } from 'components/Dialog';

const onClickItem = () => console.log('on click item action');

const SidebarItem = ({ classes, data: { url, id, title } }) => (
  <ListItem button className={classes.SidebarItem} onClick={onClickItem}>
    <ListItemText primary={title} />
    <ListItemSecondaryAction>
      <Edit id={id} title={url} description={title} label={'Change Title'} />
      <DeleteConfirm id={id} title={title} description={url} />
    </ListItemSecondaryAction>
  </ListItem>
);

export default withStyles(styles)(SidebarItem);

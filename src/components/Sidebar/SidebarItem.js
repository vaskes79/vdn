import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import styles from './styles';

const onEdit = () => console.log('edit action');
const onDelete = () => console.log('delete action');
const onClickItem = () => console.log('on click item action');

const SidebarItem = ({ classes, data: { src, id, title } }) => (
  <ListItem button className={classes.SidebarItem} onClick={onClickItem}>
    <ListItemText primary={title} />
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default withStyles(styles)(SidebarItem);

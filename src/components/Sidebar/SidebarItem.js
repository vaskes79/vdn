import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import styles from './styles';
import { Confirm as DeleteConfirm, Edit } from 'components/Dialog';
import { VdnAppContext } from 'components/VdnApp';
import { SidebarContext } from 'components/Sidebar';

const SidebarItem = ({ classes, data: { url, id, title } }) => {
  const {
    setUrlVideo,
    db: { setCurrentVideo }
  } = useContext(VdnAppContext);
  const sidebar = useContext(SidebarContext);

  const onClickItem = async () => {
    await setCurrentVideo(url);
    setUrlVideo(url);
    sidebar.openState(false);
  };

  return (
    <ListItem button className={classes.SidebarItem} onClick={onClickItem}>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <Edit id={url} url={url} title={title} video={true} label={'Change Title'} />
        <DeleteConfirm type={'video'} id={url} title={title} description={url} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(SidebarItem);

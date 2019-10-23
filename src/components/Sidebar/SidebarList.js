import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

import styles from './styles';
import SidebarItem from './SidebarItem';

const SidebarList = ({ classes, videoItems }) => (
  <List component="nav" className={classes.SidebarList} aria-label="navigation on added video">
    {videoItems.map(item => (
      <SidebarItem key={item.id} data={item} />
    ))}
  </List>
);

SidebarList.propTypes = {
  videoItems: PropTypes.array
};
SidebarList.defaultProps = {
  videoItems: []
};
export default withStyles(styles)(SidebarList);

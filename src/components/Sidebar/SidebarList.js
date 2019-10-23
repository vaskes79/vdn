import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const SidebarList = ({ classes, videoItems }) => (
  <nav className={classes.SidebarList} aria-label="navigation on added video">
    <code>{JSON.stringify(videoItems)}</code>
  </nav>
);

SidebarList.propTypes = {
  videoItems: PropTypes.array
};
SidebarList.defaultProps = {
  videoItems: []
};
export default withStyles(styles)(SidebarList);

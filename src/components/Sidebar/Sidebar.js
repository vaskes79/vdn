import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import styles from './styles';

const Sidebar = ({children, classes, open, onCloseSidebar}) => (
  <div className={classes.root}>
    <Drawer
      classes={{
        paper: classes.paper,
      }}
      open={open}
      onClose={onCloseSidebar}>
      {children}
    </Drawer>
  </div>
);

Sidebar.propTypes = {
  open: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

Sidebar.defaultProps = {
  open: false,
  onCloseSidebar: () => console.log('onCloseSidebar'),
};

export default withStyles(styles)(Sidebar);

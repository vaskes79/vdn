import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import Sidebar from 'components/Sidebar';
import { AddVideo } from 'components/Dialog';

const NavBar = ({ classes, title, onOpenAddVideo }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Sidebar />
        <Typography variant="h6" color="inherit" className={classes.title}>
          {title}
        </Typography>
        <AddVideo />
      </Toolbar>
    </AppBar>
  </div>
);

NavBar.propTypes = {
  title: PropTypes.string,
  onOpenSidebar: PropTypes.func,
  onOpenAddVideo: PropTypes.func
};

NavBar.defaultProps = {
  title: 'Video Notes',
  onOpenSidebar: () => console.log('onOpenSidebar'),
  onOpenAddVideo: () => console.log('onOpenAddVideo')
};

export default withStyles(styles)(NavBar);

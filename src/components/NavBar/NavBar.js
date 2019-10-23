import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';
import Sidebar from 'components/Sidebar';

const NavBar = ({ classes, title, videoItems, onOpenAddVideo }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Sidebar videoItems={videoItems} />
        <Typography variant="h6" color="inherit" className={classes.title}>
          {title}
        </Typography>
        {/* TODO: replace to dialog AddVideo */}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          size="small"
          onClick={onOpenAddVideo}
        >
          <AddIcon />
        </Fab>
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

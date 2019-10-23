import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles';
import SidebarList from './SidebarList';

const Sidebar = ({ children, classes, videoItems }) => {
  const [state, setState] = React.useState({
    open: false
  });

  const toggleSidebar = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ open: !state.open });
  };

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>

      <div className={classes.root}>
        <Drawer
          classes={{
            paper: classes.paper
          }}
          open={state.open}
          onClose={toggleSidebar}
        >
          <div className={classes.content}>
            <SidebarList videoItems={videoItems} />
          </div>
        </Drawer>
      </div>
    </>
  );
};

Sidebar.propTypes = {};

export default withStyles(styles)(Sidebar);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles';

const Sidebar = ({ children, classes, content }) => {
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
          <div className={classes.content}>{content ? content() : null}</div>
        </Drawer>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  content: PropTypes.func.isRequired
};

export default withStyles(styles)(Sidebar);

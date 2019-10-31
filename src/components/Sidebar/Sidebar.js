import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { compose } from 'recompose';

import styles from './styles';
import SidebarList from './SidebarList';
import { withDBContext } from 'db';

const Sidebar = ({ classes, db }) => {
  const [open, openState] = useState(false);
  const [videoItems, setVideo] = useState([]);

  const toggleSidebar = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    openState(!open);
  };

  const getVideo = async () => {
    try {
      const video = await db.getVideoList();
      setVideo(video);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

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
          open={open}
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

export default compose(
  withStyles(styles),
  withDBContext
)(Sidebar);

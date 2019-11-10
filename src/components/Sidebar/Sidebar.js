import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles';
import SidebarList from './SidebarList';
import { DBContext } from 'db';

const Sidebar = ({ classes }) => {
  const [open, openState] = useState(false);
  let video = [];
  const [videoItems, setVideo] = useState(video);
  const db = useContext(DBContext);

  const toggleSidebar = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    openState(!open);
  };

  const getVideo = async () => {
    try {
      video = await db.getVideoList();
      setVideo(video);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

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

export default withStyles(styles)(Sidebar);

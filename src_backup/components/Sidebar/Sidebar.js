import React, { useState, useEffect, useContext, createContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles';
import SidebarList from './SidebarList';
import { VdnAppContext } from 'components/VdnApp';

let SidebarContext;

const Sidebar = ({ classes }) => {
  const [open, openState] = useState(false);
  const [videoItems, setVideo] = useState([]);
  const {
    db: { getVideoList },
    updateVer,
    setPlaying
  } = useContext(VdnAppContext);

  SidebarContext = createContext({
    openState: val => openState(val)
  });

  const toggleSidebar = event => {
    openState(!open);
    open ? setPlaying(true) : setPlaying(false);
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  };

  useEffect(() => {
    const getVideoListRequest = async () => {
      const video = await getVideoList();
      setVideo(video);

      console.log(updateVer);
    };
    getVideoListRequest();
  }, [getVideoList, updateVer]);

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

export { SidebarContext };
export default withStyles(styles)(Sidebar);

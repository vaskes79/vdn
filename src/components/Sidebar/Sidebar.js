import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import styles from './styles';

const Sidebar = ({
  children,
  title,
  links,
  bottom,
  classes,
  open,
  onCloseSidebar,
}) => (
  <div className={classes.root}>
    <Drawer
      classes={{
        paper: classes.paper,
      }}
      open={open}
      onClose={onCloseSidebar}>
      <div className={classes.content}>
        {title ? <div className={classes.title}>{title()}</div> : null}
        {links ? <div className={classes.links}>{links()}</div> : null}
        {children ? <div className={classes.children}>{children}</div> : null}
      </div>
    </Drawer>
  </div>
);

Sidebar.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.func,
  links: PropTypes.func,
  onCloseSidebar: PropTypes.func,
};

Sidebar.defaultProps = {
  open: false,
  title: () => <h3>Sidebar</h3>,
  links: () => (
    <ul>
      <li>video1</li>
      <li>video2</li>
      <li>video3</li>
      <li>video4</li>
    </ul>
  ),
  onCloseSidebar: () => console.log('onCloseSidebar'),
};

export default withStyles(styles)(Sidebar);

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';

import styles from './styles';
import Copyright from 'Copyright';

const Footer = ({children, classes, onOpenInfo, left, right}) => (
  <div className={classes.root}>
    <Grid
      className={classes.wrap}
      container
      alignContent="space-between"
      alignItems="center"
      spacing={3}>
      <Grid className={classes.left} item xs={12} sm={6}>
        <Copyright />
      </Grid>

      <Grid className={classes.right} item xs={12} sm={6}>
        <IconButton
          size="small"
          edge="start"
          className={classes.infoBtn}
          color="inherit"
          aria-label="info about project"
          onClick={onOpenInfo}>
          <Info className={classes.infoIcon} />
        </IconButton>
      </Grid>
    </Grid>
  </div>
);

Footer.propTypes = {
  onOpenInfo: PropTypes.func,
};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);

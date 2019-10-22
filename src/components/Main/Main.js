import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const Main = ({ children, classes }) => (
  <div className={classes.root}>
    <Grid container spacing={3}>
      {children}
    </Grid>
  </div>
);

Main.propTypes = {};

Main.defaultProps = {};

export default withStyles(styles)(Main);

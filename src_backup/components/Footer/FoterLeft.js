import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';
import Copyright from 'components/Copyright';

const FooterLeft = ({ children, classes }) => (
  <Grid className={classes.left} item xs={12} sm={6}>
    <Copyright />
  </Grid>
);

FooterLeft.propTypes = {};

FooterLeft.defaultProps = {};

export default withStyles(styles)(FooterLeft);

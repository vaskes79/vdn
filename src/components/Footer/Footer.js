import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';

const Footer = ({ children, classes, left, right }) => (
  <div className={classes.root}>
    <Grid
      className={classes.wrap}
      container
      alignContent="space-between"
      alignItems="center"
      spacing={3}
    >
      <FooterLeft />
      <FooterRight />
    </Grid>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default withStyles(styles)(Footer);

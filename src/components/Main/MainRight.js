import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const MainRight = ({children, classes, video, controls}) => (
  <Grid item xs={12} md={3} className={classes.controlsContainer}>
    {controls ? controls() : null}
    {children}
  </Grid>
);

MainRight.propTypes = {};

MainRight.defaultProps = {};

export default withStyles(styles)(MainRight);

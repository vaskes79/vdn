import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const MainLeft = ({children, classes}) => (
  <Grid item xs={12} md={9} className={classes.videoContainer}>
    {children}
  </Grid>
);

MainLeft.propTypes = {};

MainLeft.defaultProps = {};

export default withStyles(styles)(MainLeft);

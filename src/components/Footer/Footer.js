import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';

const Footer = ({children, classes, left, right}) => (
  <div className={classes.root}>
    <Grid
      className={classes.wrap}
      container
      alignContent="space-between"
      spacing={3}>
      <Grid className={classes.left} item xs={12} sm={6}>
        {left ? left() : null}
      </Grid>

      <Grid className={classes.right} item xs={12} sm={6}>
        {right ? right() : null}
      </Grid>
    </Grid>
  </div>
);

Footer.propTypes = {
  left: PropTypes.func,
  right: PropTypes.func,
};

Footer.defaultProps = {
  left: () => <span>left</span>,
  right: () => <span>right</span>,
};

export default withStyles(styles)(Footer);

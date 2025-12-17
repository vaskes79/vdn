import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import styles from './styles';
import { Info } from 'components/Dialog';

const FooterRight = ({ children, classes, onOpenInfo }) => (
  <Grid className={classes.right} item xs={12} sm={6}>
    <Info />
  </Grid>
);

FooterRight.propTypes = {
  onOpenInfo: PropTypes.func
};

FooterRight.defaultProps = {
  onOpenInfo: () => console.log('onOpenInfo FooterRight')
};

export default withStyles(styles)(FooterRight);

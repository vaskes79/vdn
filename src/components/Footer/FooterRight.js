import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Info from '@material-ui/icons/Info';

import styles from './styles';

const FooterRight = ({children, classes, onOpenInfo}) => (
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
);

FooterRight.propTypes = {
  onOpenInfo: PropTypes.func,
};

FooterRight.defaultProps = {
  onOpenInfo: () => console.log('onOpenInfo FooterRight'),
};

export default withStyles(styles)(FooterRight);

import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import styles from './styles';
import NavBar from 'NavBar';

function VdnApp({classes}) {
  return (
    <div className={classes.VdnApp}>
      <NavBar /> VdnApp
    </div>
  );
}

export default withStyles(styles)(VdnApp);

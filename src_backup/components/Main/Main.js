import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';

const Main = ({ children }) => {
  const classes = useStyles()();

  return (
    <main className={classes.root}>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </main>
  );
};

Main.propTypes = {};

Main.defaultProps = {};

export default Main;

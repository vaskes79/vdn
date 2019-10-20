import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

const Main = ({children, classes, video, controls}) => (
  <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={9} className={classes.videoContainer}>
        {video ? video() : <CircularProgress className={classes.progress} />}
      </Grid>

      <Grid item xs={12} md={3} className={classes.controlsContainer}>
        {controls ? controls() : null}
        {children}
      </Grid>
    </Grid>
  </div>
);

Main.propTypes = {
  video: PropTypes.func,
};

Main.defaultProps = {
  video: () => (
    // eslint-disable-next-line
    <iframe
      width="100%"
      height="550"
      src="https://www.youtube.com/embed/GjtfXIaQq7g"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ),
  controls: () => <h2>controls</h2>,
};

export default withStyles(styles)(Main);

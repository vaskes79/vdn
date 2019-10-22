import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';

import styles from './styles';

const Video = ({ classes, src, playing }) => (
  <div className={classes.root}>
    <ReactPlayer
      url={src}
      width="100%"
      height={`${window.innerHeight - 150}px`}
      controls
      playing={playing}
    />
  </div>
);

Video.propTypes = {
  src: PropTypes.string.isRequired,
  playing: PropTypes.bool
};

Video.defaultProps = {
  src: 'https://youtu.be/cCOL7MC4Pl0',
  playing: false
};

export default withStyles(styles)(Video);

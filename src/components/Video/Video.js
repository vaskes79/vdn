import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import styles from './styles';

const Video = ({classes, src, provider, pause}) => (
  <div className={classes.root}>Video</div>
);

Video.propTypes = {
  src: PropTypes.string.isRequired,
  provider: PropTypes.oneOf(['youtube', 'vimeo']).isRequired,
  pause: PropTypes.bool,
};

Video.defaultProps = {
  src: 'https://youtu.be/GjtfXIaQq7g',
  provider: 'youtube',
  pause: false,
};

export default withStyles(styles)(Video);

import React, { createContext, createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';

import styles from './styles';
let VideoContext;
const Video = ({ classes, src, playing, setPlaying }) => {
  const player = createRef();

  VideoContext = createContext({
    getCurrentTime: () => player.current.getCurrentTime()
  });

  return (
    <div className={classes.root}>
      <ReactPlayer
        url={src}
        width="100%"
        height={`${window.innerHeight - 150}px`}
        controls
        playing={playing}
        onPlay={() => setPlaying(true)}
        onStart={() => setPlaying(true)}
        ref={player}
      />
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  playing: PropTypes.bool
};

Video.defaultProps = {
  playing: false
};

export { VideoContext };
export default withStyles(styles)(Video);

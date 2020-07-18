import React, { createContext, createRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import { VdnAppContext } from '../VdnApp';

import styles from './styles';
let VideoContext;
const Video = ({ classes }) => {
  const player = createRef();
  const { playing, setPlaying, urlVideo: src } = useContext(VdnAppContext);

  VideoContext = createContext({
    getCurrentTime: () => player.current.getCurrentTime(),
    goToTime: time => player.current.seekTo(time)
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
  src: PropTypes.string,
  playing: PropTypes.bool
};

Video.defaultProps = {
  playing: false
};

export { VideoContext };
export default withStyles(styles)(Video);

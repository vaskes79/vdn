import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import { VdnAppContext } from '../VdnApp';

import styles from './styles';
const Video = forwardRef((props, ref) => {
  const { playing, setPlaying, urlVideo: src } = useContext(VdnAppContext);

  return (
    <div className={props.classes.root}>
      <ReactPlayer
        url={src}
        width="100%"
        height={`${window.innerHeight - 150}px`}
        controls
        playing={playing}
        onPlay={() => setPlaying(true)}
        onStart={() => setPlaying(true)}
        ref={ref}
      />
    </div>
  );
});

Video.propTypes = {
  src: PropTypes.string,
  playing: PropTypes.bool
};

Video.defaultProps = {
  playing: false
};

export default withStyles(styles)(Video);

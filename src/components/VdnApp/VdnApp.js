import React, { useState, useContext, useEffect, createRef } from 'react';
import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';
import VdnAppContext from './context';

const VdnApp = () => {
  const {
    db,
    db: { getCurrentVideo }
  } = useContext(VdnAppContext);
  const [playing, setPlaying] = useState(false);
  const [urlVideo, setUrlVideo] = useState('');
  const player = createRef();

  useEffect(() => {
    const updateUrl = async () => {
      let currentUrlVideo = await getCurrentVideo();
      setUrlVideo(currentUrlVideo[0].value);
    };

    updateUrl();

    return () => console.log('VdnApp useEffect unmonut');
  }, [getCurrentVideo]);

  const vdnContext = {
    playing,
    getCurrentTime: () => player.current.getCurrentTime(),
    goToTime: time => player.current.seekTo(time),
    setPlaying,
    urlVideo,
    setUrlVideo: url => setUrlVideo(url),
    db
  };

  return (
    <>
      <VdnAppContext.Provider value={{ ...vdnContext }}>
        <NavBar />
        <Main>
          <MainLeft>
            <Video ref={player} />
          </MainLeft>
          <MainRight>
            <Notes />
          </MainRight>
        </Main>
        <Footer />
      </VdnAppContext.Provider>
    </>
  );
};

export default VdnApp;

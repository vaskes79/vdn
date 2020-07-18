import React, { useState, useContext, useEffect } from 'react';
import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';
import { DBContext } from 'components/db';
import VdnAppContext from './context';

const VdnApp = () => {
  const { getCurrentVideo } = useContext(DBContext);
  let [playing, setPlaying] = useState(false);
  let [urlVideo, setUrlVideo] = useState('');

  useEffect(() => {
    const updateUrl = async () => {
      let currentUrlVideo = await getCurrentVideo();
      setUrlVideo(currentUrlVideo[0].value);
    };

    updateUrl();

    return () => console.log('VdnApp useEffect unmonut');
  }, [getCurrentVideo]);

  const player = {
    playing,
    setPlaying,
    urlVideo,
    setUrlVideo: url => setUrlVideo(url)
  };

  return (
    <>
      <NavBar />
      <Main>
        <VdnAppContext.Provider value={{ ...player }}>
          <MainLeft>
            <Video />
          </MainLeft>
          <MainRight>
            <Notes urlNotes={urlVideo} />
          </MainRight>
        </VdnAppContext.Provider>
      </Main>
      <Footer />
    </>
  );
};

export default VdnApp;

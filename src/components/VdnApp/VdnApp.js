import React, { useState, createContext, useContext, useEffect } from 'react';

import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';
import { DBContext } from 'components/db';

let VdnAppContext;

const VdnApp = () => {
  const db = useContext(DBContext);
  let currentUrlVideo = '';
  let [playing, setPlaying] = useState(false);
  let [urlVideo, setUrlVideo] = useState(currentUrlVideo);

  useEffect(() => {
    (async () => {
      try {
        currentUrlVideo = await db.getCurrentVideo();
        setUrlVideo(currentUrlVideo[0].value);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [currentUrlVideo]);

  VdnAppContext = createContext({
    playing,
    setPlaying,
    urlVideo,
    setUrlVideo: url => setUrlVideo(url)
  });

  VdnAppContext.displayName = 'VdnAppContext';

  return (
    <>
      <NavBar />
      <Main>
        <MainLeft>
          <Video playing={playing} setPlaying={setPlaying} src={urlVideo} />
        </MainLeft>
        <MainRight>
          <Notes urlNotes={urlVideo} />
        </MainRight>
      </Main>
      <Footer />
    </>
  );
};

export default VdnApp;
export { VdnAppContext };

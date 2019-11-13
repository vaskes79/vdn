import React, { useState, createContext } from "react";

import NavBar from "components/NavBar";
import { Main, MainLeft, MainRight } from "components/Main";
import Video from "components/Video";
import Footer from "components/Footer";
import Notes from "components/Notes";

let VdnAppContext;

const VdnApp = () => {
  let [playing, setPlaying] = useState(false);
  let [urlVideo, setUrlVideo] = useState("https://youtu.be/cCOL7MC4Pl0");

  VdnAppContext = createContext({
    playing,
    setPlaying,
    urlVideo,
    setUrlVideo: url => setUrlVideo(url)
  });

  VdnAppContext.displayName = "VdnAppContext";

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

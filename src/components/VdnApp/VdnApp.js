import React from 'react';

import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';

const VdnApp = () => (
  <>
    <NavBar />
    <Main>
      <MainLeft>
        <Video />
      </MainLeft>
      <MainRight>
        <Notes />
      </MainRight>
    </Main>
    <Footer />
  </>
);

export default VdnApp;

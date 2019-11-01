import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
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

export default withStyles(styles)(VdnApp);

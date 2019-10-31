import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';
import { withDBContext } from 'db';

class VdnApp extends Component {
  state = {};

  render() {
    return (
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
  }
}

const VdnAppWithDB = withDBContext(VdnApp);

export default withStyles(styles)(VdnAppWithDB);

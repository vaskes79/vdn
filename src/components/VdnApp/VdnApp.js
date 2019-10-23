import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';

class VdnApp extends Component {
  state = {};

  render() {
    const { data } = this.props;

    return (
      <>
        <NavBar videoItems={data.videoList} />
        <Main>
          <MainLeft>
            <Video />
          </MainLeft>
          <MainRight>
            <Notes notes={data['video-id-1']} />
          </MainRight>
        </Main>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles)(VdnApp);

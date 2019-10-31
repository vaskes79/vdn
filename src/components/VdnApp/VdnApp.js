import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import NavBar from 'components/NavBar';
import { Main, MainLeft, MainRight } from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';
import Notes from 'components/Notes';

class VdnApp extends Component {
  state = {
    videoList: [],
    videoNotes: []
  };

  componentDidMount() {
    const { db } = this.props;
    db.getVideoList().then(videoList => this.setState({ videoList }));
    db.getNoteList().then(videoNotes => this.setState({ videoNotes }));
  }

  render() {
    const { videoList, videoNotes } = this.state;

    return (
      <>
        <NavBar videoItems={videoList} />
        <Main>
          <MainLeft>
            <Video />
          </MainLeft>
          <MainRight>
            <Notes notes={videoNotes} />
          </MainRight>
        </Main>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles)(VdnApp);

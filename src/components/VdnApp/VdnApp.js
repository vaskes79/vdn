import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import styles from './styles';
import NavBar from 'components/NavBar';
import Sidebar from 'components/Sidebar';
import {Main, MainLeft, MainRight} from 'components/Main';
import Video from 'components/Video';
import Footer from 'components/Footer';

class VdnApp extends Component {
  state = {
    sidebarOpen: false,
  };

  toggleSidebar = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    });
  };

  render() {
    const {classes} = this.props;
    const {sidebarOpen} = this.state;

    return (
      <div className={classes.VdnApp}>
        <NavBar onOpenSidebar={this.toggleSidebar} />
        <Sidebar open={sidebarOpen} onCloseSidebar={this.toggleSidebar}>
          Should be content
        </Sidebar>
        <Main>
          <MainLeft>
            <Video />
          </MainLeft>
          <MainRight>Right Panel</MainRight>
        </Main>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(VdnApp);

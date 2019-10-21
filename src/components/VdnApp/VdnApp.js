import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import styles from './styles';
import NavBar from 'NavBar';
import Sidebar from 'Sidebar';
import Main from 'Main';
import Video from 'Video';
import Footer from 'Footer';

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

  handlerDialogInfo = e => {
    console.log('handlerDialogInfo');
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
        <Video />
        <Main>some children</Main>
        <Footer onOpenInfo={this.handlerDialogInfo} />
      </div>
    );
  }
}

export default withStyles(styles)(VdnApp);

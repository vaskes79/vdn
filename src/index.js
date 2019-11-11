import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import DB, { setupDB, DBContext } from 'components/db';

import * as serviceWorker from './serviceWorker';
import './index.css';
import VdnApp from 'components/VdnApp';

const theme = createMuiTheme();

// console.log(theme);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <DBContext.Provider value={new DB(setupDB)}>
      <CssBaseline />
      <VdnApp />
    </DBContext.Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

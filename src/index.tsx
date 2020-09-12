import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import './index.css';
import VdnApp from './components/VdnApp';

const theme  = createMuiTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <VdnApp />
  </ThemeProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import VdnApp from './VdnApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VdnApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

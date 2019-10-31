import React from 'react';
const DBContext = React.createContext(null);
DBContext.displayName = 'DBContext';

export const withDBContext = Component => props => (
  <DBContext.Consumer>{value => <Component {...props} db={value} />}</DBContext.Consumer>
);

export default DBContext;

import React from 'react';
import DB from './indexedDB';
import setupDB from './setupDB';

const value = new DB(setupDB);
const DBContext = React.createContext({ ...value });
DBContext.displayName = 'DBContext';

export const withDBContext = Component => props => (
  <DBContext.Consumer>{value => <Component {...props} db={value} />}</DBContext.Consumer>
);

export default DBContext;

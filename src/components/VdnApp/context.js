import { createContext } from 'react';
import DB from '../db/indexedDB';
import setupDB from '../db/setupDB';
const db = new DB(setupDB);

const VdnAppContext = createContext({
  setUrlVideo: () => console.log('setUrlVideo from VdnAppContext'),
  db
});

VdnAppContext.displayName = 'VdnAppContext';

export default VdnAppContext;

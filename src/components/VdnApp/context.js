import { createContext } from 'react';
import DB, { setupDB } from '../db';
const db = new DB(setupDB);

const VdnAppContext = createContext({
  setUrlVideo: () => console.log('setUrlVideo from VdnAppContext'),
  db
});

VdnAppContext.displayName = 'VdnAppContext';

export default VdnAppContext;

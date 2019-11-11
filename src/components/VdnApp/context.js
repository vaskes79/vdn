import { createContext } from 'react';
import { play, setPlay } from './VdnApp';

const VdnAppContext = createContext({
  play,
  setPlay
});

VdnAppContext.displayName = 'VdnAppContext';

export default VdnAppContext;

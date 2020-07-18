import { createContext } from 'react';

const VdnAppContext = createContext({
  setUrlVideo: () => console.log('setUrlVideo from VdnAppContext')
});

VdnAppContext.displayName = 'VdnAppContext';

export default VdnAppContext;

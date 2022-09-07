import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ConfigContext = createContext({ noOfHoles: null, win: null });

function ConfigContextProvider({ children }) {
  const [noOfHoles, setNoOfHoles] = useState(4);
  const [godMode, setGodMode] = useState(false);
  const contextVal = useMemo(
    () => ({
      noOfHoles,
      setNoOfHoles,
      godMode,
      setGodMode,
    }),
    [noOfHoles, godMode]
  );
  return (
    <ConfigContext.Provider value={contextVal}>
      {children}
    </ConfigContext.Provider>
  );
}

ConfigContextProvider.propTypes = {
  children: PropTypes.node,
};

ConfigContextProvider.defaultProps = {
  children: null,
};

export default ConfigContextProvider;
export { ConfigContext };

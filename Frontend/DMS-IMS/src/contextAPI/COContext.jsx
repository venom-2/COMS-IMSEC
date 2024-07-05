import React, { createContext, useState } from 'react';

export const COContext = createContext();

export const COProvider = ({ children }) => {
  const [coData, setCoData] = useState([]);

  return (
    <COContext.Provider value={{ coData, setCoData }}>
      {children}
    </COContext.Provider>
  );
};

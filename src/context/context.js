// ResultDataContext.js
import React, { createContext, useContext, useState } from 'react';

const ResultDataContext = createContext();

export const useResultData = () => useContext(ResultDataContext);

export const ResultDataProvider = ({ children }) => {
  const [resultData, setResultData] = useState(null);

  return (
    <ResultDataContext.Provider value={{ resultData, setResultData }}>
      {children}
    </ResultDataContext.Provider>
  );
};


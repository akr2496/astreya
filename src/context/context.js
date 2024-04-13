// ResultDataContext.js
import React, { createContext, useContext, useState } from 'react';

const ResultDataContext = createContext();
const QueryDetailsDataContext = createContext();

export const useResultData = () => useContext(ResultDataContext);
export const useQueryDetailsData = () => useContext(QueryDetailsDataContext);

export const ResultDataProvider = ({ children }) => {
  const [resultData, setResultData] = useState(null);

  return (
    <ResultDataContext.Provider value={{ resultData, setResultData }}>
      {children}
    </ResultDataContext.Provider>
  );
};

export const QueryDetailsDataProvider = ({ children }) => {
    const [queryDetailsData, setQueryDetailsData] = useState(null);
  
    return (
      <QueryDetailsDataContext.Provider value={{ queryDetailsData, setQueryDetailsData }}>
        {children}
      </QueryDetailsDataContext.Provider>
    );
  };


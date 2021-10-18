import {createContext, useContext, useState} from 'react';

const ResidentContext = createContext(undefined);

export function ResidentContextWrapper({ children }) {

  const ISSERVER = typeof window === "undefined";

  let storedResident = null;

  if(!ISSERVER) {
    storedResident = localStorage.getItem('resident');
  }

  if (storedResident !== null) {
    storedResident = JSON.parse(storedResident);
  }

  const [resident, setResident] = useState(storedResident);

  return (
    <ResidentContext.Provider value={{
      resident,
      setResident
    }}>
      {children}
    </ResidentContext.Provider>
  );
}

export function useResidentContext() {
  return useContext(ResidentContext);
}


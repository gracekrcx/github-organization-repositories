import { useContext, createContext, useState } from "react";

const StoreContext = createContext({});

// custom hook
export const useStore = () => {
  return useContext(StoreContext);
};

const StoreContextProvider = ({ children }) => {
  const [repositories, setRepositories] = useState([]);

  return (
    <StoreContext.Provider
      value={{
        repositories,
        setRepositories,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreContextConsumer = StoreContext.Consumer;
export default StoreContextProvider;

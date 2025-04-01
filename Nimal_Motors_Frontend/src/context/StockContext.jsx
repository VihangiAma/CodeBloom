import { createContext, useState } from "react";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  return (
    <StockContext.Provider value={{ stock, setStock }}>
      {children}
    </StockContext.Provider>
  );
};

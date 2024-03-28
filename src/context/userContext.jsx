import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({'username':"Anonymous", "organisation":"Public Domain"});
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userIntakes, setUserIntakes] = useState();

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, userIntakes, setUserIntakes }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContextProvider;

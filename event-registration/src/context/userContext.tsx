import React, { createContext, useContext, useState } from "react";
import UserModel from "../interfaces/UserModel";

interface Data {
  userData: UserModel | null;
  setUser(userModel: UserModel): void;
}

const UserContext = createContext<Data>({ userData: null, setUser: () => {} });

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>();
  const contextValue = {
    userData: user,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

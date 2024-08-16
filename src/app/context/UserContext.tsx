"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { type User } from "~/server/api/routers/user";

interface UserContextType {
  user: User | null;
  saveUser: (user: User) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user_context", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_context");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

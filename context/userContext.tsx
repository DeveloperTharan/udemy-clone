'use client'

import axios from "axios";
import { User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
  user: User | null;
}

const Context = createContext<UserContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);

  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isSignedIn) {
        return;
      }

      try {
        const res = await axios.get("/api/userdata");
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isSignedIn]);

  return (
    <Context.Provider value={{ user: userData }}>{children}</Context.Provider>
  );
};

export default UserProvider;

export const useUser = (): UserContextProps => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};


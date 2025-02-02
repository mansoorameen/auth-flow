import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  users: User[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { username: "admin", password: "admin" },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    console.log("hellooo");

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      router.push("/dashboard");
    } else router.push("/login");
  }, []);

  const login = (username: string, password: string) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const register = (username: string, password: string) => {
    if (users.some((u) => u.username === username)) {
      return false; // Prevent duplicate registration
    }
    const newUser = { username, password };
    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo o tipo para os dados do usuário
interface User {
  IdDador: number;
  Email: string;
  Nome: string;
  Password: string;
}

// Definindo o tipo para o contexto
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// Criando o contexto com valor inicial nulo para o usuário
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Criando o provedor do contexto
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

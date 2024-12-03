import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo o tipo para os dados do usuário
interface TipoSangue {
  Id: number;
  Label: string;
  Order: number;
  Is_Active: boolean;
}

interface Dador {
  IdDador: number;
  Email: string;
  Nome: string;
  Password: string;
  DataNascimento: string;
  Telefone: string;
  NIF: string;
  NumUtente: string;
  GeneroId: number;
  DistritoId: number;
  TipoSangueId: number;
}

interface Genero {
  Id: number;
  Label: string;
  Order: number;
  Is_Active: boolean;
}

interface Distrito {
  Id: number;
  Label: string;
  Order: number;
  Is_Active: boolean;
}

interface User {
  TipoSangue: TipoSangue;
  Dador: Dador;
  Genero: Genero;
  Distrito: Distrito;
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

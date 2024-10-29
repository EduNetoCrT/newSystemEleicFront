import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar o carregamento

  useEffect(() => {
    // Verifica o localStorage para manter o usuário autenticado ao recarregar a página
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Indica que o carregamento foi concluído
  }, []);

  const login = async (email, password, section) => {
    // Simulação de autenticação
    if (email === 'admin@example.com' && password === '1234') {
      const userData = { email, section };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Salva no localStorage
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
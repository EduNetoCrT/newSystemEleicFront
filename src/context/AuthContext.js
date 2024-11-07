import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Importação nomeada para jwtDecode

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { token } = JSON.parse(storedUser);

      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          setUser({
            name: decodedToken.name || "Usuário",
            secao: decodedToken.secao || "N/A",
          });

          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          logout(); // Faz logout se o token for inválido
        }
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

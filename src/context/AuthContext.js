import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Importação nomeada para jwtDecode

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser({
        name: decodedToken.name || "Usuário",
        secao: decodedToken.secao || "N/A",
        secaoId: decodedToken.secao.id || "N/A",
      });
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        login(token);
      } catch (error) {
        console.error("Erro ao restaurar sessão de usuário:", error);
        logout(); // Se o token for inválido, faça logout
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

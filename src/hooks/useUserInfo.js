import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function useUserInfo() {
  const [userName, setUserName] = useState("");
  const [userSecao, setUserSecao] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token.split(".").length === 3) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || "Usuário");
        setUserSecao(decodedToken.secao || "N/A");
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.warn("Token inválido ou ausente");
    }
  }, []);

  return { userName, userSecao };
}

export default useUserInfo;

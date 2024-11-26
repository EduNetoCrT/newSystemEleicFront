import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function useUserInfo() {
  const [userName, setUserName] = useState("");
  const [userSecao, setUserSecao] = useState("");
  const [userSecaoId, setUserSecaoId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token.split(".").length === 3) {
      try {
        const decodedToken = jwtDecode(token);       
        setUserName(decodedToken.name || "Usuário");
        setUserSecao(decodedToken.secao.local || "N/A");
        setUserSecaoId(decodedToken.secao.id || 0);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.warn("Token inválido ou ausente");
    }
  }, []);

  return { userName, userSecao, secaoId: userSecaoId };
}

export default useUserInfo;

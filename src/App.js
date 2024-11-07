import "./App.css";

import AppRoutes from "./AppRoutes";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AuthLoader  />
    </AuthProvider>
  );
}

function AuthLoader() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
}

export default App;
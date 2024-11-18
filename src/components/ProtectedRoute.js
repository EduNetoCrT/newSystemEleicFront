import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SidebarLayout from "./layouts/SidebarLayout";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
}

export default ProtectedRoute;

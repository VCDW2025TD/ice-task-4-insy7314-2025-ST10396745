import { Navigate, Outlet } from "react-router-dom";
const isLoggedIn = () => !!localStorage.getItem("token");
export default function ProtectedRoute() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace state={{ msg: "You must log in first" }} />;
}

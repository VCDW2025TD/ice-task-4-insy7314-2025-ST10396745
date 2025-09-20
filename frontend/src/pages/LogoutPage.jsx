import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);
  return <p>Logging out…</p>;
}

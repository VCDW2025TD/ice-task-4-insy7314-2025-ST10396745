import { useEffect, useState } from "react";
import API from "../services/api";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let on = true;
    API.get("/protected")
      .then(res => { if (on) setData(res.data); })
      .catch(err => { if (on) setError(err?.response?.data?.message || "Failed to load"); });
    return () => { on = false; };
  }, []);

  if (error) return <div className="alert">{error}</div>;
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

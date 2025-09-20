import { Link, Outlet } from "react-router-dom";
const isLoggedIn = () => !!localStorage.getItem("token");
export default function Layout() {
  const authed = isLoggedIn();
  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        {authed ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <main className="container"><Outlet /></main>
      <footer className="footer">SecureBlog front end</footer>
    </>
  );
}

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "72px", margin: 0 }}>404</h1>
      <p style={{ color: "var(--text-dim)" }}>This page doesn't exist.</p>
      <Link to="/" className="nb-btn" style={{ textDecoration: "none" }}>
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;

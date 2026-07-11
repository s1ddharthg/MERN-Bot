import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginRight: "auto",
        textDecoration: "none",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" fill="var(--accent)" stroke="var(--border)" strokeWidth="3" />
        <path d="M9 22 L16 8 L14 15 L23 15 L16 26 L18 19 L9 19 Z" fill="var(--bg)" />
      </svg>
      <span
        className="logo-text"
        style={{ fontWeight: 700, fontSize: "20px", letterSpacing: "0.02em" }}
      >
        CHATBOX
      </span>
    </Link>
  );
};

export default Logo;

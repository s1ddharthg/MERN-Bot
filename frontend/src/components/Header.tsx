import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "1.5rem 0",
      }}
    >
      <Logo />
      <div>
        {auth?.isLoggedIn ? (
          <>
            <NavigationLink to="/chat" text="Go To Chat" />
            <NavigationLink variant="secondary" to="/" text="Logout" onClick={auth.logout} />
          </>
        ) : (
          <>
            <NavigationLink to="/login" text="Login" />
            <NavigationLink variant="secondary" to="/signup" text="Signup" />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";

type Props = {
  to: string;
  variant?: "primary" | "secondary";
  text: string;
  onClick?: () => Promise<void>;
};
const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className={`nb-btn ${props.variant === "secondary" ? "nb-btn--secondary" : ""}`}
      to={props.to}
      style={{
        display: "inline-block",
        marginLeft: "10px",
        textDecoration: "none",
        fontSize: "14px",
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;

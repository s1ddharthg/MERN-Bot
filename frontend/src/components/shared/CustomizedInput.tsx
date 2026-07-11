type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "12px 0" }}>
      <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {props.label}
      </span>
      <input className="nb-input" name={props.name} type={props.type} style={{ width: "340px" }} />
    </label>
  );
};

export default CustomizedInput;

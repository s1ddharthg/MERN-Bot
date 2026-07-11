import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat With Your OWN AI",
        1000,
        "Built With OpenAI",
        2000,
        "Your Own Customized ChatGPT",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "52px",
        fontWeight: 700,
        color: "var(--text)",
        display: "inline-block",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;

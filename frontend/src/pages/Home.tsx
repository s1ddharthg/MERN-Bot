import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
        <TypingAnim />
        <img
          src="/robot.png"
          alt="robot"
          className="nb-panel"
          style={{ width: "220px", margin: "3rem auto", padding: "1rem", background: "var(--surface)" }}
        />
        <img
          src="/chat.png"
          alt="chatbot screenshot"
          className="nb-panel"
          style={{ width: "min(700px, 90%)", margin: "0 auto 3rem", padding: "0.75rem", background: "var(--surface)" }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

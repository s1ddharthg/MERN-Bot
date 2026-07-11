import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    return message.split("```");
  }
  return [message];
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const isAssistant = role === "assistant";

  return (
    <div
      className="nb-panel"
      style={{
        display: "flex",
        padding: "1rem",
        gap: "1rem",
        margin: "0.75rem 0",
        background: isAssistant ? "var(--surface-raised)" : "var(--surface)",
        boxShadow: `6px 6px 0 ${isAssistant ? "var(--accent-2)" : "var(--accent)"}`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "13px",
          border: "2px solid var(--border)",
          background: isAssistant ? "var(--accent-2)" : "var(--accent)",
          color: "var(--bg)",
        }}
      >
        {isAssistant ? "AI" : initials(auth?.user?.name)}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        {messageBlocks.map((block, i) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter key={i} style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <p key={i} style={{ fontSize: "17px", lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap" }}>
              {block}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ChatItem;

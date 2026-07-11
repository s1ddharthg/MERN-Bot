import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function initials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
}

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content) return;
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setChatMessages((prev) => [...prev, { role: "user", content }]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <div style={{ display: "flex", flex: 1, width: "100%", gap: "2rem", marginTop: "2rem" }}>
      <aside className="chat-sidebar nb-panel">
        <div
          style={{
            width: "56px",
            height: "56px",
            margin: "1.5rem auto 0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            border: "2px solid var(--border)",
            background: "var(--accent)",
            color: "var(--bg)",
          }}
        >
          {initials(auth?.user?.name)}
        </div>
        <p style={{ textAlign: "center", fontWeight: 700, margin: "0.5rem 1rem" }}>
          You are talking to a ChatBOT
        </p>
        <p style={{ textAlign: "center", color: "var(--text-dim)", margin: "1rem", fontSize: "14px" }}>
          Ask about knowledge, business, advice, education, and more. Avoid sharing personal information.
        </p>
        <button
          onClick={handleDeleteChats}
          className="nb-btn nb-btn--danger"
          style={{ margin: "auto 1.5rem 1.5rem" }}
        >
          Clear Conversation
        </button>
      </aside>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <h2 style={{ textAlign: "center", margin: "0 0 1rem" }}>Model — GPT 3.5 Turbo</h2>
        <div className="chat-scroll">
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </div>
        <div className="nb-panel" style={{ display: "flex", marginTop: "1rem" }}>
          <input
            ref={inputRef}
            type="text"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              flex: 1,
              background: "transparent",
              padding: "1.2rem",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontSize: "17px",
              fontFamily: "inherit",
            }}
          />
          <button onClick={handleSubmit} className="nb-btn" style={{ margin: "0.5rem" }} aria-label="Send">
            <IoMdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

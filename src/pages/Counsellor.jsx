import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ChatBubble from "../components/ChatBubble";

export default function Counsellor() {
  const navigate = useNavigate();
  const { profile, setProfile } = useUser();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ---- INITIAL AI MESSAGE ----
  useEffect(() => {
    setMessages([
      {
        role: "ai",
        text: `Hi! I’ve reviewed your profile. What would you like to do next?`,
        actions: [
          {
            label: "Evaluate my profile",
            onClick: () => handleAI("evaluate"),
          },
          {
            label: "Suggest universities",
            onClick: () => handleAI("universities"),
          },
        ],
      },
    ]);
  }, []);

  // ---- USER SEND MESSAGE ----
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(m => [...m, { role: "user", text: input }]);
    handleAI(input);
    setInput("");
  };

  // ---- MOCK AI LOGIC ----
  const handleAI = intent => {
    let response = null;

    if (intent === "evaluate" || intent.includes("profile")) {
      response = {
        role: "ai",
        text:
          "Your academics look solid, but exams and SOP need attention. I recommend shortlisting universities next while preparing exams.",
        actions: [
          {
            label: "View To-Do List",
            onClick: () => navigate("/dashboard"),
          },
        ],
      };
    }

    if (intent === "universities" || intent.includes("university")) {
      response = {
        role: "ai",
        text:
          "Based on your profile and budget, I’ve identified Dream, Target, and Safe universities for you.",
        actions: [
          {
            label: "View University Shortlist",
            onClick: () => navigate("/universities"),
          },
        ],
      };
    }

    if (!response) {
      response = {
        role: "ai",
        text:
          "I can help you evaluate your profile, shortlist universities, or guide your next steps.",
      };
    }

    setTimeout(() => {
      setMessages(m => [...m, response]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col h-screen">
      {/* HEADER */}
      <div className="border-b pb-3 mb-4">
        <h2 className="text-xl font-bold">AI Counsellor</h2>
        <p className="text-sm text-gray-500">
          Stage: {profile.stage}
        </p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} {...msg} />
        ))}
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

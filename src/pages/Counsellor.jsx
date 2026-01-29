import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ChatBubble from "../components/ChatBubble";

export default function Counsellor() {
  const navigate = useNavigate();
  const { profile } = useUser();

  // ---- PERSISTED CHAT HISTORY ----
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("aiMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  // ---- SAVE CHAT TO LOCALSTORAGE ----
  useEffect(() => {
    localStorage.setItem("aiMessages", JSON.stringify(messages));
  }, [messages]);

  // ---- INITIAL AI MESSAGE (ONLY ONCE) ----
  useEffect(() => {
    if (messages.length === 0) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- USER SEND MESSAGE ----
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(m => [...m, { role: "user", text: input }]);
    handleAI(input);
    setInput("");
  };

  // ---- MOCK AI DECISION LOGIC ----
  const handleAI = intent => {
    let response;

    if (intent === "evaluate" || intent.toLowerCase().includes("profile")) {
      response = {
        role: "ai",
        text:
          "Your academics are solid, but exams and SOP need improvement. I recommend starting exam prep while shortlisting universities.",
        actions: [
          {
            label: "View AI To-Do List",
            onClick: () => navigate("/dashboard"),
          },
        ],
      };
    } else if (
      intent === "universities" ||
      intent.toLowerCase().includes("university")
    ) {
      response = {
        role: "ai",
        text:
          "I’ve shortlisted Dream, Target, and Safe universities based on your profile, budget, and competition level.",
        actions: [
          {
            label: "View University Shortlist",
            onClick: () => navigate("/universities"),
          },
        ],
      };
    } else {
      response = {
        role: "ai",
        text:
          "I can help you evaluate your profile, shortlist universities, or guide your next steps.",
      };
    }

    setTimeout(() => {
      setMessages(m => [...m, response]);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col h-screen">
      {/* HEADER */}
      <div className="border-b pb-3 mb-4">
        <h2 className="text-xl font-bold">AI Counsellor</h2>
        <p className="text-sm text-gray-500">
          Current Stage: {profile.stage}
        </p>
      </div>

      {/* CHAT WINDOW */}
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
          onKeyDown={e => e.key === "Enter" && sendMessage()}
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ChatBubble from "../components/ChatBubble";
import Layout from "../components/Layout";

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
          text:
            "Hi! I’ve reviewed your profile. I’ll help you evaluate your readiness, shortlist universities, and plan next steps. What would you like to do first?",
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
          "Your academics are solid, but exams and SOP need improvement. I recommend beginning exam preparation while shortlisting universities in parallel.",
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
          "Based on your profile, budget, and target countries, I’ve shortlisted Dream, Target, and Safe universities for you.",
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
    <Layout title="AI Counsellor">
      <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
        {/* CONTEXT HEADER */}
        <div className="bg-white border rounded-xl p-4 mb-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Current Stage</p>
          <p className="font-semibold text-lg">{profile.stage}</p>
        </div>

        {/* CHAT WINDOW */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} {...msg} />
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything about your study abroad plan..."
              className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black"
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Send
            </button>
          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <QuickAction
              label="Evaluate my profile"
              onClick={() => handleAI("evaluate")}
            />
            <QuickAction
              label="Suggest universities"
              onClick={() => handleAI("universities")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ------------------ HELPERS ------------------ */

function QuickAction({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-sm border rounded-full px-4 py-1.5 bg-gray-50 hover:bg-gray-100 transition"
    >
      {label}
    </button>
  );
}

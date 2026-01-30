import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ChatBubble from "../components/ChatBubble";
import Layout from "../components/Layout";

export default function Counsellor() {
  const navigate = useNavigate();
  const { profile } = useUser();

  /* ---------------- STATE ---------------- */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("aiMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  /* ---------------- PERSIST CHAT ---------------- */
  useEffect(() => {
    localStorage.setItem("aiMessages", JSON.stringify(messages));
  }, [messages]);

  /* ---------------- AI SPEAK ---------------- */
  const speak = text => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* ---------------- INITIAL AI MESSAGE ---------------- */
  useEffect(() => {
    if (messages.length === 0) {
      const welcome = {
        role: "ai",
        text:
          "Hi! I’ve reviewed your profile. I can help evaluate your readiness, shortlist universities, and plan next steps. What would you like to do first?",
        actions: [
          { label: "Evaluate my profile", onClick: () => handleAI("evaluate") },
          { label: "Suggest universities", onClick: () => handleAI("universities") },
        ],
      };

      setMessages([welcome]);
      speak(welcome.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(m => [...m, { role: "user", text: input }]);
    handleAI(input);
    setInput("");
  };

  /* ---------------- VOICE INPUT ---------------- */
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setMessages(m => [...m, { role: "user", text: transcript }]);
      handleAI(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ---------------- MOCK AI LOGIC ---------------- */
  const handleAI = intent => {
    let response;

    if (intent === "evaluate" || intent.toLowerCase().includes("profile")) {
      response = {
        role: "ai",
        text:
          "Your academics are solid, but exams and SOP need improvement. I recommend starting exam preparation while shortlisting universities in parallel.",
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
      speak(response.text);
    }, 500);
  };

  /* ---------------- UI ---------------- */
  return (
    <Layout title="AI Counsellor">
      <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
        {/* CONTEXT */}
        <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200 rounded-xl p-4 mb-4 shadow-sm">
          <p className="text-sm text-indigo-600 mb-1">Current Stage</p>
          <p className="font-semibold text-lg text-gray-900">
            {profile.stage}
          </p>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} {...msg} />
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="bg-white/80 backdrop-blur border rounded-2xl p-4 shadow-lg">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything about your study abroad plan..."
              className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />

            {/* MIC */}
            <button
              onClick={startListening}
              className={`px-4 py-3 rounded-xl border transition ${
                isListening
                  ? "bg-red-100 text-red-600 border-red-300"
                  : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
              }`}
              title="Voice input"
            >
              🎤
            </button>

            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md"
            >
              Send
            </button>
          </div>

          {/* QUICK ACTIONS */}
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

/* ---------------- HELPERS ---------------- */

function QuickAction({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-sm px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
    >
      {label}
    </button>
  );
}

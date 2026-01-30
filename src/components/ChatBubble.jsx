export default function ChatBubble({ role, text, actions = [] }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 mb-3 shadow-sm ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >
        {/* MESSAGE TEXT */}
        <p className="leading-relaxed">{text}</p>

        {/* ACTION BUTTONS (AI ONLY) */}
        {actions.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="text-sm px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

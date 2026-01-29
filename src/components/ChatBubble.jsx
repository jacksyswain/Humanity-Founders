export default function ChatBubble({ role, text, actions = [] }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 mb-3 ${
          isUser
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="mb-2">{text}</p>

        {/* ACTION BUTTONS */}
        {actions.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="text-sm border px-3 py-1 rounded bg-white hover:bg-gray-50"
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

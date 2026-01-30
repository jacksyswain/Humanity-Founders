export default function TaskCard({ task, onComplete }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl p-4 border shadow-sm transition ${
        task.completed
          ? "bg-emerald-50 border-emerald-200"
          : "bg-white border-gray-200 hover:shadow-md"
      }`}
    >
      <div>
        <p
          className={`font-medium ${
            task.completed
              ? "text-emerald-800 line-through"
              : "text-gray-900"
          }`}
        >
          {task.title}
        </p>
        <p className="text-sm text-gray-500">
          {task.description}
        </p>
      </div>

      {!task.completed ? (
        <button
          onClick={onComplete}
          className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-full hover:bg-indigo-700 transition shadow"
        >
          Mark done
        </button>
      ) : (
        <span className="text-sm font-medium text-emerald-600">
          Completed ✓
        </span>
      )}
    </div>
  );
}

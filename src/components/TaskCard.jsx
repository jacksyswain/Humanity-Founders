export default function TaskCard({ task, onComplete }) {
  return (
    <div className="flex items-center justify-between border rounded p-3">
      <div>
        <p className="font-medium">{task.title}</p>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>

      {!task.completed && (
        <button
          onClick={onComplete}
          className="text-sm bg-black text-white px-3 py-1 rounded"
        >
          Done
        </button>
      )}
    </div>
  );
}

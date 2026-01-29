export default function UniversityCard({ uni, onLock, locked }) {
  return (
    <div className="border rounded p-4 space-y-2">
      <h4 className="font-semibold text-lg">{uni.name}</h4>

      <p className="text-sm">
        <strong>Why it fits:</strong> {uni.fit}
      </p>

      <p className="text-sm text-gray-600">
        <strong>Risk:</strong> {uni.risk}
      </p>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Cost: {uni.cost}</span>
        <span>Acceptance: {uni.chance}</span>
      </div>

      {!locked && (
        <button
          onClick={onLock}
          className="mt-3 bg-black text-white px-4 py-2 rounded"
        >
          Lock this university
        </button>
      )}

      {locked && (
        <p className="mt-3 text-green-600 font-medium">
          ✓ University Locked
        </p>
      )}
    </div>
  );
}

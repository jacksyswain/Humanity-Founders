export default function UniversityCard({ uni, onLock, locked }) {
  return (
    <div
      className={`rounded-2xl p-5 space-y-3 border shadow-sm transition hover:shadow-md ${
        locked
          ? "border-emerald-300 bg-emerald-50"
          : "border-gray-200 bg-white"
      }`}
    >
      {/* UNIVERSITY NAME */}
      <h4 className="font-semibold text-lg text-gray-900">
        {uni.name}
      </h4>

      {/* WHY IT FITS */}
      <p className="text-sm text-gray-700">
        <strong className="text-gray-900">Why it fits:</strong>{" "}
        {uni.fit}
      </p>

      {/* RISK */}
      <p className="text-sm text-gray-600">
        <strong>Risk:</strong> {uni.risk}
      </p>

      {/* META */}
      <div className="flex justify-between text-sm pt-2 border-t">
        <span className="text-gray-500">
          Cost: <strong className="text-gray-700">{uni.cost}</strong>
        </span>
        <span className="text-gray-500">
          Acceptance:{" "}
          <strong className="text-gray-700">{uni.chance}</strong>
        </span>
      </div>

      {/* ACTION */}
      {!locked ? (
        <button
          onClick={onLock}
          className="w-full mt-3 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition shadow"
        >
          Lock this university
        </button>
      ) : (
        <div className="mt-3 flex items-center gap-2 text-emerald-700 font-medium">
          <span>✓</span>
          University Locked
        </div>
      )}
    </div>
  );
}

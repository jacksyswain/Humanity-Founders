export default function ProgressBar({ step, total }) {
  const percentage = (step / total) * 100;

  return (
    <div className="mb-6">
      {/* LABEL */}
      <p className="text-sm text-gray-500 mb-2">
        Step <span className="font-medium text-gray-800">{step}</span>{" "}
        of <span className="font-medium text-gray-800">{total}</span>
      </p>

      {/* BAR */}
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

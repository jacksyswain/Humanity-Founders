export default function ProgressBar({ step, total }) {
  const percentage = (step / total) * 100;

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 mb-2">
        Step {step} of {total}
      </p>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-black rounded transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

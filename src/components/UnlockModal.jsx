export default function UnlockModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        {/* HEADER */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
            !
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Unlock University?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              This action will reset your application strategy.
            </p>
          </div>
        </div>

        {/* MESSAGE */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Unlocking will remove university-specific guidance and may
          change your AI-generated tasks and recommendations.
          You can lock a different university afterward.
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl border text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow"
          >
            Yes, Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

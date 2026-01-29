export default function UnlockModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-2">Unlock University?</h3>

        <p className="text-sm text-gray-600 mb-4">
          Unlocking a university will reset your application strategy.
          University-specific guidance and tasks may change.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Yes, Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

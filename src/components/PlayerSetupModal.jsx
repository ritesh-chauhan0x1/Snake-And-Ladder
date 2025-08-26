import React from "react";

const PlayerSetupModal = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Select number of players (2 to 4)</h2>
        <p className="mb-4 text-gray-600">Players must be at least 2.</p>
        <div className="flex gap-4 mb-6">
          {[2, 3, 4].map((num) => (
            <button
              key={num}
              className="px-4 py-2 rounded bg-blue-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => onSelect(num)}
              aria-label={`Select ${num} players`}
            >
              {num}
            </button>
          ))}
        </div>
        <button
          className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close player selection modal"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlayerSetupModal;

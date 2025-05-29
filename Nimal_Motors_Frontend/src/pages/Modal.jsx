import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="p-6 relative rounded-lg shadow-lg w-96">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 text-md"
        >
          ✖
        </button>
        {children} {/* Render whatever component is passed */}
      </div>
    </div>
  );
}
